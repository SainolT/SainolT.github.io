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
  {
    id: 'art-to-xlsx-tool',
    index: 'T-02',
    name: '美术资源配置工具',
    nameEn: 'Art to Xlsx Tool',
    platform: 'Windows',
    tagline: '按名称拼音智能匹配，把美术资源批量写进配置表。',
    description:
      '基于 Python + openpyxl + pypinyin + tkinter 的美术资源配置工具。扫描美术资源库，按名称拼音（全拼 / 首字母 / 多音字组合）把资源标识批量写入 xlsx 配置表，并校验已填资源值的存在性。疑似匹配与重复资源一律不自动写，交给人工逐条裁定；写入前自动备份，表头与公式单元格永不改动。',
    features: [
      '拼音智能匹配：全拼、首字母、多音字全读音组合，覆盖常见命名变体',
      '冲突人工裁定：疑似匹配进冲突清单，重复资源逐个选定，绝不自动乱写',
      '存在性校验：只读校验已填资源是否真实存在，输出缺失与冲突清单',
      '范围可控：限定前后缀锁定资源范围，按扩展名筛选，路径起始点自选',
      '防护机制：先预览再写入、全部改动可按行排除、写入前自动备份',
    ],
    tags: ['配表', '美术资源', 'Excel', 'Python'],
    downloadUrl: 'https://github.com/SainolT/art_to_xlsx_tool/releases/latest',
    repoUrl: 'https://github.com/SainolT/art_to_xlsx_tool',
  },
]
