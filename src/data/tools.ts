/** 工具箱数据：策划效率工具清单（版本号 / 更新日期 / 文件大小均从 GitHub Release 动态读取） */
export interface Tool {
  id: string
  index: string
  name: string
  nameEn: string
  platform: string
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
    platform: 'Windows',
    tagline: '一张工具表，管住所有平行配置表的字段映射。',
    description:
      '基于 Python + openpyxl + tkinter 的 xlsx 字段映射管理工具。用一张「工具表」登记多个表格之间的同义字段（映射组），在图形界面里完成跨表字段同步与字段值翻译。适合管理多套结构相同、命名不同的配置表——比如换皮项目的平行配置。首次使用时直接选择一张空白表格，即会自动生成工具表模板。',
    features: [
      '开箱即用：下载后双击运行，选择空白表格自动生成工具表模板',
      '跨表字段同步：按键字段对齐行，把一个表的字段值同步到其他表的同义字段',
      '字段值翻译：名称 ↔ ID 按参照表批量替换，查不到的值保留原样并列进日志',
      '映射登记：文件树逐级选择未登记字段，一键加入已有映射组或新建',
      '防护机制：启动自动校验、批量操作先预览再写入、写入前自动备份、表头永不修改',
    ],
    tags: ['配表', '效率工具', 'Excel', 'Python'],
    downloadUrl: 'https://github.com/SainolT/field-sync-tool/releases/latest',
    repoUrl: 'https://github.com/SainolT/field-sync-tool',
  },
  {
    id: 'art-to-xlsx-tool',
    index: 'T-02',
    name: '美术资源配置工具',
    nameEn: 'Art to Xlsx Tool',
    platform: 'Windows',
    tagline: '按名称拼音智能匹配，把美术资源批量写进配置表。',
    description:
      '基于 Python + pypinyin + tkinter 的美术资源配置工具。扫描美术资源库，把图标、图片、特效等资源按名称拼音批量写入 xlsx 配置表的资源字段，并校验已填资源值的存在性。中文名称按全拼 / 首字母 / 多音字全读音组合生成候选，三级命中逐级裁定；疑似匹配与重复资源一律不自动写，交给人工逐条确认。写入时只替换 xlsx 内目标工作表的 XML，其余内容字节级保留，不丢公式缓存值，不影响下游转表。',
    features: [
      '拼音智能匹配：全拼、首字母、多音字全读音组合，三级命中只取最优结果',
      '冲突人工裁定：疑似匹配、重复资源不自动写，指定结果按行记忆',
      '存在性校验：只读校验已填资源，输出缺失清单、冲突清单与空值统计',
      '外科手术式写入：只替换目标工作表 XML，公式缓存与样式字节级保留',
      '防护机制：先预览再写入、改动可按行排除、写入前自动备份、表头与公式不动',
    ],
    tags: ['配表', '美术资源', 'Excel', 'Python'],
    downloadUrl: 'https://github.com/SainolT/art_to_xlsx_tool/releases/latest',
    repoUrl: 'https://github.com/SainolT/art_to_xlsx_tool',
  },
]
