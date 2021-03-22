import { Text } from 'pixi.js'
import { Event } from '@app/constants/enum'
import asset from '@app/views/app/asset'
import style, { color } from '@app/views/app/style'
import Button from '@app/views/shared/Button'
import Menu from '@app/views/shared/Menu'

export const events = [
  { key: Event.Featured, title: '精选' },
  { key: Event.InPlay, title: '滚球' },
  { key: Event.Today, title: '今日' },
  { key: Event.PreStart, title: '早盘' }
]

const menuStyle = {
  padding: 8,
  spacing: 8
}

const itemStyle = {
  bg: 'menuBtn',
  bgActive: 'menuBtnActive',
  bgSlicing: [3, 2, 3, 4],
  padding: [0, 24, 1],
  height: 34,
  text: { fill: '#fff', fontSize: 16 }
}

export default async function EventMenu({ onSelect }) {
  const textures = await asset.loadTextures()

  return Menu({
    options: events,
    renderItem: renderMenuItem,
    onActive: onMenuItemActive
  })
    .setBackgroundColor(color.primary)
    .setWidth(style.width)
    .setPadding(menuStyle.padding)
    .setSpacing(menuStyle.spacing)

  function renderMenuItem(event) {
    return Button()
      .addView(new Text(event.title, itemStyle.text))
      .set9SliceBackground(textures[itemStyle.bg], ...itemStyle.bgSlicing)
      .setPadding(itemStyle.padding)
      .setHeight(itemStyle.height)
      .onClick(() => onSelect(event.key))
  }

  function onMenuItemActive(activeItem, _, items) {
    for (const item of items) {
      const active = item === activeItem
      const { bg, bgActive } = itemStyle
      item.setBackgroundTexture(active ? textures[bgActive] : textures[bg])
    }
  }
}
