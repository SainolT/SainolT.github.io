# SainolT · 游戏策划个人主页（由kimiK3生成，我想可能会有一些潜在的问题，请检查无问题后再考虑采用）

个人主页 + 游戏档案馆，托管于 GitHub Pages。

- 线上地址：https://sainolt.github.io
- 技术栈：React + TypeScript + Vite + Tailwind CSS

---

## 日常维护

### 添加 / 修改游戏卡片

所有游戏内容都集中在 **`src/data/games.ts`**，不需要改任何组件代码。
复制一条记录改成新的即可：

```ts
{
  id: 'my-new-game',
  index: '04',
  title: '新游戏名',
  titleEn: 'New Game',
  year: '2026',
  status: '可试玩',          // 可选：可试玩 / 开发中 / 概念案
  genre: '类型 · 定位',
  role: '你的职责',
  tags: ['标签1', '标签2'],
  oneLiner: '一句话介绍',
  description: '详细介绍……',
  highlights: ['亮点1', '亮点2', '亮点3'],
  playUrl: 'games/my-game/index.html',  // 没有试玩就删掉这一行
  tone: { base: '#C17E5B', deep: '#8F5638', glow: '#E8B48A' },  // 封面配色（低饱和暖色）
}
```

- `status` 决定卡片上的状态徽章；只有填了 `playUrl` 的游戏才会开放「试玩」页签。
- 卡片的倾斜角度、弹层布局、封面编号全部自动生成。

### 添加 H5 试玩

1. 把游戏文件放进 `public/games/你的游戏名/`，入口命名为 `index.html`。
2. 在 `games.ts` 对应记录里填 `playUrl: 'games/你的游戏名/index.html'`。

### 添加 / 修改档案馆文章

文章数据集中在 **`src/data/articles.ts`**，结构如下：

```ts
{
  id: 'my-article',
  index: 'A-03',
  type: '拆解',              // 可选：设计案 / 拆解（决定印章颜色）
  title: '文章标题',
  titleEn: 'English Title',  // 可省略
  date: '2026-08',
  summary: '卡片上显示的摘要……',
  tags: ['标签1', '标签2'],
  readMinutes: 8,
  content: [
    { heading: '小节标题（可省略）', paragraphs: ['第一段……', '第二段……'] },
  ],
}
```

### 改其他文字

| 想改什么 | 改哪里 |
|---|---|
| Hero 自我介绍、跑马灯词条 | `src/sections/Hero.tsx` |
| 导航栏（链接、分享按钮、配色） | `src/components/SiteNav.tsx` |
| 积木小动物的样式与种类 | `src/data/animals.ts` |
| 游戏库板块文案 | `src/sections/GameLibrary.tsx` |
| 页脚 / GitHub 链接 | `src/pages/Home.tsx` |
| 全站配色、动效 | `src/index.css` |

### 更换站点图标 / 分享图

标签页图标（favicon）和社交分享大图（og-image）由脚本生成：

```bash
python scripts/make-icons.py
```

- 生成的文件直接写入 `public/`（favicon.ico、icon-192/512、apple-touch-icon、og-image 等），push 后即生效。
- 想调整徽章的配色、月亮星星位置或分享图文案，改 `scripts/make-icons.py` 里的常量即可；脚本同目录会输出一张 `preview-sheet.png` 供预览。
- 分享图的显示文案同时在 `index.html` 的 `og:*` / `twitter:*` meta 标签里，改文案时两边要同步。

---

## 本地开发

```bash
npm install      # 首次安装依赖
npm run dev      # 本地预览，改代码即时刷新
npm run build    # 生成最终静态文件到 dist/
```

## 部署（已自动化）

仓库配置了 GitHub Actions：只要 **push 到 `main` 分支**，就会自动构建并发布到 GitHub Pages，无需手动上传 `dist/`。

工作流文件：`.github/workflows/deploy.yml`
