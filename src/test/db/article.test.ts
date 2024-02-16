/**
 * @author tkwang
 * @description 数据库测试 article
 */

import Article from "../../model/article.model";
import path from 'node:path';
import { query } from "../../db";
import { LOCAL_ARTICLE_FILE_PATH } from "../../../public/config/local-path";

const create = async () => {
  const article = await Article.create({
    title: '【Nodejs】- 基本工具及配置',
    desc: '【Nodejs】- 基本工具及配置',
    author: 'tk_wang',
    views: 0,
    category: 1,
    categoryText: 'NodeJS',
    filePath: path.join(LOCAL_ARTICLE_FILE_PATH, '【Nodejs】- 基本工具及配置/【Nodejs】- 基本工具及配置.md'),
    publishTime: '2024-1-1',
    modifyTime: '2024-1-1',
  })
  console.log(JSON.stringify(article, null, 4))
}

const findById = async (id = 1) => {
  const article = await query(`SELECT * FROM articles WHERE id = ${id}`);
  console.log(article);
}

// create();
findById();