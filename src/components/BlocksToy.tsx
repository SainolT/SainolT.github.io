import { useEffect, useMemo, useRef, useState } from 'react'
import { ANIMALS, type AnimalDef } from '../data/animals'

const COLS = 12
const ROWS = 12
const POOL = 90

interface Cell {
  x: number
  y: number
  color: string
}

function parseCells(def: AnimalDef): Cell[] {
  const cells: Cell[] = []
  const offY = Math.floor((ROWS - def.map.length) / 2)
  def.map.forEach((line, y) => {
    ;[...line].forEach((ch, x) => {
      const color = def.colors[ch]
      if (color) cells.push({ x, y: y + offY, color })
    })
  })
  return cells
}

interface Scatter {
  dx: number
  dy: number
  rot: number
  tilt: number
}

/** 积木拼图画布：默认拼成小动物，悬停散开浮动，点击换一只 */
export default function BlocksToy() {
  const [idx, setIdx] = useState(0)
  const [scattered, setScattered] = useState(false)
  // 点击后抑制悬停散开，直到鼠标真正移出画布
  const suppressRef = useRef(false)
  const timerRef = useRef<number | undefined>(undefined)

  // 每个积木块固定的散开位移与常态微倾角（只生成一次，避免闪烁）
  const [scatter] = useState<Scatter[]>(() =>
    Array.from({ length: POOL }, () => ({
      dx: (Math.random() - 0.5) * 190,
      dy: (Math.random() - 0.5) * 210,
      rot: (Math.random() - 0.5) * 56,
      tilt: (Math.random() - 0.5) * 6,
    })),
  )
  // 闲置块的停靠位置（固定）
  const [parked] = useState(() =>
    Array.from({ length: POOL }, (_, i) => ({
      x: (i * 37) % COLS,
      y: (i * 53) % ROWS,
    })),
  )

  const animal = ANIMALS[idx]
  const cells = useMemo(() => parseCells(animal), [animal])

  const next = () => {
    let n = idx
    while (n === idx) n = Math.floor(Math.random() * ANIMALS.length)
    setIdx(n)
    suppressRef.current = true
    window.clearTimeout(timerRef.current)
    if (scattered) {
      // 散开中点击：散开的积木直接飞向新造型
      timerRef.current = window.setTimeout(() => setScattered(false), 480)
    } else {
      // 组合中点击（鼠标未移开）：先散开一下再重组
      setScattered(true)
      timerRef.current = window.setTimeout(() => setScattered(false), 480)
    }
  }

  const handleEnter = () => {
    if (!suppressRef.current) setScattered(true)
  }
  const handleLeave = () => {
    window.clearTimeout(timerRef.current)
    suppressRef.current = false
    setScattered(false)
  }

  useEffect(
    () => () => window.clearTimeout(timerRef.current),
    [],
  )

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`积木拼图，当前是${animal.name}，点击换一只`}
      onClick={next}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && next()}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="grain relative block aspect-square w-[320px] cursor-pointer select-none overflow-visible rounded-[28px] border border-[#D8CBB8] bg-[#EDE3D2] shadow-[0_24px_60px_-24px_rgba(143,86,56,0.45)] outline-none lg:w-[400px]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[28px]">
        {Array.from({ length: POOL }, (_, i) => {
          const c = cells[i]
          const s = scatter[i]
          const p = parked[i]
          const pos = c ?? p
          return (
            <div
              key={i}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
              style={{
                left: `${(pos.x / COLS) * 100}%`,
                top: `${(pos.y / ROWS) * 100}%`,
                width: `${100 / COLS}%`,
                height: `${100 / ROWS}%`,
                padding: 2.5,
                transitionDelay: `${i * 5}ms`,
                opacity: c ? 1 : 0,
                transform: scattered
                  ? `translate(${s.dx}px, ${s.dy}px) rotate(${s.rot}deg)`
                  : `rotate(${s.tilt}deg)`,
              }}
            >
              {/* 拼贴纸：奶油纸包边 + 色块 */}
              <div
                className={`h-full w-full rounded-[5px] bg-[#F6F0E4] p-[3px] shadow-[0_3px_7px_-2px_rgba(62,49,40,0.4)] ${
                  scattered ? 'animate-bob' : ''
                }`}
                style={scattered ? { animationDelay: `${(i % 9) * 0.14}s` } : undefined}
              >
                <div
                  className="h-full w-full rounded-[3px]"
                  style={{
                    background: c
                      ? `linear-gradient(155deg, ${c.color}E6, ${c.color})`
                      : 'transparent',
                    boxShadow: c ? 'inset 0 -2px 4px rgba(62,49,40,0.16)' : 'none',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* 当前动物 + 操作提示 */}
      <span className="font-display absolute left-4 top-3.5 text-[11px] italic tracking-widest text-[#A6623F]">
        {animal.name} · {animal.nameEn}
      </span>
      <span className="absolute right-4 top-3.5 whitespace-nowrap text-[10px] tracking-[0.3em] text-[#B4A791]">
        点击换一只小动物
      </span>
    </div>
  )
}
