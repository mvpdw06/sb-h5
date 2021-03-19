import { Container, Sprite, Text } from 'pixi.js'
import asset from '@app/views/app/asset'

const iconStyle = {
  marginRight: 8,
  width: 24,
  height: 24
}

const nameStyle = {
  fill: '#515c64',
  fontSize: 16
}

export default async function ParticipantInfo({ name }) {
  const textures = await asset.loadTextures()

  const icon = new Sprite(textures.badge)
  icon.width = iconStyle.width
  icon.height = iconStyle.height

  const text = new Text(name, nameStyle)
  text.x = icon.width + iconStyle.marginRight
  text.y = icon.height / 2 - text.height / 2

  const container = new Container()
  container.addChild(icon, text)
  return container
}
