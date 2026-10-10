import { useState } from 'react'
import { tools, type Tool } from '../data/tools'
import { useReveal } from '../hooks/useReveal'
import ToolDetail from '../components/ToolDetail'

/** 吊牌卡：穿孔 + 挂绳 + 撕裂线 */
function TagCard({ tool, onOpen }: { tool: Tool; onOpen: () => void }) {
  const ref = useReveal<HTMLButtonElement>()

  return (
    <button ref={ref} onClick={onOpen} className="reveal group relative w-full text-left">
      <div className="relative -rotate-1 rounded-2xl border border-[#D8CBB8] bg-[#F6F0E4] px-6 pb-5 pt-6 shadow-[0_10px_26px_-18px_rgba(62,49,40,0.4)] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_20px_36px_-18px_rgba(143,86,56,0.45)] md:px-8">
        {/* 挂绳孔 */}
        <span className="absolute left-7 top-5 h-4 w-4 rounded-full border border-[#D8CBB8] bg-[#EDE3D2] shadow-[inset_0_1.5px_3px_rgba(62,49,40,0.35)]" />
        {/* 挂绳 */}
        <span
          aria-hidden
          className="absolute left-[38px] top-0 h-6 w-px"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, #A8A487 0 4px, transparent 4px 7px)',
          }}
        />

        <div className="flex items-start gap-5 pl-8 md:gap-7 md:pl-10">
          {/* 凹印编号 */}
          <span className="font-display mt-1 text-2xl font-black tracking-tight text-[#D8CBB8] [text-shadow:0_1px_0_#fff8ec] md:text-3xl">
            {tool.index}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block -rotate-2 rounded border-[1.5px] border-[#A8A487] bg-[#A8A487]/10 px-2 py-0.5 text-[11px] font-bold tracking-widest text-[#77745A]">
                {tool.platform}
              </span>
              <span className="text-xs tracking-widest text-[#B4A791]">
                {tool.version} · {tool.date}
              </span>
            </div>
            <h3 className="font-serif-sc mt-2.5 text-lg font-bold leading-snug text-[#3E3128] transition-colors group-hover:text-[#A6623F] md:text-xl">
              {tool.name}
              <span className="font-display ml-2.5 text-sm italic font-medium text-[#8A7B6C]">
                {tool.nameEn}
              </span>
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6B5D4F]">
              {tool.tagline}
            </p>

            {/* 撕裂线 */}
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#D8CBB8] pt-3">
              <div className="flex flex-wrap items-center gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#EDE3D2] px-2.5 py-0.5 text-[11px] text-[#6B5D4F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="ml-3 flex flex-none items-center gap-1.5 text-xs tracking-widest text-[#A6623F]">
                详情 / 下载
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
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

      {/* 吊牌目录 */}
      <div className="space-y-5">
        {tools.map((t) => (
          <TagCard key={t.id} tool={t} onOpen={() => setActive(t)} />
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
