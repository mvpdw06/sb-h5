import { action, flow, makeObservable, observable } from 'mobx'
import { Event } from '@app/constants/enum'
import resource from '@app/utils/resource'
import * as api from './api'

export default class GameStore {
  @observable
  activeEvent = Event.Featured

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
  setActiveEvent(code) {
    this.activeEvent = code
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
    this.sportMenu = resource.start()
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
    this.matchList = resource.start()
    try {
      const result = yield api.queryTodayMatches()
      this.matchList = resource.fulfill(result)
      this.activeMarketType = result.mainOddsMarketTypes[0]?.code
    } catch (error) {
      this.matchList = resource.reject(error)
    }
  }
}
