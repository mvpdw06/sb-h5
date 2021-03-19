import { Container, Sprite } from 'pixi.js'
import asset from '@app/views/app/asset'
import Calendar from '@app/views/shared/Calendar'
import TeamInfo from './TeamInfo'
import SelectionGroup from './SelectionGroup'

const containerStyle = {
  paddingLeft: 8,
  height: 72
}

export default async function MatchRow({
  width,
  match,
  selectionGroupWidth,
  activeMarketType
}) {
  const textures = await asset.loadTextures()

  const container = new Container()
  const background = new Sprite(textures.bar3)
  background.width = width
  background.height = containerStyle.height

  const teamInfo = await TeamInfo({ match })
  teamInfo.x = containerStyle.paddingLeft
  teamInfo.y = containerStyle.height / 2 - teamInfo.height / 2

  const matchInfoWidth = width - selectionGroupWidth
  const dateMatchInfo = await Calendar({
    height: containerStyle.height,
    date: match.dateMatch
  })
  dateMatchInfo.x = matchInfoWidth - dateMatchInfo.width

  container.addChild(background, teamInfo, dateMatchInfo)

  const market = match.markets.find(m => m.marketTypeCode === activeMarketType)
  if (market) {
    const selectionGroup = await SelectionGroup({
      width: selectionGroupWidth,
      height: containerStyle.height,
      selections: market.selections
    })
    selectionGroup.x = matchInfoWidth
    container.addChild(selectionGroup)
  }

  return container
}
