import dayjs from 'dayjs'
import { Graphics, Sprite, Text } from 'pixi.js'
import asset from '@app/views/app/asset'

const containerStyle = {
  ratio: 0.75
}

const iconStyle = {
  sizeRatio: 0.5
}

const textStyle = {
  fill: '#515c64',
  sizeRatio: 0.16
}

export default async function Calendar({ height, date }) {
  const textures = await asset.loadTextures()

  const width = containerStyle.ratio * height
  const iconSize = height * iconStyle.sizeRatio
  const infoSize = (height - iconSize) / 2

  const infoTextStyle = {
    fill: textStyle.fill,
    fontSize: textStyle.sizeRatio * height
  }
  const monthStyle = {
    fill: '#fff',
    fontSize: textStyle.sizeRatio * height * 0.8
  }
  const dayStyle = {
    fill: textStyle.fill,
    fontSize: textStyle.sizeRatio * height * 1.2
  }

  const dateTime = dayjs(date)

  const dayOfWeekText = new Text(dateTime.format('ddd'), infoTextStyle)
  dayOfWeekText.x = width / 2 - dayOfWeekText.width / 2
  dayOfWeekText.y = infoSize / 2 - dayOfWeekText.height / 2

  const monthText = new Text(dateTime.format('MMM'), monthStyle)
  monthText.x = width / 2 - monthText.width / 2
  monthText.y = infoSize + iconSize * 0.25 - monthText.height / 2

  const dayText = new Text(dateTime.format('DD'), dayStyle)
  dayText.x = width / 2 - dayText.width / 2
  dayText.y = infoSize + iconSize * 0.7 - dayText.height / 2

  const calendarIcon = new Sprite(textures.calendar)
  calendarIcon.width = iconSize
  calendarIcon.height = iconSize
  calendarIcon.x = width / 2 - calendarIcon.width / 2
  calendarIcon.y = infoSize

  const timeText = new Text(dateTime.format('HH:mm'), infoTextStyle)
  timeText.x = width / 2 - timeText.width / 2
  timeText.y = height - infoSize

  const container = new Graphics()
  container.drawRect(0, 0, width, height).endFill()
  container.addChild(calendarIcon, dayOfWeekText, monthText, dayText, timeText)
  return container
}
