import { useCallback, useEffect, useRef, useState } from 'react'

const SHARE_URL = 'https://sainolt.github.io/'

export default function SiteNav() {
  const [toast, setToast] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const showToast = useCallback(() => {
    setToast(true)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setToast(false), 2200)
  }, [])

  const onShare = useCallback(async () => {
    const data = { title: 'SainolT · 游戏策划', text: 'games and ideas', url: SHARE_URL }
    if (navigator.share) {
      try {
        await navigator.share(data)
      } catch {
        /* 用户取消，无需处理 */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      showToast()
    } catch {
      const ta = document.createElement('textarea')
      ta.value = SHARE_URL
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        showToast()
      } catch {
        /* 复制失败则静默 */
      }
      document.body.removeChild(ta)
    }
  }, [showToast])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50">
        {/* 深咖纸条本体 */}
        <div className="border-b border-[#3E3128] bg-[#4C3D32]">
          <div className="flex h-14 w-full items-center justify-between gap-4 px-6 md:h-16 md:px-12">
            {/* 左侧：徽章 logo + 锚点入口 */}
            <div className="flex items-center gap-5 md:gap-9">
              <a href="#top" className="group flex items-center gap-2.5">
                <img
                  src="./icon-192.png"
                  alt="SainolT 徽章"
                  className="h-8 w-8 -rotate-3 rounded-[9px] shadow-[0_2px_0_#2C231B,0_6px_12px_-6px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105"
                />
                <span className="font-display text-sm font-bold tracking-[0.22em] text-[#F3ECE1]">
                  SAINOL<span className="italic text-[#D9A679]">T</span>
                </span>
              </a>
              <div className="font-serif-sc flex items-center gap-4 text-xs font-semibold tracking-[0.3em] text-[#F6EFE4]/85 md:gap-7">
                <a href="#top" className="transition-colors hover:text-[#D9A679]">
                  主页
                </a>
                <a href="#library" className="transition-colors hover:text-[#D9A679]">
                  游戏库
                </a>
                <a href="#archive" className="transition-colors hover:text-[#D9A679]">
                  档案馆
                </a>
              </div>
            </div>

            {/* 右侧：分享（纸片贴纸）+ GitHub（幽灵描边） */}
            <div className="flex items-center gap-2.5 md:gap-3">
              <button
                type="button"
                onClick={onShare}
                className="flex items-center gap-2 rounded-full bg-[#F6EFE4] px-3.5 py-1.5 text-xs font-semibold tracking-widest text-[#3E3128] transition-colors hover:bg-[#D9A679] md:px-4"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                  <path d="M13.5 3.5a1 1 0 0 1 .7-.3h5.3a1 1 0 0 1 1 1v5.3a1 1 0 1 1-2 0V6.6l-6.2 6.2a1 1 0 0 1-1.4-1.4l6.2-6.2h-2.9a1 1 0 0 1-.7-1.7ZM5 5.5h4a1 1 0 0 1 0 2H6.5v11H17v-2.5a1 1 0 1 1 2 0V17.5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2V7a1.5 1.5 0 0 1 1.5-1.5Z" />
                </svg>
                <span className="hidden md:inline">分享</span>
              </button>
              <a
                href="https://github.com/SainolT"
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full border border-[#F6EFE4]/25 px-4 py-1.5 text-xs tracking-widest text-[#F6EFE4]/75 transition-colors hover:border-[#F6EFE4]/60 hover:text-[#F6EFE4] sm:block"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>
        {/* 底部缝线 */}
        <div
          aria-hidden
          className="h-[3px] w-full opacity-70"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #C17E5B 0 9px, transparent 9px 16px)',
          }}
        />
      </nav>

      {/* 复制成功小纸条 */}
      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-8 left-1/2 z-[60] -translate-x-1/2 transition-all duration-300 ${
          toast ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 rounded-xl border border-[#D8CBB8] bg-[#F6F0E4] px-5 py-2.5 shadow-[0_4px_0_#D8CBB8,0_18px_30px_-14px_rgba(44,35,27,0.5)]">
          <span className="text-[#C17E5B]">✦</span>
          <span className="text-xs tracking-[0.25em] text-[#3E3128]">链接已复制，去分享吧</span>
        </div>
      </div>
    </>
  )
}
