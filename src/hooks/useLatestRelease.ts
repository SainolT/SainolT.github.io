import { useEffect, useState } from 'react'

/** 模块级缓存：同一会话内同一仓库只请求一次 */
const cache = new Map<string, string | null>()

/**
 * 读取 GitHub 仓库最新 Release 的 tag（如 v1.0.0）。
 * 请求失败或没有 Release 时返回 null，调用方直接不显示版本号即可。
 */
export function useLatestRelease(repoUrl: string | undefined): string | null {
  const [tag, setTag] = useState<string | null>(
    repoUrl ? cache.get(repoUrl) ?? null : null
  )

  useEffect(() => {
    if (!repoUrl) return
    if (cache.has(repoUrl)) {
      setTag(cache.get(repoUrl) ?? null)
      return
    }
    const m = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/)
    if (!m) return
    const repo = m[2].replace(/\.git$/, '')
    let alive = true
    fetch(`https://api.github.com/repos/${m[1]}/${repo}/releases/latest`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const t: string | null = d?.tag_name ?? null
        cache.set(repoUrl, t)
        if (alive) setTag(t)
      })
      .catch(() => {
        cache.set(repoUrl, null)
      })
    return () => {
      alive = false
    }
  }, [repoUrl])

  return tag
}
