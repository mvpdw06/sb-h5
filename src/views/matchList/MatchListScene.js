import { autorun } from 'mobx'
import { gameStore } from '@app/stores'
import Box from '@app/views/shared/Box'
import EventMenu from './menu/EventMenu'
import SportMenu from './menu/SportMenu'
import MatchListBody from './MatchListBody'
import MatchListHead from './MatchListHead'

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
  autorun(() => sportMenu.setData(gameStore.sportMenu))
  autorun(() => sportMenu.setActive(gameStore.activeSport))
  autorun(() => matchListHead.setMatchList(gameStore.matchList))
  autorun(() => matchListHead.setActiveMarketType(gameStore.activeMarketType))
  autorun(() => matchListBody.setMatchList(gameStore.matchList))

  gameStore.loadSportMenu()
  gameStore.loadMatchList()

  return Box(eventMenu, sportMenu, matchListHead, matchListBody).vertical()
}
