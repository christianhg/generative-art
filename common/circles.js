import { coordsDistance } from './core'

export const createCircle = coords => ({ coords, radius: 2 })

export const drawCircle = colorCircle => context => ({ coords, radius }) => {
  context.strokeStyle = colorCircle({ coords, radius })
  context.beginPath()
  context.lineWidth = 2
  context.arc(coords.x, coords.y, radius - 2, 0, Math.PI * 2)
  context.closePath()
  context.stroke()
}

export const circleOverflows = bounds => circle =>
  circle.coords.x - circle.radius <= bounds.A.x ||
  circle.coords.x + circle.radius >= bounds.C.x ||
  circle.coords.y - circle.radius <= bounds.A.y ||
  circle.coords.y + circle.radius >= bounds.C.y

const circlesDistance = (circleA, circleB) =>
  coordsDistance(circleA.coords, circleB.coords)

export const circlesIntersect = circleA => circleB =>
  circlesDistance(circleA, circleB) < circleA.radius + circleB.radius

export const increaseRadius = circle =>
  Object.assign({}, circle, { radius: circle.radius + 1 })

export const isCoordsInCircle = circle => coords =>
  circle.radius >= coordsDistance(circle.coords, coords)
