import FILE_SERVER_CONFIG from '../../../public/config/file-server.config';


/**
 * 装饰文章Html
 * @param mdHtmlStr html 字符串
 * @param title 文章标题
 * @returns 
 */
export const decorationMdHtmlStr = (mdHtmlStr: string, title?: string): string => {
  let res: string = mdHtmlStr;
  res = addClass(res)
  res = addLinkToTitle(res);

  if (title) {
    res = parseImg(res, title);
  }
  return res;
}

/**
 * 解析替换文档中图片地址
 * @param mdHtmlStr 
 * @param title 
 * @returns 
 */
const parseImg = (mdHtmlStr: string, title: string): string => {
  let res = mdHtmlStr;
  res = addClass(mdHtmlStr);

  const imgRegExp = /<img[^>]*>/g;
  const imgSrcRegExp = /src="([^"]*)"/;
  const imgTags = mdHtmlStr.match(imgRegExp);
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

/**
 * 添加自定义类名
 * @param mdHtmlStr 
 * @returns 
 */
const addClass = (mdHtmlStr: string): string => {
  let res = mdHtmlStr;

  res = res.replaceAll(/<ul[^>]*>/g, '<ul class="markdown-body-ul">');
  res = res.replaceAll(/<ol[^>]*>/g, '<ol class="markdown-body-ol">');

  return res;
}

/**
 * 标题添加锚点
 * @param mdHtmlStr 
 * @returns 
 */
const addLinkToTitle = (mdHtmlStr: string): string => {
  let res: string = mdHtmlStr;

  const titleRegExp: RegExp = new RegExp(/<(h[1-6])>(.*?)<\/\1>/g);
  const titleArr = res.match(titleRegExp);
  titleArr?.forEach((t) => {
    const matchedArr = t.match(/<(h[1-6])>(.*?)<\/\1>/);
    if (matchedArr && matchedArr.length > 0) {
      const h_tag = matchedArr[1];
      const title = matchedArr[2];
      res = res.replace(t, `<${h_tag} id="${title}">${title}</${h_tag}>`)
    }
  })
  return res;
}
