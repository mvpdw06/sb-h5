import { Graphics, NineSlicePlane, Text } from 'pixi.js'
import { EventType } from '@app/constants/enum'
import asset from '@app/views/app/asset'
import style, { color } from '@app/views/app/style'

export const routes = [
  { key: EventType.Featured, title: '精选' },
  { key: EventType.InPlay, title: '滚球' },
  { key: EventType.Today, title: '今日' },
  { key: EventType.PreStart, title: '早盘' }
]

const tabStyle = {
  margin: 8,
  paddingX: 12,
  spacing: 12,
  height: 32
}

const textStyle = {
  fill: '#fff',
  fontSize: 16
}

export default async function EventTypeTabs({ onSelect }) {
  const textures = await asset.loadTextures()
  const { margin, paddingX, spacing, height } = tabStyle

  const container = new Graphics()
  container
    .beginFill(color.primary)
    .drawRect(0, 0, style.width, margin * 2 + height)
    .endFill()
  container.setActiveEventType = setActiveEventType

  let x = margin
  for (const route of routes) {
    const text = new Text(route.title, textStyle)
    const width = paddingX * 2 + text.width
    text.x = width / 2 - text.width / 2
    text.y = height / 2 - text.height / 2

    const tab = new NineSlicePlane(textures.tab, 3, 2, 3, 4)
    tab.width = width + 2
    tab.height = height + 2
    tab.x = x
    tab.y = margin
    tab.interactive = true
    tab.buttonMode = true
    tab.$key = route.key
    tab.$active = false
    tab.on('pointerup', () => onSelect(route.key))
    tab.addChild(text)

    container.addChild(tab)
    x += width + spacing
  }

  return container

  function setActiveEventType(key) {
    for (const child of container.children) {
      const active = key === child.$key
      if (active === child.$active) continue
      child.texture = active ? textures.tabActive : textures.tab
      child.$active = active
    }
  }
}
