import { autorun } from 'mobx'
import { Container } from 'pixi.js'
import MatchListSceneStore from '@app/stores/MatchListSceneStore'
import EventTypeTabs from './EventTypeTabs'
import MatchListBody from './MatchListBody'
import MatchListHead from './MatchListHead'
import SportMenu from './SportMenu'

export default async function MatchListScene() {
  const store = new MatchListSceneStore()
  const [
    eventTypeTabs,
    sportMenu,
    matchListHead,
    matchListBody
  ] = await Promise.all([
    EventTypeTabs({ onSelect: store.setActiveEventType }),
    SportMenu({ onSelect: store.setActiveSport }),
    MatchListHead({ onSelectMarketType: store.setActiveMarketType }),
    MatchListBody()
  ])
  sportMenu.y = eventTypeTabs.height
  matchListHead.y = sportMenu.y + sportMenu.height
  matchListBody.y = matchListHead.y + matchListHead.height

  const scene = new Container()
  scene.addChild(eventTypeTabs, sportMenu, matchListHead, matchListBody)

  autorun(() => eventTypeTabs.setActiveEventType(store.activeEventType))
  autorun(() => sportMenu.setSportMenu(store.sportMenu))
  autorun(() => sportMenu.setActiveSport(store.activeSport))
  autorun(() => matchListHead.setMatchList(store.matchList))
  autorun(() => matchListHead.setActiveMarketType(store.activeMarketType))
  autorun(() => matchListBody.setMatchList(store.matchList))

  store.loadSportMenu()
  store.loadMatchList()

  return scene
}
