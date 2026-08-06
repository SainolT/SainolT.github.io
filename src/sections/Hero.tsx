const marqueeItems = [
  '关卡设计',
  '系统设计',
  '数值策划',
  '叙事设计',
  '战斗体验',
  '原型验证',
  'LEVEL DESIGN',
  'SYSTEM DESIGN',
]

function SpinBadge() {
  return (
    <div className="relative h-28 w-28 md:h-36 md:w-36">
      <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full">
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-[#8F5638]" style={{ fontSize: 9.2, letterSpacing: 2.2 }}>
          <textPath href="#badge-circle">PRESS START · 按任意键开始 · PRESS START ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-2xl italic text-[#A6623F] md:text-3xl">▶</span>
      </div>
    </div>
  )
}

/** 陶土拱门里的微缩场景：落日、远山、漂浮的几何体 */
function ArchScene() {
  return (
    <div className="relative h-[420px] w-[260px] overflow-hidden rounded-t-full border border-[#D8CBB8] bg-gradient-to-b from-[#E8C9A0] via-[#DCA97C] to-[#C17E5B] shadow-[0_24px_60px_-24px_rgba(143,86,56,0.55)] md:h-[520px] md:w-[340px]">
      {/* 落日 */}
      <div className="animate-floaty absolute left-1/2 top-[22%] h-24 w-24 -translate-x-1/2 rounded-full bg-[#F6E3BC] shadow-[0_0_60px_20px_rgba(246,227,188,0.65)] md:h-32 md:w-32" />
      {/* 远山 */}
      <div className="absolute bottom-0 left-[-20%] h-[38%] w-[80%] rounded-t-full bg-[#A6623F]/70" />
      <div className="absolute bottom-0 right-[-25%] h-[30%] w-[90%] rounded-t-full bg-[#8F5638]/80" />
      {/* 漂浮几何 */}
      <div className="animate-drift absolute left-[18%] top-[14%] h-4 w-4 rotate-45 bg-[#F3ECE1]/80" />
      <div
        className="animate-drift absolute right-[16%] top-[38%] h-3 w-3 rounded-full bg-[#F3ECE1]/70"
        style={{ animationDelay: '-3s' }}
      />
      <div
        className="animate-drift absolute left-[26%] top-[52%] h-2.5 w-2.5 rounded-full bg-[#F6E3BC]/90"
        style={{ animationDelay: '-6s' }}
      />
      {/* 底部地平线条 */}
      <div className="absolute bottom-[18%] left-1/2 h-px w-3/4 -translate-x-1/2 bg-[#F3ECE1]/40" />
      <div className="absolute bottom-[14%] left-1/2 h-px w-1/2 -translate-x-1/2 bg-[#F3ECE1]/30" />
    </div>
  )
}

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col overflow-hidden">
      {/* 顶栏 */}
      <div className="flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
        <span className="font-display text-sm font-semibold tracking-[0.3em] text-[#3E3128]">
          SAINOLT<sup className="text-[#A6623F]">®</sup>
        </span>
        <span className="hidden text-[11px] tracking-[0.35em] text-[#8A7B6C] md:block">
          GAME DESIGN ARCHIVE — 2026
        </span>
        <a
          href="https://github.com/SainolT"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#3E3128]/30 px-4 py-1.5 text-xs tracking-widest text-[#3E3128] transition-colors hover:bg-[#3E3128] hover:text-[#F3ECE1]"
        >
          GITHUB ↗
        </a>
      </div>

      {/* 主体：左文右拱门的非对称构图 */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-6 md:px-12">
        {/* 左侧竖排 */}
        <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex">
          <span
            className="text-[11px] tracking-[0.5em] text-[#A6623F]"
            style={{ writingMode: 'vertical-rl' }}
          >
            游戏策划 · GAME DESIGNER
          </span>
          <span className="w-px flex-none self-stretch bg-[#A6623F]/60" />
        </div>

        <div className="relative z-10 flex-1 pb-24 pt-10 md:pb-32">
          <p className="mb-5 flex items-center gap-3 text-xs tracking-[0.4em] text-[#8A7B6C]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#C17E5B]" />
            PORTFOLIO — 作品档案馆
          </p>
          <h1 className="font-display leading-[0.9] text-[#3E3128]">
            <span className="block text-[16vw] font-black tracking-tight md:text-[9.5rem]">
              Sainol
              <span className="italic text-[#C17E5B]">T</span>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#6B5D4F] md:text-lg">
            一名<span className="font-serif-sc font-bold text-[#3E3128]">游戏策划</span>。
            把规则写成体验，把体验藏进细节——
            这里收藏着我设计的每一个世界。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#library"
              className="group rounded-full bg-[#3E3128] px-7 py-3 text-sm tracking-[0.25em] text-[#F3ECE1] transition-transform hover:-translate-y-0.5"
            >
              进入游戏库
              <span className="ml-2 inline-block transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <span className="text-xs tracking-widest text-[#8A7B6C]">
              {`{ 3 个项目收录中 }`}
            </span>
          </div>
        </div>

        {/* 右侧拱门 + 旋转徽章 */}
        <div className="relative z-10 mr-2 hidden shrink-0 md:block">
          <ArchScene />
          <div className="absolute -left-16 bottom-10">
            <SpinBadge />
          </div>
        </div>

        {/* 移动端拱门缩小版 */}
        <div className="absolute -right-16 top-6 opacity-90 md:hidden">
          <div className="origin-top-right scale-[0.42]">
            <ArchScene />
          </div>
        </div>
      </div>

      {/* 底部跑马灯 */}
      <div className="relative border-y border-[#D8CBB8] bg-[#EDE3D2]/70 py-3.5 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeItems.map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="flex items-center whitespace-nowrap text-sm tracking-[0.3em] text-[#6B5D4F]"
                >
                  <span className="px-6">{item}</span>
                  <span className="text-[#C17E5B]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
