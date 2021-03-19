export function toFixed2(value) {
  if (isNaN(value)) return ''
  return (Math.floor(value * 100) / 100).toFixed(2)
}
