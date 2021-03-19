import { Container, NineSlicePlane, Text } from 'pixi.js'
import asset from '@app/views/app/asset'
import style from '@app/views/app/style'

const containerStyle = {
  padding: 16,
  spacing: 8,
  height: 52
}

const titleStyle = {
  fill: '#515153',
  fontSize: 20
}

const tagStyle = {
  paddingX: 16,
  height: 32
}

const tagTextStyle = {
  fill: '#fff',
  fontSize: 16
}

export default async function MatchListHead({ onSelectMarketType }) {
  const textures = await asset.loadTextures()

  const container = new NineSlicePlane(textures.bar, 0, 1, 0, 0)
  container.width = style.width
  container.height = containerStyle.height

  const title = new Text('', titleStyle)
  title.x = containerStyle.padding
  title.y = containerStyle.height / 2 - title.height / 2

  const marketTypeFilter = new Container()
  container.setMatchList = setMatchList
  container.setActiveMarketType = setActiveMarketType
  container.addChild(title, marketTypeFilter)

  return container

  function setMatchList({ data }) {
    title.text = data?.name ?? ''

    const x = title.x + title.width + containerStyle.spacing
    const width = style.width - x
    marketTypeFilter.x = x
    marketTypeFilter.removeChildren()

    let p = width - containerStyle.padding
    const marketTypes = [...(data?.mainOddsMarketTypes ?? [])].reverse()
    for (const marketType of marketTypes) {
      const text = new Text(marketType.name, tagTextStyle)
      text.x = tagStyle.paddingX
      text.y = tagStyle.height / 2 - text.height / 2

      const tag = new NineSlicePlane(textures.tag, 16, 0, 16, 4)
      tag.width = tagStyle.paddingX * 2 + text.width
      tag.height = tagStyle.height + 2
      tag.x = p - tag.width
      tag.y = containerStyle.height / 2 - tagStyle.height / 2
      tag.interactive = true
      tag.buttonMode = true
      tag.$key = marketType.code
      tag.$active = false
      tag.on('pointerup', () => onSelectMarketType(marketType.code))
      tag.addChild(text)

      marketTypeFilter.addChild(tag)
      p -= tag.width + containerStyle.spacing
    }
  }

  function setActiveMarketType(key) {
    for (const child of marketTypeFilter.children) {
      const active = key === child.$key
      if (active === child.$active) continue
      child.texture = active ? textures.tagActive : textures.tag
      child.$active = active
    }
  }
}
