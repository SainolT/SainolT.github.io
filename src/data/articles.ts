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

export const articles: Article[] = [
  {
    id: 'balatro-analysis',
    index: 'A-01',
    type: '拆解',
    title: '《小丑牌》的数值钩子：为什么"再开一局"停不下来',
    titleEn: 'Balatro: Anatomy of a Hook',
    date: '2026-07',
    summary:
      '从倍率曲线、筹码经济和小丑协同三个层面，拆解 Balatro 如何把扑克变成一台多巴胺引擎。',
    tags: ['数值拆解', 'Roguelike', '成瘾循环'],
    readMinutes: 8,
    content: [
      {
        paragraphs: [
          '（示例文章，可替换为你的真实拆解）Balatro 表面上是一款扑克游戏，实质上是一台精心校准的数值机器。它的成瘾性不来自随机性本身，而来自随机性被「可干预」地呈现给玩家。',
        ],
      },
      {
        heading: '倍率曲线：指数级反馈',
        paragraphs: [
          '基础牌型的筹码与倍率增长是线性的，但小丑牌之间的乘算关系让得分曲线在特定构筑下跃迁为指数。玩家的爽感峰值恰好出现在「构筑成立」的那一手——这是设计者刻意保留的涌现空间。',
          '关键设计在于：指数爆炸不是常态，而是奖励。前期曲线被压得足够平，让每一次跃迁都显得是自己挣来的。',
        ],
      },
      {
        heading: '筹码经济：受限的确定性',
        paragraphs: [
          '商店刷新、幻灵包、星球牌构成了三条资源转化通道。玩家永远缺一点钱——这个「差一点」就是钩子的本体：它把每一次失败都归因为「再优化一点经济决策」，而非「运气不好」。',
        ],
      },
      {
        heading: '小结',
        paragraphs: [
          '好的成瘾循环 = 平缓的基线 + 可预期的跃迁 + 永远差一点的资源缺口。这套结构几乎可以平移到任何构筑类游戏的经济系统设计中。',
        ],
      },
    ],
  },
  {
    id: 'loop-design-template',
    index: 'A-02',
    type: '设计案',
    title: '核心循环设计案：从一句话机制到可验证原型',
    titleEn: 'Core Loop Design Template',
    date: '2026-06',
    summary:
      '一份自用的核心循环设计案模板：机制假设、循环拆解、验证指标三部分，30 分钟写完一版。',
    tags: ['设计方法', '原型验证', '模板'],
    readMinutes: 5,
    content: [
      {
        paragraphs: [
          '（示例设计案，可替换为你的真实文档）这份模板解决的问题是：策划案常常写得很满，却无法回答「这个玩法到底好不好玩」。核心循环设计案只保留能指导原型验证的最小信息集。',
        ],
      },
      {
        heading: '一、机制假设',
        paragraphs: [
          '用一句话写完：「玩家在【情境】中通过【操作】获得【反馈】，并因为【动机】想再来一次。」写不进这句话的机制，大概率还没想清楚。',
        ],
      },
      {
        heading: '二、循环拆解',
        paragraphs: [
          '把循环拆成 3~5 个节点，标注每个节点的玩家决策点、预期情绪和时间成本。循环的任何一环超过 90 秒没有决策，就要警惕流失。',
        ],
      },
      {
        heading: '三、验证指标',
        paragraphs: [
          '原型只验证一个假设，只看一个指标：自愿重开率。玩家主动点「再来一局」的比例，比任何问卷都诚实。',
        ],
      },
    ],
  },
]
