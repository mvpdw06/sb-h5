import { Container } from 'pixi.js'
import MatchRow from './MatchRow'

export default async function LeagueSectionBody({
  width,
  league,
  selectionGroupWidth,
  activeMarketType
}) {
  const container = new Container()

  const rows = await Promise.all(
    league.matches.map(async (match, idx) => {
      const row = await MatchRow({
        width,
        match,
        selectionGroupWidth,
        activeMarketType
      })
      row.y = idx * row.height
      return row
    })
  )

  container.addChild(...rows)
  return container
}
