import BlocksToy from '../components/BlocksToy'
import PressStartButton from '../components/PressStartButton'

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

export default function Hero({ onPlayStart }: { onPlayStart: () => void }) {
  return (
    <header className="relative flex min-h-screen flex-col overflow-hidden">
      {/* 顶栏 */}
      <div className="flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
        <span className="font-display text-sm font-semibold tracking-[0.3em] text-[#3E3128]">
          SAINOLT<sup className="text-[#A6623F]">®</sup>
        </span>
        <nav className="hidden items-center gap-6 text-[11px] tracking-[0.3em] text-[#8A7B6C] md:flex">
          <a href="#library" className="transition-colors hover:text-[#A6623F]">游戏库</a>
          <a href="#archive" className="transition-colors hover:text-[#A6623F]">档案馆</a>
        </nav>
        <span className="hidden text-[11px] tracking-[0.35em] text-[#8A7B6C] lg:block">
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

      {/* 主体：左文右积木板的非对称构图 */}
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
            这里收录我设计的游戏，和写下的拆解。
          </p>
          {/* 按钮区：点阵花纹底 + 主深次浅三个纸质按钮 */}
          <div className="relative mt-10 self-start">
            <div
              aria-hidden
              className="absolute -inset-x-7 -inset-y-6 rounded-[28px]"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(166,98,63,0.14) 1.5px, transparent 2.2px)',
                backgroundSize: '17px 17px',
              }}
            />
            <div className="relative flex flex-wrap items-center gap-4">
              {/* 主按钮：深色 + 前置图标 */}
              <a
                href="#library"
                className="group relative flex items-center gap-3 rounded-2xl bg-[#3E3128] px-6 py-4 shadow-[0_5px_0_#D8CBB8,0_16px_30px_-14px_rgba(44,35,27,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_7px_0_#D8CBB8,0_22px_36px_-14px_rgba(44,35,27,0.65)] active:translate-y-0.5 active:shadow-[0_2px_0_#D8CBB8]"
              >
                <span className="pointer-events-none absolute inset-1.5 rounded-xl border border-dashed border-[#F3ECE1]/25" />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#C17E5B] shadow-[inset_0_-3px_0_rgba(62,49,40,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#F6EFE4" aria-hidden>
                    <path d="M7.5 6h9a5.5 5.5 0 0 1 5.5 5.5v2.25a3.25 3.25 0 0 1-5.66 2.2L14.6 14H9.4l-1.74 1.95A3.25 3.25 0 0 1 2 13.75V11.5A5.5 5.5 0 0 1 7.5 6Zm.5 3v1.5H6.5a.75.75 0 0 0 0 1.5H8v1.5a.75.75 0 0 0 1.5 0V12h1.5a.75.75 0 0 0 0-1.5H9.5V9A.75.75 0 0 0 8 9Zm8.25.75a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm2.1 2.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
                  </svg>
                </span>
                <span className="relative text-left">
                  <span className="font-serif-sc block text-base font-bold tracking-[0.2em] text-[#F3ECE1]">
                    进入游戏库
                  </span>
                  <span className="font-display block text-[10px] italic tracking-[0.3em] text-[#F3ECE1]/55">
                    GAME LIBRARY
                  </span>
                </span>
              </a>
              <a
                href="#archive"
                className="group relative flex items-center gap-3 rounded-2xl bg-[#3E3128] px-6 py-4 shadow-[0_5px_0_#D8CBB8,0_16px_30px_-14px_rgba(44,35,27,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_7px_0_#D8CBB8,0_22px_36px_-14px_rgba(44,35,27,0.65)] active:translate-y-0.5 active:shadow-[0_2px_0_#D8CBB8]"
              >
                <span className="pointer-events-none absolute inset-1.5 rounded-xl border border-dashed border-[#F3ECE1]/25" />
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#C17E5B] shadow-[inset_0_-3px_0_rgba(62,49,40,0.25)] transition-transform duration-300 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#F6EFE4" aria-hidden>
                    <path d="M4 3h16a1 1 0 0 1 1 1v3.5H3V4a1 1 0 0 1 1-1Zm-1 6.5h18V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5Zm6.5 3a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-5Z" />
                  </svg>
                </span>
                <span className="relative text-left">
                  <span className="font-serif-sc block text-base font-bold tracking-[0.2em] text-[#F3ECE1]">
                    档案馆
                  </span>
                  <span className="font-display block text-[10px] italic tracking-[0.3em] text-[#F3ECE1]/55">
                    DOCUMENTS
                  </span>
                </span>
              </a>
            </div>
            {/* 次按钮 */}
            <div className="relative mt-5">
              <PressStartButton onClick={onPlayStart} />
            </div>
          </div>
        </div>

        {/* 右侧积木拼图画布 */}
        <div className="relative z-10 mr-2 hidden shrink-0 md:block">
          <BlocksToy />
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
