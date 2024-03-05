/**
 * @author tkwang
 * @description 废弃 - mysql2 数据库连接模块
 */

import dbConf from '../../public/config/mysql.config';
import mysql, { Pool, PoolConnection } from 'mysql2/promise';

let pool: Pool; // 连接池
let promisePool: PoolConnection; // 连接池

try {
  pool = mysql.createPool(dbConf);
} catch (err: any) {
  console.error('数据库连接错误！', err.message);
}

/**
 * sql 查询
 * @param sql 
 * @returns 
 */
export const query = async (sql: string): Promise<any> => {
  if (!sql) return;

  try {
    promisePool = await pool.getConnection(); // 获取池链接
    const [results] = await promisePool.query(sql);

    if (results) {
      promisePool.release();
      return results;
    }
  } catch (err: any) {
    console.error(err.message)
  }
}

export {
  pool, promisePool
};