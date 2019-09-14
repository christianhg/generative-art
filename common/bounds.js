import { isCircle, isCoordsInCircle } from './circles'
import { isCoordsInSquare, isSquare } from './squares'

export const inBounds = bounds => coords =>
  isCircle(bounds)
    ? isCoordsInCircle(bounds)(coords)
    : isSquare(bounds)
    ? isCoordsInSquare(bounds)(coords)
    : false

export const padCircle = padding => circle =>
  Object.assign({}, circle, { radius: circle.radius - padding })

export const padSquare = padding => ({ A, B, C, D, type }) => ({
  A: { x: A.x + padding, y: A.y + padding },
  B: { x: B.x - padding, y: B.y + padding },
  C: { x: C.x - padding, y: C.y - padding },
  D: { x: D.x + padding, y: D.y - padding },
  type,
})
