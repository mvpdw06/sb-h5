import { autorun } from 'mobx'
import { Container } from 'pixi.js'
import { gameStore } from '@app/stores'
import EventTypeTabs from './EventTypeTabs'
import MatchListBody from './MatchListBody'
import MatchListHead from './MatchListHead'
import SportMenu from './SportMenu'

export default async function MatchListScene() {
  const [
    eventTypeTabs,
    sportMenu,
    matchListHead,
    matchListBody
  ] = await Promise.all([
    EventTypeTabs({ onSelect: gameStore.setActiveEventType }),
    SportMenu({ onSelect: gameStore.setActiveSport }),
    MatchListHead({ onSelectMarketType: gameStore.setActiveMarketType }),
    MatchListBody()
  ])
  sportMenu.y = eventTypeTabs.height
  matchListHead.y = sportMenu.y + sportMenu.height
  matchListBody.y = matchListHead.y + matchListHead.height

  const scene = new Container()
  scene.addChild(eventTypeTabs, sportMenu, matchListHead, matchListBody)

  autorun(() => eventTypeTabs.setActiveEventType(gameStore.activeEventType))
  autorun(() => sportMenu.setSportMenu(gameStore.sportMenu))
  autorun(() => sportMenu.setActiveSport(gameStore.activeSport))
  autorun(() => matchListHead.setMatchList(gameStore.matchList))
  autorun(() => matchListHead.setActiveMarketType(gameStore.activeMarketType))
  autorun(() => matchListBody.setMatchList(gameStore.matchList))

  gameStore.loadSportMenu()
  gameStore.loadMatchList()

  return scene
}
