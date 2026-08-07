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

## 更换 UI 风格（换肤指南）

本站的设计语言是「低饱和暖色 × 纸质档案馆」。想换成自己的风格，按下面四层改即可，建议全程开着 `npm run dev` 实时预览。

### 1. 配色

核心色板（全站统一使用这套低饱和暖色）：

| 用途 | 色值 |
|---|---|
| 奶油纸底 | `#F3ECE1` / `#F6F0E4` |
| 陶土主色（按钮、强调） | `#C17E5B` |
| 杏色点缀（hover、高光） | `#D9A679` |
| 灰绿辅色 | `#A8A487` |
| 深咖（正文、导航栏） | `#3E3128`（导航栏为调浅的 `#4C3D32`） |
| 深陶（徽章厚度、描边） | `#A6623F` |

颜色分布在两处：

- **`src/index.css` 顶部的 CSS 变量**（HSL 格式）——控制页面底色、正文色等基础层；
- **各组件里的 Tailwind 任意值**，如 `bg-[#3E3128]`、`text-[#C17E5B]`——占大部分。

全局换色最有效的方式：在编辑器里**对整个 `src/` 目录做大小写不敏感的全局替换**（把 `#C17E5B` 换成你的主色，以此类推），再逐个页面预览微调。纸面纹理（点阵、横线、暗角、顶部暖光）在 `index.css` 的 `body { background-image: ... }` 里，可以按喜好删改。

### 2. 字体

- 字体通过 Google Fonts 在 `index.html` 里引入：**Fraunces**（英文展示标题）、**Noto Serif SC**（中文衬线）、**Noto Sans SC**（正文）。
- 对应的工具类在 `index.css`：`.font-display`（英文大标题）、`.font-serif-sc`（中文衬线强调）；正文默认 Noto Sans SC。
- 换字体 = 改 `index.html` 的字体链接 + 改这两个工具类的 `font-family`。

### 3. 布局与板块

整站是单页结构，`src/pages/Home.tsx` 负责拼装，每个板块一个独立文件：

```
src/components/SiteNav.tsx   吸顶导航（含分享按钮）
src/sections/Hero.tsx        首屏（含积木玩具 BlocksToy、开始游戏按钮）
src/sections/GameLibrary.tsx 游戏库（票根卡片 + 详情弹层 + H5 试玩）
src/sections/Archive.tsx     档案馆（文章列表 + 阅读器）
src/pages/Home.tsx           页脚
```

- **新增板块**：在 `src/sections/` 新建组件 → 在 `Home.tsx` 里引入摆放 → 在 `SiteNav.tsx` 加锚点链接。注意导航是固定定位，板块要有 `scroll-mt-*` 补偿（参考现有两个板块的写法），否则跳转后标题会被导航遮住。
- **通用风格零件**（都在 `index.css`，可直接复用）：`.grain` 纸张颗粒覆层、`.ticket-notch` 票根斜切角、`.reveal` 滚动显现、缝线效果用 `repeating-linear-gradient` 虚线、点击粒子特效在 `src/components/ClickSpark.tsx`。

### 4. 图标与分享图

见上文「更换站点图标 / 分享图」，`scripts/make-icons.py` 一键重生成。

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
