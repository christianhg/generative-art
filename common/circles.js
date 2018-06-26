import { coordsDistance } from './core'

export const circleOverflowsCircle = outerCircle => innerCircle =>
  coordsDistance(outerCircle.coords, innerCircle.coords) + innerCircle.radius >=
  outerCircle.radius

export const createCircle = radius => coords => ({
  coords,
  radius,
  type: 'CIRCLE',
})

export const drawCircle = colorCircle => context => ({ coords, radius }) => {
  context.strokeStyle = colorCircle({ coords, radius })
  context.beginPath()
  context.lineWidth = 2
  context.arc(coords.x, coords.y, radius - 2, 0, Math.PI * 2)
  context.closePath()
  context.stroke()
}

export const circleOverflowsSquare = square => circle =>
  circle.coords.x - circle.radius <= square.A.x ||
  circle.coords.x + circle.radius >= square.C.x ||
  circle.coords.y - circle.radius <= square.A.y ||
  circle.coords.y + circle.radius >= square.C.y

const circlesDistance = (circleA, circleB) =>
  coordsDistance(circleA.coords, circleB.coords)

export const circlesIntersect = circleA => circleB =>
  circlesDistance(circleA, circleB) < circleA.radius + circleB.radius

export const increaseRadius = circle =>
  Object.assign({}, circle, { radius: circle.radius + 1 })

export const isCircle = shape => shape.type === 'CIRCLE'

export const isCoordsInCircle = circle => coords =>
  circle.radius >= coordsDistance(circle.coords, coords)
