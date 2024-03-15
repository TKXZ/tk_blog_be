/**
 * @author tkwang
 * @description article controller
 */
import type { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet as GetMapping } from 'inversify-express-utils'
import { ArticleService } from './article.service'
import { wrapperResult } from '@/utils/wrapper-result'

@controller('/article')
export class ArticleController {
  constructor(
    @inject(ArticleService)
    private readonly articleService: ArticleService,
  ) {}

  // 获取首页文章列表
  @GetMapping('/list')
  public async getList(req: Request, res: Response) {
    const { search = '', page = 1, pageSize = 10 } = req.query

    return wrapperResult(this.articleService.getList(search as string, +page, +pageSize))
  }

  @GetMapping('/detail/:id')
  public async getDetail(req: Request, res: Response) {
    const { id } = req.params
    if (id) {
      return wrapperResult(this.articleService.getDetail(+id))
    }
  }
}
