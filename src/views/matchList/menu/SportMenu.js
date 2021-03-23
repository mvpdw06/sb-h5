import { Sprite, Text } from 'pixi.js'
import asset from '@app/views/app/asset'
import style from '@app/views/app/style'
import Button from '@app/views/shared/Button'
import Menu from '@app/views/shared/Menu'

const supportedSports = {
  1: 'football',
  2: 'basketball'
}

const menuStyle = {
  bgColor: 0x0d3d65,
  padding: [0, 8],
  height: 56,
  spacing: 4
}

const itemStyle = {
  inactiveAlpha: 0.6,
  padding: [6, 8],
  height: menuStyle.height,
  spacing: 6,
  iconSize: 24,
  text: { fill: '#fff', fontSize: 12 }
}

export default async function SportMenu({ onSelect }) {
  const textures = await asset.loadTextures()

  const menu = Menu({ itemKey: 'code', renderItem: renderMenuItem })
    .setBackgroundColor(menuStyle.bgColor)
    .setWidth(style.width)
    .setHeight(menuStyle.height)
    .setPadding(menuStyle.padding)
    .setSpacing(menuStyle.spacing)
    .onActive(onMenuItemActive)
  menu.setData = setData
  return menu

  function renderMenuItem(sport) {
    const title = `${sport.name}(${sport.matchCount})`
    const textView = new Text(title, itemStyle.text)
    const iconView = new Sprite(textures[supportedSports[sport.code]])
    iconView.width = itemStyle.iconSize
    iconView.height = itemStyle.iconSize
    return Button(iconView, textView)
      .vertical()
      .setPadding(itemStyle.padding)
      .setSpacing(itemStyle.spacing)
      .setHeight(itemStyle.height)
      .onClick(() => onSelect(sport.code))
  }

  function setData({ data }) {
    const options = (data ?? []).filter(sport => supportedSports[sport.code])
    menu.setOptions(options)
  }

  function onMenuItemActive(activeItem, _, items) {
    for (const item of items) {
      const active = item === activeItem
      item.alpha = active ? 1 : itemStyle.inactiveAlpha
    }
  }
}
