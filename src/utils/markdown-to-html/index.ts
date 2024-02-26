/**
 * @author tkwang
 * @description markdown 转 HTML
 */

import marked from '../marked';
import { Catalog, parseCatalog } from '../marked/extention';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { parseImg } from '../upload/upload-image';
import { ParsedMd } from './types/markdown-to-html';

/**
 * 解析markdown - 同步
 * @param filePath 
 * @returns 
 */
const parseMdSync = (filePath: string, title: string): string => {
  let mdContent = '';
  try {
    const md = fs.readFileSync(filePath, 'utf-8');
    mdContent = marked.parse(md, { async: false }) as string;
    mdContent = parseImg(mdContent, title)
  } catch (err: any) {
    console.error('解析md文件错误', err.message);
  }
  return mdContent;
}


/**
 * 解析markdown - 异步
 * @param filePath 
 * @returns 
 */
const parseMd = async (filePath: string, title: string): Promise<ParsedMd> => {
  let mdContent = '';
  let catalogArr: Catalog[] = [];
  try {
    const md = await fsp.readFile(filePath, 'utf-8');
    mdContent = await marked.parse(md);
    catalogArr = await parseCatalog(md);
    mdContent = parseImg(mdContent, title)
  } catch (err: any) {
    console.error('解析md文件错误', err);
  }
  return {
    articleContent: mdContent,
    articleCatalog: catalogArr
  };
}

export {
  parseMd,
  parseMdSync,
}