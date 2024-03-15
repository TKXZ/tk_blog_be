/**
 * @author tkwang
 * @description markdown 转 HTML
 */

import marked from '../marked'
import { resolveMdStr } from '../marked/extention'
import fsp from 'node:fs/promises'
import { decorationMdHtmlStr } from '../../modules/article/utils/decoration'
import { ParsedMd } from '../marked/types/extention'

/**
 * 解析markdown - 异步
 * @param filePath
 * @returns
 */
export const parseMd = async (filePath: string, title: string): Promise<ParsedMd | void> => {
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
