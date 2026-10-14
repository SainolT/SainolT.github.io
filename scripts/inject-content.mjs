/**
 * 构建前内容注入：从私有仓库 SainolT/site-content 拉取真实内容，
 * 覆盖 src/data/ 下的模板 JSON。
 *
 * - 设置环境变量 CONTENT_TOKEN（可读取私有仓库的 PAT）时启用
 * - 未设置（本地开发 / 未配置 Secret）时跳过，使用仓库内模板
 * - 单个文件拉取或解析失败时保留对应模板，不影响构建
 */
import { writeFile } from 'node:fs/promises'

const CONTENT_REPO = 'SainolT/site-content'
const FILES = ['games.json', 'articles.json', 'site.json']
const TARGET_DIR = new URL('../src/data/', import.meta.url)

const token = process.env.CONTENT_TOKEN
if (!token) {
  console.log('[inject-content] 未设置 CONTENT_TOKEN，使用模板内容')
  process.exit(0)
}

for (const file of FILES) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${CONTENT_REPO}/contents/${file}?ref=main`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.raw',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    JSON.parse(text) // 校验合法性，避免把坏内容带进构建
    await writeFile(new URL(file, TARGET_DIR), text, 'utf8')
    console.log(`[inject-content] ✓ ${file} 已注入`)
  } catch (err) {
    console.warn(`[inject-content] ✗ ${file} 注入失败，保留模板：${err.message}`)
  }
}
