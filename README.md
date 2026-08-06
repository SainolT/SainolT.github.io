# SainolT · 游戏策划个人主页

低饱和暖色调的个人主页 + 游戏档案馆，托管于 GitHub Pages。

- 线上地址：https://sainolt.github.io
- 技术栈：React + TypeScript + Vite + Tailwind CSS

---

## 日常维护（最常做的事）

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

### 改其他文字

| 想改什么 | 改哪里 |
|---|---|
| Hero 自我介绍、跑马灯词条 | `src/sections/Hero.tsx` |
| 游戏库板块文案 | `src/sections/GameLibrary.tsx` |
| 页脚 / GitHub 链接 | `src/pages/Home.tsx` |
| 全站配色、动效 | `src/index.css` |

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
