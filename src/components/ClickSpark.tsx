import { useEffect } from 'react'

/**
 * 全局点击效果：余烬迸溅 + 墨圈扩散
 * 尊重 prefers-reduced-motion
 */
export default function ClickSpark() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handler = (e: PointerEvent) => {
      const burst = document.createElement('div')
      burst.className = 'click-burst'
      burst.style.left = `${e.clientX}px`
      burst.style.top = `${e.clientY}px`

      const count = 6 + Math.floor(Math.random() * 3)
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span')
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.7
        const dist = 20 + Math.random() * 34
        p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`)
        p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`)
        p.style.setProperty('--d', `${0.4 + Math.random() * 0.35}s`)
        burst.appendChild(p)
      }
      const ring = document.createElement('i')
      burst.appendChild(ring)

      document.body.appendChild(burst)
      window.setTimeout(() => burst.remove(), 900)
    }

    window.addEventListener('pointerdown', handler)
    return () => window.removeEventListener('pointerdown', handler)
  }, [])

  return null
}
