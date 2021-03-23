import { action, makeObservable, observable } from 'mobx'

export default class PlayStore {
  @observable
  selectedSelections = []

  constructor() {
    makeObservable(this)
  }

  @action.bound
  onSelection(selection) {
    const isExist = this.selectedSelections.find(sel => sel.id === selection.id)

    if (this.selectedSelections.length === 10 && !isExist) return

    this.selectedSelections = isExist
      ? this.selectedSelections.filter(sel => sel.id !== selection.id)
      : [...this.selectedSelections, selection]
  }
}
