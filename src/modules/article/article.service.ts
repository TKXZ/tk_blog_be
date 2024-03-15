import fs from 'node:fs'
import { injectable, inject } from 'inversify'
import { PrismaDB } from '@/db'
import { parseMd } from '@/utils/markdown-to-html'
import {
  article2HtmlFile,
  checkExistHtmlFile,
  getCatalogFilePath,
  getHtmlFilePath,
  saveCatalog2File,
} from './utils/to-file'
import { wrapperFailure, wrapperSuccess } from '@/utils/wrapper-result'

@injectable()
export class ArticleService {
  constructor(@inject(PrismaDB) private readonly prismaDB: PrismaDB) {}

  public async getList(search: string, page: number, pageSize: number): Promise<any> {
    try {
      const list = await this.prismaDB.prisma.article.findMany({
        select: {
          id: true,
          title: true,
          desc: true,
          author: true,
          views: true,
          category: true,
          categoryText: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          title: {
            contains: search,
          },
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
      })
      const count = list.length
      return wrapperSuccess({ list, count })
    } catch (err) {
      console.error(err)
      return wrapperFailure(10000, 'Get article list failed')
    }
  }

  public async getDetail(id: number): Promise<any> {
    try {
      const article = await this.prismaDB.prisma.article.findFirst({
        where: {
          id,
        },
      })
      if (article) {
        let htmlFilePath = ''
        let catalogFilePath = ''
        const { filePath, title } = article

        if (checkExistHtmlFile(title)) {
          htmlFilePath = getHtmlFilePath(title)
          catalogFilePath = getCatalogFilePath(title)
        } else {
          const parsedMd = await parseMd(filePath, title)
          if (parsedMd) {
            const { articleContent, articleCatalog } = parsedMd
            htmlFilePath = article2HtmlFile(articleContent, title)
            catalogFilePath = saveCatalog2File(title, articleCatalog)
          }
        }
        const htmlContent = fs.readFileSync(htmlFilePath).toString('utf-8')
        const catalog = fs.readFileSync(catalogFilePath).toString('utf-8')

        return wrapperSuccess({
          htmlContent,
          catalog,
        })
      }
    } catch (err) {
      console.error(err)
      return wrapperFailure(10001, 'Get article detail failed')
    }
  }
}
