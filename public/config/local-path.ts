/**
 * @author tkwang
 * @description 常用路径配置
 */

import path from 'node:path';
import os from 'node:os';

const LOCAL_FILE_PATH = path.join(os.homedir(), 'tk_blog_file');
const LOCAL_ARTICLE_FILE_PATH = path.join(os.homedir(), 'tk_blog_file/article');

export {
  LOCAL_FILE_PATH,
  LOCAL_ARTICLE_FILE_PATH,
}