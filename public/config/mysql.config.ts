/**
 * @author tkwang
 * @description 数据库配置
 */

import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs'

interface Auth {
  username: string
  password: string
}

let auth: Auth = {
  username: '',
  password: '',
}

// 读取数据库验证信息
const sqlAuthPath = path.resolve(os.homedir(), '.tk_blog_data/database.json')
try {
  const _auth = fs.readFileSync(sqlAuthPath, { encoding: 'utf-8', flag: 'r' })
  auth = JSON.parse(_auth)
} catch (err: any) {
  console.error('获取数据库验证数据错误', err.message)
}

// 数据库连接配置
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: auth.username,
  password: auth.password,
  database: 'tk_blog',
}

export default dbConfig
