import { Container } from 'pixi.js'
import ParticipantInfo from './ParticipantInfo'

const containerStyle = {
  spacing: 8
}

export default async function TeamInfo({ match }) {
  const [homeTeam, awayTeam] = await Promise.all([
    ParticipantInfo({ name: match.homeName }),
    ParticipantInfo({ name: match.awayName })
  ])
  awayTeam.y = homeTeam.height + containerStyle.spacing

  const container = new Container()
  container.addChild(homeTeam, awayTeam)
  return container
}
