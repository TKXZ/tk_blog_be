/**
 * @author tkwang
 * @description sequelize 数据库连接
 */

import { Sequelize } from "sequelize";
import dbConf from '../../public/config/mysql.config';

const { database, user, password, host, port } = dbConf;

// 数据库连接实例
const sequelize = new Sequelize(database, user, password, {
  host, port, dialect: 'mysql'
})

/**
 * sql 原始查询
 * @param sql 
 * @returns 
 */
const query = async (sql: string) => {
  const [result] = await sequelize.query(sql);
  return result;
}

export default sequelize;
export {
  query,
}