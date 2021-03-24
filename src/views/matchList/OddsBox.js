import { autorun } from 'mobx'
import { Graphics, Text } from 'pixi.js'
import { toFixed2 } from '@app/utils/number'
import { playStore } from '@app/stores'

const containerStyle = {
  backgroundColor: 0xf2f7fa,
  highlightColor: 0xffc300
}

const textStyle = {
  fill: '#515c64',
  sizeRatio: 0.4
}

export default function OddsBox({ width, height, odds, selection }) {
  const container = new Graphics()
  container.drawRect(0, 0, width, height)

  container.buttonMode = true
  container.interactive = true
  container.on('pointerup', () => playStore.onSelection(selection))

  const oddsText = new Text(toFixed2(odds), {
    fill: textStyle.fill,
    fontSize: height * textStyle.sizeRatio
  })
  oddsText.x = container.width / 2 - oddsText.width / 2
  oddsText.y = container.height / 2 - oddsText.height / 2

  container.addChild(oddsText)

  const dispose = autorun(() => setActive(playStore.selectedSelections))
  container.on('destroyed', () => dispose())

  return container

  function setActive(selectedSelections) {
    const isActive = selectedSelections.some(sel => sel.id === selection.id)
    container
      .beginFill(
        isActive
          ? containerStyle.highlightColor
          : containerStyle.backgroundColor
      )
      .drawRect(0, 0, width, height)
      .endFill()
  }
}
