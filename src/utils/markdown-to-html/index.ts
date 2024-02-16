/**
 * @author tkwang
 * @description markdown 转 HTML
 */

import * as marked from 'marked';
import fs from 'node:fs';
import fsp from 'node:fs/promises';

const parseMdSync = (filePath = '') => {
  try {
    const md = fs.readFileSync(filePath, 'utf-8');
    const mdContent = marked.parse(md);
    return mdContent;
  } catch (err: any) {
    console.error('解析md文件错误', err.message);
  }
}

const parseMd = async (filePath = '') => {
  try {
    const md = await fsp.readFile(filePath, 'utf-8');
    const mdContent = marked.parse(md);
    return mdContent;
  } catch (err: any) {
    console.error('解析md文件错误', err.message);
  }
}

export {
  parseMd,
  parseMdSync,
}