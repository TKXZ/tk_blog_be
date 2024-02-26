import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import { LOCAL_ARTICLE_FILE_PATH } from '../../../public/config/local-path';
import FILE_SERVER_CONFIG from '../../../public/config/file-server.conf';


/**
 * 解析替换文档中图片地址
 * @param htmlStr 
 * @param title 
 * @returns 
 */
export const parseImg = (htmlStr: string, title: string): string => {
  let res = htmlStr;

  const imgRegExp = /<img[^>]*>/g;
  const imgSrcRegExp = /src="([^"]*)"/;
  const imgTags = htmlStr.match(imgRegExp);
  imgTags?.forEach((val) => {
    const srcArr = val.match(imgSrcRegExp);
    if (srcArr && srcArr.length > 1) {
      const src = srcArr[1];
      const srcWithServer = src.replace(/\./, FILE_SERVER_CONFIG.article + `/${title}`)
      res = res.replace(val, `<img src="${srcWithServer}">`);
    }
  })

  return res;
}
