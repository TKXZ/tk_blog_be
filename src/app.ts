import 'reflect-metadata'
import process from 'node:process'
import path from 'node:path'
import express from 'express'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { PrismaClient } from '@prisma/client'
import { PrismaDB } from './db'
import { ArticleController } from './modules/article/article.controller'
import { ArticleService } from './modules/article/article.service'

import cors from './middleware/cors'

const container = new Container()
const server = new InversifyExpressServer(container)

container.bind<PrismaClient>('PrismaClient').toFactory(() => {
  return () => {
    return new PrismaClient()
  }
})
container.bind(PrismaDB).toSelf()
container.bind(ArticleService).to(ArticleService)
container.bind(ArticleController).to(ArticleController)

server.setConfig((app) => {
  app.use(cors)
  app.use(express.static(path.join(process.cwd(), 'public')))
  app.use(express.json())
})
const app = server.build()

app.listen(3636, () => {
  console.log('Server start on http://localhost:3636')
})
