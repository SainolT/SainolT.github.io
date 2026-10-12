import { useEffect, useState } from 'react'

export interface ReleaseInfo {
  /** 版本 tag，如 v1.0.0 */
  tag: string
  /** 发布时间，格式 YYYY-MM */
  date: string
  /** exe 附件大小，如 约 11.7 MB；没有 exe 附件时为 null */
  size: string | null
}

/** 模块级缓存：同一会话内同一仓库只请求一次 */
const cache = new Map<string, ReleaseInfo | null>()

/**
 * 读取 GitHub 仓库最新 Release 信息（版本 / 发布日期 / exe 大小）。
 * 请求失败或没有 Release 时返回 null，调用方隐藏对应字段即可。
 */
export function useLatestRelease(repoUrl: string | undefined): ReleaseInfo | null {
  const [info, setInfo] = useState<ReleaseInfo | null>(
    repoUrl ? cache.get(repoUrl) ?? null : null
  )

  useEffect(() => {
    if (!repoUrl) return
    if (cache.has(repoUrl)) {
      setInfo(cache.get(repoUrl) ?? null)
      return
    }
    const m = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/)
    if (!m) return
    const repo = m[2].replace(/\.git$/, '')
    let alive = true
    fetch(`https://api.github.com/repos/${m[1]}/${repo}/releases/latest`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        let value: ReleaseInfo | null = null
        if (d?.tag_name) {
          const exe = (d.assets ?? []).find((a: { name?: string }) =>
            a.name?.toLowerCase().endsWith('.exe')
          )
          value = {
            tag: d.tag_name,
            date: typeof d.published_at === 'string' ? d.published_at.slice(0, 7) : '',
            size: exe ? `约 ${(exe.size / 1048576).toFixed(1)} MB` : null,
          }
        }
        cache.set(repoUrl, value)
        if (alive) setInfo(value)
      })
      .catch(() => {
        cache.set(repoUrl, null)
      })
    return () => {
      alive = false
    }
  }, [repoUrl])

  return info
}
