import { Container } from 'pixi.js'
import LeagueSectionBody from './LeagueSectionBody'
import LeagueSectionHead from './LeagueSectionHead'

const selectionGroupStyle = {
  widthRatio: 0.45
}

const selectionGroupsByMarketType = {
  1: ['主胜', '平局', '客胜']
}

export default async function LeagueSection({
  width,
  league,
  activeMarketType = 1
}) {
  const selectionGroupWidth = width * selectionGroupStyle.widthRatio
  const selectionNames = selectionGroupsByMarketType[activeMarketType]

  const [head, body] = await Promise.all([
    LeagueSectionHead({ width, league, selectionGroupWidth, selectionNames }),
    LeagueSectionBody({ width, league, selectionGroupWidth, activeMarketType })
  ])
  body.y = head.height

  const container = new Container()
  container.addChild(head, body)
  return container
}
