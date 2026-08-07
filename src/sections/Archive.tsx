import { useState } from 'react'
import { articles, type Article } from '../data/articles'
import { useReveal } from '../hooks/useReveal'
import ArticleReader from '../components/ArticleReader'

type Filter = '全部' | '设计案' | '拆解'
const filters: Filter[] = ['全部', '设计案', '拆解']

const typeColor: Record<Article['type'], string> = {
  设计案: '#C17E5B',
  拆解: '#8A8A6D',
}

/** 索引卡：打孔 + 印章 + 撕裂线 */
function IndexCard({
  article,
  onOpen,
}: {
  article: Article
  onOpen: () => void
}) {
  const ref = useReveal<HTMLButtonElement>()
  const color = typeColor[article.type]

  return (
    <button ref={ref} onClick={onOpen} className="reveal group relative w-full text-left">
      <div className="relative border border-[#D8CBB8] bg-[#F6F0E4] px-6 pb-5 pt-6 shadow-[0_10px_26px_-18px_rgba(62,49,40,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_36px_-18px_rgba(143,86,56,0.45)] md:px-8">
        {/* 打孔 */}
        <span className="absolute left-8 top-0 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-[#D8CBB8] bg-[#EDE3D2] shadow-[inset_0_1.5px_3px_rgba(62,49,40,0.35)]" />
        <span className="absolute right-8 top-0 h-3.5 w-3.5 -translate-y-1/2 rounded-full border border-[#D8CBB8] bg-[#EDE3D2] shadow-[inset_0_1.5px_3px_rgba(62,49,40,0.35)]" />

        <div className="flex items-start gap-5 md:gap-7">
          {/* 凹印编号 */}
          <span className="font-display mt-1 text-2xl font-black tracking-tight text-[#D8CBB8] [text-shadow:0_1px_0_#fff8ec] md:text-3xl">
            {article.index}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              {/* 类型印章 */}
              <span
                className="inline-block -rotate-2 rounded border-[1.5px] px-2 py-0.5 text-[11px] font-bold tracking-widest"
                style={{ color, borderColor: color, backgroundColor: `${color}10` }}
              >
                {article.type}
              </span>
              <span className="text-xs tracking-widest text-[#B4A791]">{article.date}</span>
            </div>
            <h3 className="font-serif-sc mt-2.5 text-lg font-bold leading-snug text-[#3E3128] transition-colors group-hover:text-[#A6623F] md:text-xl">
              {article.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#6B5D4F]">
              {article.summary}
            </p>

            {/* 撕裂线 */}
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#D8CBB8] pt-3">
              <div className="flex flex-wrap items-center gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#EDE3D2] px-2.5 py-0.5 text-[11px] text-[#6B5D4F]">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="ml-3 flex flex-none items-center gap-1.5 text-xs tracking-widest text-[#A6623F]">
                约 {article.readMinutes} 分钟
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function Archive() {
  const [filter, setFilter] = useState<Filter>('全部')
  const [active, setActive] = useState<Article | null>(null)
  const headRef = useReveal<HTMLDivElement>()

  const list = filter === '全部' ? articles : articles.filter((a) => a.type === filter)

  return (
    <section id="archive" className="relative mx-auto max-w-6xl scroll-mt-32 px-6 pb-24 md:px-10 md:pb-36">
      {/* 板块标题 */}
      <div ref={headRef} className="reveal mb-10 md:mb-14">
        <p className="mb-3 flex items-center gap-3 text-xs tracking-[0.4em] text-[#A6623F]">
          <span className="h-px w-10 bg-[#A6623F]" />
          SECTION 02
        </p>
        <h2 className="font-serif-sc text-4xl font-black text-[#3E3128] md:text-6xl">
          档案馆
          <span className="font-display text-outline ml-4 align-middle text-3xl italic md:text-5xl">
            Documents
          </span>
        </h2>
      </div>

      {/* 类型筛选 */}
      <div className="mb-8 flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm tracking-wider transition-colors ${
              filter === f
                ? 'bg-[#3E3128] text-[#F3ECE1]'
                : 'border border-[#D8CBB8] bg-[#F6F0E4] text-[#6B5D4F] hover:bg-[#EDE3D2]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 索引卡目录 */}
      <div className="space-y-5">
        {list.map((a) => (
          <IndexCard key={a.id} article={a} onOpen={() => setActive(a)} />
        ))}
      </div>

      <div className="mt-14 flex items-center justify-center gap-4 text-xs tracking-[0.35em] text-[#B4A791]">
        <span className="h-px w-16 bg-[#D8CBB8]" />
        持续归档中
        <span className="h-px w-16 bg-[#D8CBB8]" />
      </div>

      <ArticleReader article={active} onClose={() => setActive(null)} />
    </section>
  )
}
