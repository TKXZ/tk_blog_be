/**
 * @author tkwang
 * @description 常用路径配置
 */

import path from 'node:path'
import os from 'node:os'
import process from 'node:process'

const LOCAL_FILE_PATH = path.join(os.homedir(), 'tk_blog_file')
const LOCAL_ARTICLE_FILE_PATH = path.join(os.homedir(), 'tk_blog_file/article')

const PUBLIC_FOLDER_PATH = path.join(process.cwd(), 'public')
const VIEWS_EJS_PATH = path.join(process.cwd(), 'src/views/ejs')

export { LOCAL_FILE_PATH, LOCAL_ARTICLE_FILE_PATH, PUBLIC_FOLDER_PATH, VIEWS_EJS_PATH }
