import { Graphics } from 'pixi.js'
import { resolveSpaceAround, setStyleFn } from './utils/style'

const Dir = { H: 'h', V: 'v' }

function getLenKey(isH) {
  return isH ? 'width' : 'height'
}

function getPosKey(isH) {
  return isH ? 'x' : 'y'
}

export default function Box(...children) {
  let _dir = Dir.H
  let _width = 0
  let _height = 0
  let _padding = resolveSpaceAround()
  let _spacing = 0
  let _bg
  let _bgColor
  const box = new Graphics()
  setStyleFn(box, measure, {
    horizontal: () => (_dir = Dir.H),
    vertical: () => (_dir = Dir.V),
    setWidth: w => (_width = w),
    setHeight: h => (_height = h),
    setPadding: p => (_padding = resolveSpaceAround(p)),
    setSpacing: s => (_spacing = s),
    setBackgroundColor: c => {
      _bg = new Graphics()
      _bgColor = c
    }
  })
  return box

  function measure() {
    box.clear()
    box.removeChildren()
    const isH = _dir === Dir.H
    const mainLenKey = getLenKey(isH)
    const crossLenKey = getLenKey(!isH)
    const mainPosKey = getPosKey(isH)
    const crossPosKey = getPosKey(!isH)

    const filling = { width: 0, height: 0 }
    for (const child of children) {
      filling[mainLenKey] += child[mainLenKey]
      filling[crossLenKey] = Math.max(child[crossLenKey], filling[crossLenKey])
    }

    const fillingW = filling.width
    const fillingH = filling.height
    const paddingW = _padding[1] + _padding[3]
    const paddingH = _padding[0] + _padding[2]
    const spacingL = _spacing * children.length
    const spacingW = isH ? spacingL : 0
    const spacingH = isH ? 0 : spacingL
    const contentW = _width ? _width - paddingW : fillingW + spacingW
    const contentH = _height ? _height - paddingH : fillingH + spacingH
    const boundW = contentW + paddingW
    const boundH = contentH + paddingH
    box.drawRect(0, 0, boundW, boundH).endFill()

    const padding = { x: _padding[3], y: _padding[0] }
    const mainPos = padding[mainPosKey]
    const crossPos = padding[crossPosKey]

    let tmpPos = mainPos
    for (const child of children) {
      child[mainPosKey] = tmpPos
      child[crossPosKey] = crossPos
      tmpPos += child[mainLenKey] + _spacing
    }

    if (_bg && _bgColor) {
      _bg.clear().beginFill(_bgColor).drawRect(0, 0, boundW, boundH).endFill()
      _bg.x = 0
      _bg.y = 0
      box.addChild(_bg)
    }

    box.addChild(...children)
  }
}
