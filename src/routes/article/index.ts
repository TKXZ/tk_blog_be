/**
 * @author tkwang
 * @description article router
 */

import express, { Router } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { wrapperSuccess, wrapperFailure } from '../../utils/wrapper-result';
import { parseMd } from '../../utils/markdown-to-html';
import type { ParsedMd } from '../../utils/markdown-to-html/types/markdown-to-html';
import { getList, findOneById } from '../../controller/article.controller';
import { article2Html, checkExistHtml, PUBLIC_ARTICLE_FOLDER_PATH, saveCatalog2File } from './utils';
import { Catalog } from '../../utils/marked/extention';

const router: Router = express.Router();


// 获取文章列表
router.get('/list', async (req, res) => {
  const query = req.query;
  const { search = '', page } = query as any;

  let list: Article[] = [];
  if (search) {
    list = await getList(search) as Article[];
  } else if (search && page) {
    list = await getList(search, page) as Article[];
  } else if (page) {
    list = await getList('', page) as Article[];
  } else {
    list = await getList() as Article[];
  }

  res.send(wrapperSuccess(list));
})

// 获取文章详情
router.get('/detail/:id', async (req, res) => {
  const params = req.params;
  const { id } = params;

  const [article] = await findOneById(parseInt(id)) as any;
  const { filePath, title } = article;

  let htmlFilePath = '';
  let catalogFilePath = '';
  let articleCatalog: Catalog[] = []

  // 先检查解析后的html文件是否存在
  // 存在 - 直接读取
  // 不存在 - 解析后读取
  // if (checkExistHtml(title)) {
  //   htmlFilePath = path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, title + '.html');
  //   catalogFilePath = path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, title + '.json');
  // } else {
  // }

  const parsedMd = await parseMd(filePath, title);
  if (parsedMd) {
    const { articleContent, articleCatalog: ac } = parsedMd;
    articleCatalog = ac;
    htmlFilePath = article2Html(articleContent, title);
    catalogFilePath = saveCatalog2File(title, articleCatalog);
  }

  const htmlContent = fs.readFileSync(htmlFilePath).toString('utf-8');
  const catalog = fs.readFileSync(catalogFilePath).toString('utf-8')

  res.send(wrapperSuccess({
    htmlContent,
    catalog
  }))
})

export default router;