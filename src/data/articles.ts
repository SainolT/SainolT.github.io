import data from './articles.json'

export interface ArticleSection {
  heading?: string
  paragraphs: string[]
}

export interface Article {
  id: string
  index: string
  type: '设计案' | '拆解'
  title: string
  titleEn?: string
  date: string
  summary: string
  tags: string[]
  readMinutes: number
  content: ArticleSection[]
}

/**
 * 档案馆数据。本仓库里的 articles.json 是模板占位；
 * 真实内容放在私有仓库 SainolT/site-content，构建时由 scripts/inject-content.mjs 注入。
 */
export const articles = data as Article[]
