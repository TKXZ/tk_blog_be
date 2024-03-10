import { Tokens } from 'marked'

declare interface Catalog extends Tokens.Heading {
  children?: Tokens.Heading[]
}
