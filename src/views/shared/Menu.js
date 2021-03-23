import { setStyleFn } from './utils/style'
import Box from './Box'

export default function Menu({ itemKey = 'key', renderItem }) {
  let activeKey = -1
  let _items = []
  let _activeListener
  const menu = Box()
  setStyleFn(menu, {
    setOptions: options => {
      _items = options.map(toItemView)
      menu.clearViews().addView(..._items)
    }
  })
  menu.setActive = setActive
  menu.onActive = l => ((_activeListener = l), menu)
  return menu

  function toItemView(opt) {
    const item = renderItem(opt)
    item.$key = opt[itemKey]
    return item
  }

  function setActive(key) {
    if (key === activeKey) return
    const activeItem = _items.find(item => item.$key === key)
    _activeListener?.(activeItem, key, _items)
    activeKey = key
  }
}
