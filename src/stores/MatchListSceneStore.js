import { action, flow, makeObservable, observable } from 'mobx'
import { EventType } from '@app/constants/enum'
import * as api from '@app/utils/api'
import resource from '@app/utils/resource'

export default class MatchListSceneStore {
  @observable
  activeEventType = EventType.Featured

  @observable
  activeSport

  @observable
  activeMarketType

  @observable.struct
  sportMenu = resource.idle()

  @observable.struct
  matchList = resource.idle()

  constructor() {
    makeObservable(this)
  }

  @action.bound
  setActiveEventType(type) {
    this.activeEventType = type
  }

  @action.bound
  setActiveSport(code) {
    this.activeSport = code
  }

  @action.bound
  setActiveMarketType(code) {
    this.activeMarketType = code
  }

  @flow
  *loadSportMenu() {
    this.sportMenu = resource.fetch()
    try {
      const data = yield api.querySportMenu()
      const sports = data.menu.inPlay
      this.sportMenu = resource.fulfill(sports)
      this.activeSport = sports[0]?.code
    } catch (error) {
      this.sportMenu = resource.reject(error)
    }
  }

  @flow
  *loadMatchList() {
    this.matchList = resource.fetch()
    try {
      const result = yield api.queryTodayMatches()
      this.matchList = resource.fulfill(result)
      this.activeMarketType = result.mainOddsMarketTypes[0]?.code
    } catch (error) {
      this.matchList = resource.reject(error)
    }
  }
}
