import Box from './Box'

export default function Menu({
  options,
  itemKey = 'key',
  renderItem,
  onActive
}) {
  let activeKey = -1
  const items = options.map(toItemView)
  const menu = Box(...items)
  menu.setActive = setActive
  return menu

  function setActive(key) {
    if (key === activeKey) return
    const activeItem = items.find(item => item.$key === key)
    onActive?.(activeItem, key, items)
    activeKey = key
  }

  function toItemView(opt) {
    const item = renderItem(opt)
    item.$key = opt[itemKey]
    return item
  }
}
