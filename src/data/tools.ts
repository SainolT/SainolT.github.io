/** 工具箱数据：策划效率工具清单 */
export interface Tool {
  id: string
  index: string
  name: string
  nameEn: string
  date: string
  platform: string
  size: string
  tagline: string
  description: string
  features: string[]
  tags: string[]
  downloadUrl: string
  repoUrl: string
}

export const tools: Tool[] = [
  {
    id: 'field-sync-tool',
    index: 'T-01',
    name: '字段同步工具',
    nameEn: 'Field Sync Tool',
    date: '2026-10',
    platform: 'Windows',
    size: '约 10.5 MB',
    tagline: '一张工具表，管住所有平行配置表的字段映射。',
    description:
      '基于 Python + openpyxl + tkinter 的 xlsx 字段映射管理工具。用一张「工具表」登记多个表格之间的同义字段（映射组），在图形界面里完成跨表字段同步与字段值翻译。适合管理多套结构相同、命名不同的配置表——比如换皮项目的平行配置。首次使用时直接选择一张空白表格，即会自动生成工具表模板。',
    features: [
      '开箱即用：下载解压后双击运行，选择空白表格自动生成工具表模板',
      '跨表字段同步：按键字段对齐行，把一个表的字段值同步到其他表的同义字段',
      '字段值翻译：名称 ↔ ID 按参照表批量替换，查不到的值保留原样并列进日志',
      '映射登记：文件树逐级选择未登记字段，一键加入已有映射组或新建',
      '防护机制：启动自动校验、批量操作先预览再写入、写入前自动备份、表头永不修改',
    ],
    tags: ['配表', '效率工具', 'Excel', 'Python'],
    downloadUrl: 'https://github.com/SainolT/field-sync-tool/releases/latest',
    repoUrl: 'https://github.com/SainolT/field-sync-tool',
  },
]
