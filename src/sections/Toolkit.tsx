import { useState } from 'react'
import { tools, type Tool } from '../data/tools'
import { useReveal } from '../hooks/useReveal'
import { useLatestRelease } from '../hooks/useLatestRelease'
import ToolDetail from '../components/ToolDetail'

/** 工具卡：图标徽章 + 虚线内框，与首页按钮同一语言 */
function ToolCard({ tool, onOpen }: { tool: Tool; onOpen: () => void }) {
  const ref = useReveal<HTMLButtonElement>()
  const version = useLatestRelease(tool.repoUrl)

  return (
    <button ref={ref} onClick={onOpen} className="reveal group relative w-full text-left">
      <div className="relative rounded-2xl border border-[#D8CBB8] bg-[#F6F0E4] p-2.5 shadow-[0_10px_26px_-18px_rgba(62,49,40,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_36px_-18px_rgba(143,86,56,0.45)]">
        {/* 虚线内框 */}
        <div className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-[#C17E5B]/35" />

        <div className="relative flex items-center gap-5 px-4 py-4 md:gap-7 md:px-6">
          {/* 图标徽章 */}
          <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-[#C17E5B] shadow-[inset_0_-4px_0_rgba(62,49,40,0.22)] transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16">
            <svg viewBox="0 0 24 24" className="h-7 w-7 md:h-8 md:w-8" fill="#F6EFE4" aria-hidden>
              <path d="M4 4h16a1 1 0 0 1 1 1v3H3V5a1 1 0 0 1 1-1ZM3 10h7v4H3V10Zm0 6h7v4H4a1 1 0 0 1-1-1v-3Zm9-6h9v9a1 1 0 0 1-1 1h-8V10Z" />
            </svg>
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-serif-sc text-lg font-bold leading-snug text-[#3E3128] transition-colors group-hover:text-[#A6623F] md:text-xl">
                {tool.name}
              </h3>
              <span className="font-display text-sm italic font-medium text-[#8A7B6C]">
                {tool.nameEn}
              </span>
              <span className="rounded-full bg-[#EDE3D2] px-2.5 py-0.5 text-[11px] tracking-widest text-[#8A7B6C]">
                {version ? `${version} · ` : ''}{tool.platform}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#6B5D4F]">
              {tool.tagline}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#EDE3D2] px-2.5 py-0.5 text-[11px] text-[#6B5D4F]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 右侧：编号 + 箭头 */}
          <div className="flex flex-none flex-col items-end gap-2 self-stretch py-1">
            <span className="font-display text-xl font-black tracking-tight text-[#D8CBB8] [text-shadow:0_1px_0_#fff8ec] md:text-2xl">
              {tool.index}
            </span>
            <span className="mt-auto flex items-center gap-1.5 text-xs tracking-widest text-[#A6623F]">
              详情 / 下载
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function Toolkit() {
  const [active, setActive] = useState<Tool | null>(null)
  const headRef = useReveal<HTMLDivElement>()

  return (
    <section
      id="toolkit"
      className="relative mx-auto max-w-6xl scroll-mt-8 px-6 pt-24 md:px-10 md:pt-36 md:-scroll-mt-4"
    >
      {/* 板块标题 */}
      <div ref={headRef} className="reveal mb-10 md:mb-14">
        <p className="mb-3 flex items-center gap-3 text-xs tracking-[0.4em] text-[#A6623F]">
          <span className="h-px w-10 bg-[#A6623F]" />
          SECTION 02
        </p>
        <h2 className="font-serif-sc text-4xl font-black text-[#3E3128] md:text-6xl">
          工具箱
          <span className="font-display text-outline ml-4 align-middle text-3xl italic md:text-5xl">
            Toolkit
          </span>
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#8A7B6C]">
          策划工作中沉淀下来的自用小工具，开源在 GitHub，可直接下载使用。
        </p>
      </div>

      {/* 工具卡目录 */}
      <div className="space-y-5">
        {tools.map((t) => (
          <ToolCard key={t.id} tool={t} onOpen={() => setActive(t)} />
        ))}
      </div>

      <div className="mt-14 flex items-center justify-center gap-4 text-xs tracking-[0.35em] text-[#B4A791]">
        <span className="h-px w-16 bg-[#D8CBB8]" />
        更多工具打磨中
        <span className="h-px w-16 bg-[#D8CBB8]" />
      </div>

      <ToolDetail tool={active} onClose={() => setActive(null)} />
    </section>
  )
}
