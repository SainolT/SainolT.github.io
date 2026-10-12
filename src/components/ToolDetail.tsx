import { useEffect } from 'react'
import type { Tool } from '../data/tools'
import { useLatestRelease } from '../hooks/useLatestRelease'

interface Props {
  tool: Tool | null
  onClose: () => void
}

export default function ToolDetail({ tool, onClose }: Props) {
  const release = useLatestRelease(tool?.repoUrl)
  // Esc 关闭 + 锁定背景滚动
  useEffect(() => {
    if (!tool) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [tool, onClose])

  if (!tool) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-6">
      {/* 遮罩 */}
      <button
        aria-label="关闭"
        onClick={onClose}
        className="animate-overlay-in absolute inset-0 cursor-default bg-[#2C231B]/55 backdrop-blur-sm"
      />

      {/* 弹层本体 */}
      <div className="animate-sheet-in grain relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-[#D8CBB8] bg-[#F6F0E4] shadow-2xl md:rounded-3xl">
        {/* 头部 */}
        <div
          className="relative flex items-start justify-between gap-4 px-6 pb-5 pt-6 md:px-9 md:pt-8"
          style={{ background: 'linear-gradient(135deg, #D9A67933, transparent 60%)' }}
        >
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-display text-outline text-3xl font-black md:text-4xl">
                {tool.index}
              </span>
              {release && (
                <span className="rounded-full bg-[#A8A487] px-3 py-0.5 text-[11px] tracking-widest text-[#3E3128]">
                  {release.tag}
                </span>
              )}
              <span className="rounded-full border border-[#D8CBB8] px-3 py-0.5 text-[11px] tracking-widest text-[#8A7B6C]">
                {tool.platform}
              </span>
            </div>
            <h3 className="font-serif-sc text-2xl font-bold text-[#3E3128] md:text-3xl">
              {tool.name}
              <span className="font-display ml-3 text-base italic text-[#8A7B6C] md:text-lg">
                {tool.nameEn}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3E3128]/25 text-[#3E3128] transition-colors hover:bg-[#3E3128] hover:text-[#F3ECE1]"
            aria-label="关闭详情"
          >
            ✕
          </button>
        </div>

        {/* 内容 */}
        <div className="thin-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-9">
          <div className="grid gap-8 md:grid-cols-[1fr_240px]">
            <div>
              <p className="font-serif-sc text-lg font-semibold text-[#A6623F]">
                「{tool.tagline}」
              </p>
              <p className="mt-4 leading-loose text-[#5C4F42]">{tool.description}</p>
              <ul className="mt-6 space-y-2.5">
                {tool.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#5C4F42]">
                    <span className="mt-1 text-[#C17E5B]">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#D8CBB8] bg-[#F1E9D8] px-3 py-1 text-xs text-[#6B5D4F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 元信息侧栏 */}
            <dl className="h-fit space-y-0 rounded-2xl border border-[#E0D4C0] bg-[#EFE6D4]/70 p-5 text-sm">
              {[
                ...(release ? [['版本', release.tag]] : []),
                ['平台', tool.platform],
                ...(release?.size ? [['大小', release.size]] : []),
                ...(release?.date ? [['更新', release.date]] : []),
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-3 border-b border-[#E0D4C0] py-2.5 last:border-0"
                >
                  <dt className="text-[#8A7B6C]">{k}</dt>
                  <dd className="text-right font-medium text-[#3E3128]">{v}</dd>
                </div>
              ))}
              <a
                href={tool.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block w-full rounded-full bg-[#C17E5B] py-2.5 text-center text-sm tracking-[0.2em] text-[#F6EFE4] transition-colors hover:bg-[#A6623F]"
              >
                下载 exe ↓
              </a>
              <a
                href={tool.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 block w-full rounded-full border border-[#3E3128]/30 py-2.5 text-center text-sm tracking-[0.2em] text-[#3E3128] transition-colors hover:bg-[#3E3128] hover:text-[#F3ECE1]"
              >
                GITHUB ↗
              </a>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-[#B4A791]">
                解压即用，无需安装环境
              </p>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
