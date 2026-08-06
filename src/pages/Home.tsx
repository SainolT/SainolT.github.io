import Hero from '../sections/Hero'
import GameLibrary from '../sections/GameLibrary'
import Archive from '../sections/Archive'
import ClickSpark from '../components/ClickSpark'

export default function Home() {
  return (
    <main className="grain min-h-screen">
      <ClickSpark />
      <Hero />
      <GameLibrary />
      <Archive />

      {/* 页脚 */}
      <footer className="border-t border-[#D8CBB8] bg-[#EDE3D2]/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row md:px-10">
          <div className="text-center md:text-left">
            <p className="font-display text-xl font-bold text-[#3E3128]">
              Sainol<span className="italic text-[#C17E5B]">T</span>
            </p>
            <p className="mt-1 text-xs tracking-[0.3em] text-[#8A7B6C]">
              游戏策划 · GAME DESIGNER
            </p>
          </div>
          <a
            href="https://github.com/SainolT"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-full border border-[#3E3128]/30 px-6 py-3 text-sm tracking-widest text-[#3E3128] transition-colors hover:bg-[#3E3128] hover:text-[#F3ECE1]"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            GITHUB.COM/SAINOLT
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        </div>
        <p className="pb-6 text-center text-[11px] tracking-[0.25em] text-[#B4A791]">
          © 2026 SAINOLT — 本站点由 GitHub Pages 承载
        </p>
      </footer>
    </main>
  )
}
