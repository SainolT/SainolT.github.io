import { useEffect, useState } from 'react'

/** 模块级缓存：同一会话内同一仓库只请求一次 */
const cache = new Map<string, string | null>()

/**
 * 读取 GitHub 仓库 README 全文（Markdown 原文）。
 * 请求失败时返回 null，调用方回退到本地文案即可。
 */
export function useReadme(repoUrl: string | undefined): string | null {
  const [md, setMd] = useState<string | null>(
    repoUrl ? cache.get(repoUrl) ?? null : null
  )

  useEffect(() => {
    if (!repoUrl) return
    if (cache.has(repoUrl)) {
      setMd(cache.get(repoUrl) ?? null)
      return
    }
    const m = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/)
    if (!m) return
    const repo = m[2].replace(/\.git$/, '')
    let alive = true
    fetch(`https://api.github.com/repos/${m[1]}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.raw' },
    })
      .then((r) => (r.ok ? r.text() : null))
      .then((t) => {
        cache.set(repoUrl, t || null)
        if (alive) setMd(t || null)
      })
      .catch(() => {
        cache.set(repoUrl, null)
      })
    return () => {
      alive = false
    }
  }, [repoUrl])

  return md
}
