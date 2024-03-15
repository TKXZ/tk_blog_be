import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'inversify'

@injectable()
export class PrismaDB {
  prisma: PrismaClient
  constructor(
    @inject('PrismaClient')
    prismaClient: () => PrismaClient,
  ) {
    this.prisma = prismaClient()
  }
}
