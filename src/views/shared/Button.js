import { Graphics, NineSlicePlane, Text } from 'pixi.js'
import { resolveSpaceAround, setStyleFn } from './utils/style'

export default function Button() {
  let _bg
  let _text
  let _width = 0
  let _height = 0
  let _padding = resolveSpaceAround()

  const btn = new Graphics()
  setStyleFn(btn, measure, {
    set9SliceBackground: (...p) => (_bg = new NineSlicePlane(...p)),
    setText: (...p) => (_text = new Text(...p)),
    setWidth: w => (_width = w),
    setHeight: h => (_height = h),
    setPadding: p => (_padding = resolveSpaceAround(p))
  })
  btn.interactive = true
  btn.buttonMode = true
  btn.onClick = fn => btn.on('pointerup', fn)
  btn.setBackgroundTexture = texture => _bg && (_bg.texture = texture)

  return btn

  function measure() {
    btn.clear()
    btn.removeChildren()
    const childW = _text?.width ?? 0
    const childH = _text?.height ?? 0
    const paddingW = _padding[1] + _padding[3]
    const paddingH = _padding[0] + _padding[2]
    const contentW = _width ? _width - paddingW : childW
    const contentH = _height ? _height - paddingH : childH
    const boundW = contentW + paddingW
    const boundH = contentH + paddingH
    btn.drawRect(0, 0, boundW, boundH).endFill()
    if (_bg) {
      _bg.width = boundW
      _bg.height = boundH
      btn.addChild(_bg)
    }
    if (_text) {
      _text.x = _padding[1] + contentW / 2 - _text.width / 2
      _text.y = _padding[0] + contentH / 2 - _text.height / 2
      btn.addChild(_text)
    }
  }
}
