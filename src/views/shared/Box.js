import { Graphics, NineSlicePlane } from 'pixi.js'
import { resolveSpaceAround, setStyleFn } from './utils/style'

const Dir = { H: 'h', V: 'v' }
const Ali = { Start: 'start', Center: 'center', End: 'end' }

function getLenKey(isH) {
  return isH ? 'width' : 'height'
}

function getPosKey(isH) {
  return isH ? 'x' : 'y'
}

function calcViewCP(ali, parentL, viewL) {
  switch (ali) {
    case Ali.End:
      return parentL - viewL
    case Ali.Center:
      return parentL / 2 - viewL / 2
    case Ali.Start:
    default:
      return 0
  }
}

export default function Box(...children) {
  let _dir = Dir.H
  let _ali = Ali.Start
  let _width = 0
  let _height = 0
  let _padding = resolveSpaceAround()
  let _spacing = 0
  let _bg
  let _bgColor
  let _views = children
  const box = new Graphics()
  setStyleFn(box, draw, {
    horizontal: () => (_dir = Dir.H),
    vertical: () => (_dir = Dir.V),
    align: a => (_ali = a),
    setWidth: w => (_width = w),
    setHeight: h => (_height = h),
    setPadding: p => (_padding = resolveSpaceAround(p)),
    setSpacing: s => (_spacing = s),
    setBackgroundColor: c => ((_bg = new Graphics()), (_bgColor = c)),
    set9SliceBackground: (...p) => (_bg = new NineSlicePlane(...p)),
    addView: (...v) => _views.push(...v),
    clearViews: () => (_views = [])
  })
  box.setBackgroundTexture = texture => _bg?.texture && (_bg.texture = texture)
  return box

  function draw() {
    box.clear()
    box.removeChildren()
    const isH = _dir === Dir.H
    const keyML = getLenKey(isH)
    const keyCL = getLenKey(!isH)
    const keyMP = getPosKey(isH)
    const keyCP = getPosKey(!isH)

    const filling = { width: 0, height: 0 }
    for (const view of _views) {
      filling[keyML] += view[keyML]
      filling[keyCL] = Math.max(view[keyCL], filling[keyCL])
    }

    const fillingW = filling.width
    const fillingH = filling.height
    const paddingW = _padding[1] + _padding[3]
    const paddingH = _padding[0] + _padding[2]
    const spacingL = _spacing * _views.length
    const spacingW = isH ? spacingL : 0
    const spacingH = isH ? 0 : spacingL
    const contentW = _width ? _width - paddingW : fillingW + spacingW
    const contentH = _height ? _height - paddingH : fillingH + spacingH
    const boundW = contentW + paddingW
    const boundH = contentH + paddingH
    box.drawRect(0, 0, boundW, boundH).endFill()

    const content = { width: contentW, height: contentH }
    const padding = { x: _padding[3], y: _padding[0] }
    const contentCL = content[keyCL]
    const paddingCP = padding[keyCP]

    let tmpMP = padding[keyMP]
    for (const view of _views) {
      const viewCL = view[keyCL]
      const viewCP = calcViewCP(_ali, contentCL, viewCL)
      view[keyMP] = tmpMP
      view[keyCP] = paddingCP + viewCP
      tmpMP += view[keyML] + _spacing
    }

    if (_bg) {
      if (_bg instanceof Graphics) {
        _bg.clear().beginFill(_bgColor).drawRect(0, 0, boundW, boundH).endFill()
      }
      _bg.x = 0
      _bg.y = 0
      _bg.width = boundW
      _bg.height = boundH
      box.addChild(_bg)
    }

    box.addChild(..._views)
  }
}
