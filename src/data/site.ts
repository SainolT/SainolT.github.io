import data from './site.json'

export interface SiteCopy {
  /** 首页大标题下的一句话 */
  heroIntro: string
  /** 游戏库板块标题旁的说明 */
  libraryIntro: string
  /** 工具箱板块标题下的说明 */
  toolkitIntro: string
  /** 页脚版权行 */
  footerNote: string
}

/**
 * 全站介绍文案。本仓库里的 site.json 是模板占位；
 * 真实文案放在私有仓库 SainolT/site-content，构建时由 scripts/inject-content.mjs 注入。
 */
export const siteCopy = data as SiteCopy
