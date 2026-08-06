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

export const games: Game[] = [
  {
    id: 'ember-catch',
    index: '01',
    title: '余烬拾光',
    titleEn: 'Ember Catch',
    year: '2026',
    status: '可试玩',
    genre: '休闲反应 · H5 小品',
    role: '策划 / 程序 / 视觉',
    tags: ['反应', '节奏递进', '单指操作'],
    oneLiner: '一盏提灯，接住坠落的余烬。',
    description:
      '一款为网页而生的轻量反应小品：玩家提着一盏灯在夜色里接住坠落的余烬，余烬会越落越快，而灰烬会让灯火黯淡。设计目标是验证「单手 30 秒一局」的极简循环——上手零成本，分数压力随时间自然爬升。',
    highlights: [
      '30 秒一局的极简核心循环',
      '速度曲线 + 干扰物双层压力设计',
      '支持键盘与触屏，即点即玩',
    ],
    playUrl: 'games/ember/index.html',
    tone: { base: '#C17E5B', deep: '#8F5638', glow: '#E8B48A' },
  },
  {
    id: 'mistborn-tactics',
    index: '02',
    title: '迷雾棋局',
    titleEn: 'Mistborn Tactics',
    year: '2025',
    status: '开发中',
    genre: '战棋策略 · 玩法原型',
    role: '系统策划 / 关卡设计',
    tags: ['战棋', '战争迷雾', '信息博弈'],
    oneLiner: '看不见的棋盘，才是棋盘。',
    description:
      '一套以「战争迷雾」为核心变量的战棋玩法原型：单位视野即资源，每一步移动都在交换信息与风险。策划案包含 12 个教学关卡曲线、视野衰减数值模型，以及围绕「侦察」展开的职业体系设计。',
    highlights: [
      '视野即资源的核心机制设计',
      '12 关卡教学曲线与难度爬坡',
      '侦察向职业体系与克制关系',
    ],
    tone: { base: '#A8A487', deep: '#77745A', glow: '#D6CFA8' },
  },
  {
    id: 'daylight-inn',
    index: '03',
    title: '拾光旅社',
    titleEn: 'Daylight Inn',
    year: '2025',
    status: '概念案',
    genre: '模拟经营 · 概念设计',
    role: '玩法策划 / 叙事设计',
    tags: ['经营', '叙事驱动', '慢节奏'],
    oneLiner: '每位旅客，都带着一段没讲完的故事。',
    description:
      '一间只开在黄昏的旅社。经营循环服务叙事：旅客的入住需求即章节钩子，房间布置影响故事的走向与结局。概念案完成了核心循环拆解、旅客情绪曲线与 20 个支线故事大纲。',
    highlights: [
      '经营与叙事互为表里的循环结构',
      '旅客情绪曲线 × 房间布置系统',
      '20 条支线故事大纲与结局树',
    ],
    tone: { base: '#D9A679', deep: '#A97B4F', glow: '#F0D3AC' },
  },
]
