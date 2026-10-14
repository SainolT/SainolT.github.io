import data from './games.json'

export interface Game {
  id: string
  index: string
  title: string
  titleEn: string
  year: string
  status: '可试玩' | '概念案' | '开发中'
  genre: string
  role: string
  tags: string[]
  oneLiner: string
  description: string
  highlights: string[]
  /** H5 试玩地址（相对路径或完整 URL），为空表示暂未开放试玩 */
  playUrl?: string
  /** 封面主色（低饱和暖色系） */
  tone: {
    base: string
    deep: string
    glow: string
  }
}

/**
 * 游戏库数据。本仓库里的 games.json 是模板占位；
 * 真实内容放在私有仓库 SainolT/site-content，构建时由 scripts/inject-content.mjs 注入。
 */
export const games = data as Game[]
