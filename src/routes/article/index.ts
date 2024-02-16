/**
 * @author tkwang
 * @description article router
 */

import express, { Router } from 'express';
import path from 'node:path';
import { wrapperSuccess, wrapperFailure } from '../../utils/wrapper-result';
import { parseMd } from '../../utils/markdown-to-html';
import { getList, findOneById } from '../../controller/article.controller';

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
  const { filePath } = article;

  const content = await parseMd(filePath);
  res.send(wrapperSuccess(content))
})

export default router;