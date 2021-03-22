function toNumberArray(values) {
  return values.map(v => +v || 0)
}

function resolveShorthandValues(value) {
  const l = value?.length
  if (!Array.isArray(value) || l <= 1) return Array(4).fill(value)
  if (l === 2) return [...value, ...value]
  if (l === 3) return [...value, value[1]]
  return value.slice(0, 4)
}

export function resolveSpaceAround(value) {
  return value |> resolveShorthandValues |> toNumberArray
}

export function setStyleFn(view, draw, fns) {
  view.draw = draw
  for (const k in fns) view[k] = useStyleFn(fns[k])

  function useStyleFn(setupFn) {
    return (...p) => {
      setupFn(...p)
      window.requestAnimationFrame(draw)
      return view
    }
  }
}
