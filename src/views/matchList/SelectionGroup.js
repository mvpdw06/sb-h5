import { Container } from 'pixi.js'
import OddsBox from './OddsBox'

const containerStyle = {
  paddingY: 12
}

const oddsBoxStyle = {
  marginX: 8
}

export default async function SelectionGroup({ width, height, selections }) {
  const container = new Container()

  const boxWidth = width / selections.length - oddsBoxStyle.marginX * 2
  const oddsBoxes = await Promise.all(
    selections.map(async (selection, idx) => {
      const boxHeight = height - containerStyle.paddingY * 2
      const box = await OddsBox({
        width: boxWidth,
        height: boxHeight,
        odds: selection.odds
      })
      box.x = (width / selections.length) * idx + oddsBoxStyle.marginX
      box.y = containerStyle.paddingY
      return box
    })
  )

  container.addChild(...oddsBoxes)
  return container
}
