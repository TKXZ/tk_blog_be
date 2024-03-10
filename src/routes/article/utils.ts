import ejs from 'ejs'
import path from 'node:path'
import fs from 'node:fs'
import { PUBLIC_FOLDER_PATH, VIEWS_EJS_PATH } from '../../../public/config/local-path'
import { Catalog } from '../../utils/marked/extention'

export const PUBLIC_ARTICLE_FOLDER_PATH = path.join(PUBLIC_FOLDER_PATH, 'article')

/**
 * html 字符串转 ejs 模版
 * @param markdown
 * @returns html path
 */
export const article2Html = (markdown: string, title: string = 'title'): string => {
  ejs.renderFile(
    path.join(VIEWS_EJS_PATH, 'markdown.ejs'),
    {
      content: markdown,
    },
    (err: any, data: any) => {
      if (err) throw new Error('Markdown ejs template render error')

      const curArticleFolderPath = path.join(PUBLIC_ARTICLE_FOLDER_PATH, `${title}`)
      if (!fs.existsSync(curArticleFolderPath)) {
        const articleFolderPath = fs.mkdirSync(curArticleFolderPath, { recursive: true }) as string
        fs.writeFileSync(path.join(articleFolderPath, `${title}.html`), data)
      } else {
        fs.writeFileSync(path.join(curArticleFolderPath, `${title}.html`), data)
      }
    },
  )

  return path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, `${title}.html`)
}

/**
 * 检查是否存在解析完成文件
 * @param title
 * @returns
 */
export const checkExistHtml = (title: string): boolean => {
  const htmlPath = path.join(PUBLIC_ARTICLE_FOLDER_PATH, title, title + '.html')
  return fs.existsSync(htmlPath)
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
