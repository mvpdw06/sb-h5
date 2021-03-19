import { Container } from 'pixi.js'
import style from '@app/views/app/style'
import LeagueSection from './LeagueSection'

const containerStyle = {
  padding: 8,
  spacing: 8
}

export default async function MatchListBody() {
  const container = new Container()
  container.setMatchList = setMatchList
  return container

  async function setMatchList({ data }) {
    container.removeChildren()
    if (!data) return

    const sections = await Promise.all(
      data.leagues.map(async (league, index) => {
        const width = style.width - containerStyle.padding * 2
        const section = await LeagueSection({ width, league })
        section.x = containerStyle.padding
        section.y =
          containerStyle.padding +
          (section.height + containerStyle.spacing) * index
        return section
      })
    )

    let y = containerStyle.padding
    for (const section of sections) {
      section.y = y
      y += section.height + containerStyle.spacing
    }

    container.addChild(...sections)
  }
}
