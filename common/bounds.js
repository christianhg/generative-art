import { either } from 'ramda'

export const inBounds = bounds =>
  either(
    coords => coords.x > bounds.A.x,
    coords => coords.y > bounds.A.y,
    coords => coords.x < bounds.C.x,
    coords => coords.y < bounds.C.y
  )

export const padding = (padding, canvas) => ({
  A: { x: padding, y: padding },
  C: { x: canvas.width - padding, y: canvas.height - padding },
})
