import { useEffect } from 'react'
import type { Article } from '../data/articles'

interface Props {
  article: Article | null
  onClose: () => void
}

const typeColor: Record<Article['type'], string> = {
  设计案: '#C17E5B',
  拆解: '#8A8A6D',
}

export default function ArticleReader({ article, onClose }: Props) {
  useEffect(() => {
    if (!article) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [article, onClose])

  if (!article) return null
  const color = typeColor[article.type]

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="关闭"
        onClick={onClose}
        className="animate-overlay-in absolute inset-0 cursor-default bg-[#2C231B]/50 backdrop-blur-sm"
      />
      <div className="animate-sheet-in grain absolute inset-x-0 bottom-0 top-[4vh] mx-auto flex max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-[#D8CBB8] bg-[#F6F0E4] md:top-[6vh]">
        {/* 元信息栏 */}
        <div className="flex flex-none items-center justify-between gap-4 border-b border-[#E0D4C0] bg-[#EFE6D4]/80 px-6 py-3.5 md:px-10">
          <div className="flex items-center gap-3 text-xs tracking-widest text-[#8A7B6C]">
            <span
              className="rounded border px-2 py-0.5 font-medium"
              style={{ color, borderColor: color, backgroundColor: `${color}14` }}
            >
              {article.type}
            </span>
            <span className="font-display">{article.index}</span>
            <span>{article.date}</span>
            <span>约 {article.readMinutes} 分钟</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[#3E3128]/25 text-[#3E3128] transition-colors hover:bg-[#3E3128] hover:text-[#F3ECE1]"
            aria-label="关闭阅读器"
          >
            ✕
          </button>
        </div>

        {/* 正文 */}
        <div className="thin-scroll flex-1 overflow-y-auto">
          <article className="mx-auto max-w-[65ch] px-6 py-10 md:py-14">
            <h1 className="font-serif-sc text-2xl font-bold leading-snug text-[#3E3128] md:text-3xl">
              {article.title}
            </h1>
            {article.titleEn && (
              <p className="font-display mt-2 text-sm italic text-[#8A7B6C]">{article.titleEn}</p>
            )}
            <div className="mt-6 h-px w-16" style={{ backgroundColor: color }} />

            {article.content.map((sec, i) => (
              <section key={i} className="mt-8">
                {sec.heading && (
                  <h2
                    className="font-serif-sc mb-3 text-lg font-bold"
                    style={{ color }}
                  >
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((p, j) => (
                  <p key={j} className="mb-4 leading-loose text-[#4E4237]">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <p className="mt-12 text-center text-xs tracking-[0.4em] text-[#B4A791]">
              — 卷宗完 —
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}
