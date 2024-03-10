declare interface Article {
  id: number
  title: string
  desc: string
  author: string
  views: number
  category: number
  categoryText: string
  filePath: string
  createdAt: string
  updatedAt: string
}

declare interface ArticleRecord {
  articleList: Article[]
  count: number
}
