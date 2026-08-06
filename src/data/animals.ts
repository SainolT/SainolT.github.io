/** 像素小动物图鉴：12 列字符画，字符映射到低饱和暖色 */
export interface AnimalDef {
  name: string
  nameEn: string
  colors: Record<string, string>
  map: string[]
}

export const ANIMALS: AnimalDef[] = [
  {
    name: '兔子',
    nameEn: 'RABBIT',
    colors: { B: '#E8C9A0', P: '#C17E5B', K: '#3E3128' },
    map: [
      '..BB....BB..',
      '..BP....PB..',
      '..BB....BB..',
      '.BBBBBBBBBB.',
      'BBBBBBBBBBBB',
      'BBKBBBBBBKBB',
      'BBBBBPPBBBBB',
      'BBBBBPPBBBBB',
      '.BBBBBBBBBB.',
      '..BBBBBBBB..',
    ],
  },
  {
    name: '小猫',
    nameEn: 'CAT',
    colors: { B: '#C17E5B', P: '#F6EFE4', K: '#3E3128' },
    map: [
      'B..........B',
      'BB........BB',
      'BBB......BBB',
      'BBBBBBBBBBBB',
      'BBBBBBBBBBBB',
      'BBKBBBBBBKBB',
      'BBBBBPPBBBBB',
      'BBBBBPPBBBBB',
      '.BBBBBBBBBB.',
      '..BBBBBBBB..',
    ],
  },
  {
    name: '小马',
    nameEn: 'PONY',
    colors: { B: '#D9A679', M: '#A6623F', K: '#3E3128', P: '#8F5638' },
    map: [
      '..B......B..',
      '..BB....BB..',
      '..BBBBBBBB..',
      '.BBBBBBBBBM.',
      '.BKBBBBBBKM.',
      '.BBBBBBBBBM.',
      '.BBBBBBBBBM.',
      '..BBBBBBBM..',
      '..BBBBBBBM..',
      '..BBPPBBBM..',
      '..BBBBBBB...',
    ],
  },
  {
    name: '小鸟',
    nameEn: 'BIRD',
    colors: { B: '#8A8A6D', W: '#77745A', Y: '#D9A679', K: '#3E3128', L: '#A6623F' },
    map: [
      '....BB......',
      '...BBBB.....',
      '..BBBBBB....',
      '..BBBKBB....',
      '.BBBBBBBY...',
      '.BBBBBBBYY..',
      '.BWWBBBBB...',
      '.BWWBBBBB...',
      '..BBBBBBB...',
      '...BBBBB....',
      '...L.L.L....',
    ],
  },
]
