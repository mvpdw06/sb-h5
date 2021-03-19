import { Graphics, Sprite, Text } from 'pixi.js'
import asset from '@app/views/app/asset'
import style from '@app/views/app/style'

const sports = {
  1: 'football',
  2: 'basketball'
}

const containerStyle = {
  backgroundColor: 0x0d3d65
}

const optionStyle = {
  marginX: 8,
  paddingX: 8,
  paddingY: 6,
  spacing: 4,
  height: 56
}

const iconStyle = {
  marginBottom: 6,
  width: 24,
  height: 24
}

const textStyle = {
  fill: '#fff',
  fontSize: 12
}

export default async function SportMenu({ onSelect }) {
  const textures = await asset.loadTextures()
  const { marginX, paddingX, paddingY, spacing, height } = optionStyle

  const container = new Graphics()
  container
    .beginFill(containerStyle.backgroundColor)
    .drawRect(0, 0, style.width, height)
    .endFill()
  container.setSportMenu = setSportMenu
  container.setActiveSport = setActiveSport

  return container

  function setSportMenu(props) {
    container.removeChildren()

    let x = marginX
    for (const sport of props.data ?? []) {
      const sportName = sports[sport.code]
      if (!sportName) continue

      const text = new Text(`${sport.name}(${sport.matchCount})`, textStyle)
      const width = paddingX * 2 + Math.max(text.width, iconStyle.width)
      text.x = width / 2 - text.width / 2
      text.y = paddingY + iconStyle.height + iconStyle.marginBottom

      const icon = new Sprite(textures[sportName])
      icon.width = iconStyle.width
      icon.height = iconStyle.height
      icon.x = width / 2 - icon.width / 2
      icon.y = paddingY

      const option = new Graphics()
      option.width = width
      option.height = height
      option.x = x
      option.y = 0
      option.interactive = true
      option.buttonMode = true
      option.alpha = 0.6
      option.$key = sport.code
      option.$active = false
      option
        .beginFill(containerStyle.backgroundColor)
        .drawRect(0, 0, width, height)
        .endFill()
      option.on('pointerup', () => onSelect(sport.code))
      option.addChild(icon, text)

      container.addChild(option)
      x += width + spacing
    }
  }

  function setActiveSport(key) {
    for (const child of container.children) {
      const active = key === child.$key
      if (active === child.$active) continue
      child.alpha = active ? 1 : 0.6
      child.$active = active
    }
  }
}
