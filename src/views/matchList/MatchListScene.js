import { autorun } from 'mobx'
import { gameStore } from '@app/stores'
import Box from '@app/views/shared/Box'
import EventMenu from './menu/EventMenu'
import MatchListBody from './MatchListBody'
import MatchListHead from './MatchListHead'
import SportMenu from './SportMenu'

export default async function MatchListScene() {
  const [
    eventMenu,
    sportMenu,
    matchListHead,
    matchListBody
  ] = await Promise.all([
    EventMenu({ onSelect: gameStore.setActiveEvent }),
    SportMenu({ onSelect: gameStore.setActiveSport }),
    MatchListHead({ onSelectMarketType: gameStore.setActiveMarketType }),
    MatchListBody()
  ])

  autorun(() => eventMenu.setActive(gameStore.activeEvent))
  autorun(() => sportMenu.setSportMenu(gameStore.sportMenu))
  autorun(() => sportMenu.setActiveSport(gameStore.activeSport))
  autorun(() => matchListHead.setMatchList(gameStore.matchList))
  autorun(() => matchListHead.setActiveMarketType(gameStore.activeMarketType))
  autorun(() => matchListBody.setMatchList(gameStore.matchList))

  gameStore.loadSportMenu()
  gameStore.loadMatchList()

  return Box(eventMenu, sportMenu, matchListHead, matchListBody).vertical()
}
