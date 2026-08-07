import { games, type Game } from '../data/games'
import { useReveal } from '../hooks/useReveal'

/** 单张游戏档案卡：票根造型 + 微微倾斜 + CSS 艺术封面 */
function GameCard({
  game,
  tilt,
  onOpen,
}: {
  game: Game
  tilt: number
  onOpen: () => void
}) {
  const ref = useReveal<HTMLButtonElement>()

  return (
    <button
      ref={ref}
      onClick={onOpen}
      className="reveal group relative w-full text-left"
      style={{ transform: undefined }}
    >
      <div
        className="ticket-notch relative flex flex-col gap-6 border border-[#D8CBB8] bg-[#F6F0E4] p-6 shadow-[0_18px_40px_-24px_rgba(62,49,40,0.35)] transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_32px_60px_-24px_rgba(143,86,56,0.45)] md:flex-row md:items-stretch md:gap-9 md:p-8"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {/* 封面：CSS 渐变艺术 */}
        <div
          className="relative h-44 w-full shrink-0 overflow-hidden rounded-2xl md:h-52 md:w-72"
          style={{ background: `linear-gradient(150deg, ${game.tone.glow}, ${game.tone.base} 55%, ${game.tone.deep})` }}
        >
          <span className="font-display absolute -bottom-5 left-4 text-[7rem] font-black leading-none text-[#F6EFE4]/25 md:text-[8.5rem]">
            {game.index}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-[#2C231B]/35 px-3 py-1 text-[11px] tracking-widest text-[#F6EFE4] backdrop-blur-sm">
            {game.status}
          </span>
          <span className="font-display absolute bottom-4 right-5 text-lg italic text-[#F6EFE4]/85">
            {game.titleEn}
          </span>
          {/* 悬浮光斑 */}
          <span className="animate-floaty absolute left-[30%] top-[22%] h-10 w-10 rounded-full bg-[#F6EFE4]/25 blur-md" />
        </div>

        {/* 文字区 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="font-serif-sc text-2xl font-bold text-[#3E3128] md:text-3xl">
                {game.title}
              </h3>
              <span className="text-xs tracking-[0.25em] text-[#8A7B6C]">{game.genre}</span>
            </div>
            <p className="mt-3 max-w-xl leading-relaxed text-[#6B5D4F]">「{game.oneLiner}」</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#EDE3D2] px-3 py-1 text-xs text-[#6B5D4F]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-[#E7DCC8] pt-4 text-xs tracking-widest text-[#8A7B6C]">
            <span>
              {game.role} · {game.year}
            </span>
            <span className="flex items-center gap-2 text-[#A6623F]">
              {game.playUrl ? '查看详情 / 试玩' : '查看详情'}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function GameLibrary({ onOpenGame }: { onOpenGame: (game: Game) => void }) {
  const headRef = useReveal<HTMLDivElement>()
  const tilts = [-1.2, 0.8, -0.6]

  return (
    <section id="library" className="relative mx-auto max-w-6xl scroll-mt-8 px-6 py-24 md:px-10 md:py-36 md:-scroll-mt-4">
      {/* 板块标题 */}
      <div ref={headRef} className="reveal mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <div>
          <p className="mb-3 flex items-center gap-3 text-xs tracking-[0.4em] text-[#A6623F]">
            <span className="h-px w-10 bg-[#A6623F]" />
            SECTION 01
          </p>
          <h2 className="font-serif-sc text-4xl font-black text-[#3E3128] md:text-6xl">
            游戏库
            <span className="font-display text-outline ml-4 align-middle text-3xl italic md:text-5xl">
              Archive
            </span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#8A7B6C]">
          点击卡片查看设计档案，带「可试玩」徽章的游戏支持 H5 实机试玩。
        </p>
      </div>

      {/* 档案卡列表 */}
      <div className="space-y-10 md:space-y-14">
        {games.map((game, i) => (
          <GameCard
            key={game.id}
            game={game}
            tilt={tilts[i % tilts.length]}
            onOpen={() => onOpenGame(game)}
          />
        ))}
      </div>

      {/* 更多收录中 */}
      <div className="mt-16 flex items-center justify-center gap-4 text-xs tracking-[0.35em] text-[#B4A791]">
        <span className="h-px w-16 bg-[#D8CBB8]" />
        更多世界构筑中
        <span className="h-px w-16 bg-[#D8CBB8]" />
      </div>
    </section>
  )
}
