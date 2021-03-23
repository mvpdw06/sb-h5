import Box from './Box'

export default function Button(...children) {
  const btn = Box(...children).align('center')
  btn.interactive = true
  btn.buttonMode = true
  btn.onClick = fn => btn.on('pointerup', fn)
  return btn
}
