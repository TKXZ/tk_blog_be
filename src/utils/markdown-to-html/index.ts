/**
 * @author tkwang
 * @description markdown 转 HTML
 */

import marked from '../marked'
import { Catalog, resolveMdStr } from '../marked/extention'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { decorationMdHtmlStr } from '../../routes/article/decoration'
import { ParsedMd } from './types/markdown-to-html'

/**
 * 解析markdown - 同步
 * @param filePath
 * @returns
 */
const parseMdSync = (filePath: string, title: string): string | void => {
  try {
    const md = fs.readFileSync(filePath, 'utf-8')
    let mdHtmlStr = marked.parse(md, { async: false }) as string
    mdHtmlStr = decorationMdHtmlStr(mdHtmlStr, title)
    return mdHtmlStr
  } catch (err: any) {
    console.error('解析md文件错误', err.message)
  }
}

/**
 * 解析markdown - 异步
 * @param filePath
 * @returns
 */
const parseMd = async (filePath: string, title: string): Promise<ParsedMd | void> => {
  try {
    const mdStr = await fsp.readFile(filePath, 'utf-8')
    let mdHtmlStr = await marked.parse(mdStr)
    const { catalogArr } = await resolveMdStr(mdStr)
    mdHtmlStr = decorationMdHtmlStr(mdHtmlStr, title)
    return {
      articleContent: mdHtmlStr,
      articleCatalog: catalogArr,
    }
  } catch (err: any) {
    console.error('解析md文件错误', err)
  }
}

export { parseMd, parseMdSync }
