import { Tokens } from 'marked'

declare interface Catalog extends Tokens.Heading {
  children?: Tokens.Heading[]
}

declare interface ParsedMd {
  articleContent: string
  articleCatalog: Catalog[]
}
