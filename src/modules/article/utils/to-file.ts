import path from 'node:path'
import fs from 'node:fs'
import { Catalog } from '@/utils/marked/types/extention'
import { PUBLIC_FOLDER_PATH } from '../../../../public/config/local-path'

const PUBLIC_ARTICLE_FOLDER_PATH = path.join(PUBLIC_FOLDER_PATH, 'article')

/**
 * html 字符串写入文件
 * @param markdown
 * @returns html file path
 */
export const article2HtmlFile = (markdown: string, title: string = 'title'): string => {
  const curArticleFolderPath = path.join(PUBLIC_ARTICLE_FOLDER_PATH, `${title}`)
  if (!fs.existsSync(curArticleFolderPath)) {
    const articleFolderPath = fs.mkdirSync(curArticleFolderPath, { recursive: true }) as string
    fs.writeFileSync(path.join(articleFolderPath, `${title}.html`), markdown)
  } else {
    fs.writeFileSync(path.join(curArticleFolderPath, `${title}.html`), markdown)
  }

  return path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, `${title}.html`)
}

/**
 * 存储目录数据到json
 * @param title
 * @param catalogArr
 * @returns 目录文件地址
 */
export const saveCatalog2File = (title: string, catalogArr: Catalog[]): string => {
  const catalogPath = path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, title + '.json')

  fs.writeFileSync(catalogPath, JSON.stringify(catalogArr))

  return catalogPath
}

/**
 * 检查是否存在已生成Html文件
 * @param title
 * @returns
 */
export const checkExistHtmlFile = (title: string): boolean => {
  const htmlPath = path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, title + '.html')
  return fs.existsSync(htmlPath)
}

/**
 * 获取 文章内容 文件路径
 * @param title
 * @returns
 */
export const getHtmlFilePath = (title: string) => {
  return path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, title + '.html')
}

/**
 * 获取 文章目录 文件路径
 * @param title
 * @returns
 */
export const getCatalogFilePath = (title: string) => {
  return path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, title + '.json')
}
