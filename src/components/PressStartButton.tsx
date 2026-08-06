interface Props {
  onClick: () => void
  className?: string
}

/** 拼贴纸质感的 PRESS START 按钮：点击直接开始试玩 */
export default function PressStartButton({ onClick, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-2xl bg-[#F6F0E4] px-5 py-3.5 shadow-[0_5px_0_#D8CBB8,0_16px_30px_-14px_rgba(143,86,56,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_7px_0_#D8CBB8,0_22px_36px_-14px_rgba(143,86,56,0.55)] active:translate-y-0.5 active:shadow-[0_2px_0_#D8CBB8] ${className}`}
    >
      {/* 虚线缝线 */}
      <span className="pointer-events-none absolute inset-1.5 rounded-xl border border-dashed border-[#C17E5B]/45" />
      <span className="relative flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C17E5B] shadow-[inset_0_-3px_0_rgba(62,49,40,0.25)] transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" aria-hidden>
            <path
              d="M8.2 5.9c0-1.1 1.2-1.8 2.2-1.3l8.3 5.3c.9.6.9 1.9 0 2.5l-8.3 5.3c-1 .6-2.2-.1-2.2-1.3V5.9z"
              fill="#F6EFE4"
              stroke="#F6EFE4"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="text-left">
          <span className="font-serif-sc block text-sm font-bold tracking-[0.18em] text-[#3E3128]">
            点击开始游戏
          </span>
          <span className="font-display block text-[10px] italic tracking-[0.3em] text-[#8A7B6C]">
            PRESS START
          </span>
        </span>
      </span>
    </button>
  )
}
