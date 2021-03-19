import { Container, Sprite, Text } from 'pixi.js'
import asset from '@app/views/app/asset'

const containerStyle = {
  paddingX: 8,
  height: 32
}

const titleStyle = {
  fill: '#fff',
  fontSize: 16
}

export default async function LeagueSectionHead({
  width,
  league,
  selectionGroupWidth,
  selectionNames
}) {
  const textures = await asset.loadTextures()

  const container = new Container()
  const background = new Sprite(textures.bar2)
  background.width = width
  background.height = containerStyle.height

  const title = new Text(league.name, titleStyle)
  title.x = containerStyle.paddingX
  title.y = containerStyle.height / 2 - title.height / 2

  const selectionGroup = new Container()
  selectionGroup.x = width - selectionGroupWidth

  const selectionWidth = selectionGroupWidth / selectionNames.length
  let x = 0
  for (const name of selectionNames) {
    const title = new Text(name, titleStyle)
    title.x = x + selectionWidth / 2 - title.width / 2
    title.y = containerStyle.height / 2 - title.height / 2
    selectionGroup.addChild(title)
    x += selectionWidth
  }

  container.addChild(background, title, selectionGroup)
  return container
}
