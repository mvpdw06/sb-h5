import { Graphics, Text } from 'pixi.js'
import { toFixed2 } from '@app/utils/number'

const containerStyle = {
  backgroundColor: 0xf2f7fa
}

const textStyle = {
  fill: '#515c64',
  sizeRatio: 0.4
}

export default function OddsBox({ width, height, odds }) {
  const container = new Graphics()
  container
    .beginFill(containerStyle.backgroundColor)
    .drawRect(0, 0, width, height)
    .endFill()

  const oddsText = new Text(toFixed2(odds), {
    fill: textStyle.fill,
    fontSize: height * textStyle.sizeRatio
  })
  oddsText.x = container.width / 2 - oddsText.width / 2
  oddsText.y = container.height / 2 - oddsText.height / 2

  container.addChild(oddsText)
  return container
}
