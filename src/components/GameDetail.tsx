import { useEffect, useState } from 'react'
import type { Game } from '../data/games'

interface Props {
  game: Game | null
  onClose: () => void
}

const statusStyle: Record<Game['status'], string> = {
  可试玩: 'bg-[#C17E5B] text-[#F6EFE4]',
  开发中: 'bg-[#A8A487] text-[#3E3128]',
  概念案: 'bg-[#D9A679] text-[#3E3128]',
}

export default function GameDetail({ game, onClose }: Props) {
  const [tab, setTab] = useState<'archive' | 'play'>('archive')
  const [launched, setLaunched] = useState(false)

  // 每次切换游戏时重置
  useEffect(() => {
    setTab('archive')
    setLaunched(false)
  }, [game?.id])

  // Esc 关闭 + 锁定背景滚动
  useEffect(() => {
    if (!game) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [game, onClose])

  if (!game) return null

  const canPlay = Boolean(game.playUrl)

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center md:p-6">
      {/* 遮罩 */}
      <button
        aria-label="关闭"
        onClick={onClose}
        className="animate-overlay-in absolute inset-0 cursor-default bg-[#2C231B]/55 backdrop-blur-sm"
      />

      {/* 档案卷宗 */}
      <div className="animate-sheet-in grain relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-[#D8CBB8] bg-[#F6F0E4] shadow-2xl md:rounded-3xl">
        {/* 头部 */}
        <div
          className="relative flex items-start justify-between gap-4 px-6 pb-5 pt-6 md:px-9 md:pt-8"
          style={{ background: `linear-gradient(135deg, ${game.tone.glow}33, transparent 60%)` }}
        >
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="font-display text-outline text-3xl font-black md:text-4xl">
                {game.index}
              </span>
              <span
                className={`rounded-full px-3 py-0.5 text-[11px] tracking-widest ${statusStyle[game.status]}`}
              >
                {game.status}
              </span>
            </div>
            <h3 className="font-serif-sc text-2xl font-bold text-[#3E3128] md:text-3xl">
              {game.title}
              <span className="font-display ml-3 text-base italic text-[#8A7B6C] md:text-lg">
                {game.titleEn}
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

        {/* 页签 */}
        <div className="flex gap-2 border-y border-[#E0D4C0] bg-[#EFE6D4]/80 px-6 py-2.5 md:px-9">
          {(
            [
              { key: 'archive', label: '📜 档案' },
              { key: 'play', label: canPlay ? '🎮 试玩' : '🎮 试玩（未开放）' },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => t.key === 'archive' || canPlay ? setTab(t.key) : undefined}
              className={`rounded-full px-4 py-1.5 text-sm tracking-wider transition-colors ${
                tab === t.key
                  ? 'bg-[#3E3128] text-[#F3ECE1]'
                  : t.key === 'play' && !canPlay
                    ? 'cursor-not-allowed text-[#B4A791]'
                    : 'text-[#6B5D4F] hover:bg-[#E4D8C2]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 内容 */}
        <div className="thin-scroll flex-1 overflow-y-auto px-6 py-6 md:px-9">
          {tab === 'archive' ? (
            <div className="grid gap-8 md:grid-cols-[1fr_240px]">
              <div>
                <p className="font-serif-sc text-lg font-semibold text-[#A6623F]">
                  「{game.oneLiner}」
                </p>
                <p className="mt-4 leading-loose text-[#5C4F42]">{game.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {game.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-[#5C4F42]">
                      <span className="mt-1 text-[#C17E5B]">✦</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
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
                  ['类型', game.genre],
                  ['职责', game.role],
                  ['年份', game.year],
                  ['状态', game.status],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-3 border-b border-[#E0D4C0] py-2.5 last:border-0"
                  >
                    <dt className="text-[#8A7B6C]">{k}</dt>
                    <dd className="text-right font-medium text-[#3E3128]">{v}</dd>
                  </div>
                ))}
                {canPlay && (
                  <button
                    onClick={() => setTab('play')}
                    className="mt-4 w-full rounded-full bg-[#C17E5B] py-2.5 text-sm tracking-[0.2em] text-[#F6EFE4] transition-colors hover:bg-[#A6623F]"
                  >
                    立即试玩 →
                  </button>
                )}
              </dl>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              {!launched ? (
                <button
                  onClick={() => setLaunched(true)}
                  className="group relative flex min-h-[320px] flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl text-[#F6EFE4] md:min-h-[420px]"
                  style={{ background: `linear-gradient(160deg, ${game.tone.base}, ${game.tone.deep})` }}
                >
                  <span className="font-display text-outline text-6xl font-black opacity-40 md:text-8xl">
                    {game.index}
                  </span>
                  <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F6EFE4]/70 text-2xl transition-transform group-hover:scale-110">
                    ▶
                  </span>
                  <span className="mt-4 text-sm tracking-[0.35em]">点击开始试玩</span>
                  <span className="mt-2 text-xs text-[#F6EFE4]/70">
                    键盘 ← → 或 A / D 移动 · 触屏拖动
                  </span>
                </button>
              ) : (
                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex items-center justify-between text-xs text-[#8A7B6C]">
                    <span>🎮 {game.titleEn} — H5 实机试玩</span>
                    <button
                      onClick={() => setLaunched(false)}
                      className="rounded-full border border-[#D8CBB8] px-3 py-1 transition-colors hover:bg-[#E4D8C2]"
                    >
                      结束试玩
                    </button>
                  </div>
                  <iframe
                    src={game.playUrl}
                    title={`${game.title} 试玩`}
                    className="min-h-[380px] w-full flex-1 rounded-2xl border border-[#D8CBB8] bg-[#2C231B] md:min-h-[440px]"
                    allow="autoplay; fullscreen"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
