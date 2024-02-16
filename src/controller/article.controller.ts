/**
 * @author tkwang
 * @description article controller
 */

import { query } from "../db";

/**
 * 获取文章列表
 * @param search 
 * @param page 
 * @param pageSize 
 * @returns 
 */
const getList = async (search: string = '', page: number = 1, pageSize: number = 10) => {
  let where = 'WHERE 1 = 1';
  if (search) {
    where += ` AND title LIKE "%${search}%"`;
  }

  const sql = `SELECT * FROM articles ${where} LIMIT ${pageSize} OFFSET ${pageSize * (page - 1)}`;

  try {
    const articleList = await query(sql);
    return articleList;
  } catch (err: any) {
    console.error('查询文章列表错误', err.message);
  }
}

/**
 * 根据 id 获取文章数据
 * @param id 
 * @returns 
 */
const findOneById = async (id: number) => {
  const sql = `SELECT * FROM articles WHERE id = ${id}`;

  try {
    const article = await query(sql);
    return article;
  } catch (err: any) {
    console.error('查询文章数据错误', err.message);
  }
}

export {
  getList,
  findOneById,
}