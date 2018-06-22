import { any, compose, either, min, __ } from 'ramda'
import { coordsDistance } from '../common/core'
import { createShapeFiller } from '../common/shapeFiller'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const size = min(640, window.innerWidth - 100)

document.body.appendChild(canvas)
canvas.width = size
canvas.height = size

const drawCircle = context => ({ coords, radius }) => {
  context.beginPath()
  context.lineWidth = 2
  context.arc(coords.x, coords.y, radius - 2, 0, Math.PI * 2)
  context.closePath()
  context.strokeStyle = '#ffffff'
  context.stroke()
}

const overflows = (width, height) => circle =>
  circle.coords.x - circle.radius <= 0 ||
  circle.coords.x + circle.radius >= width ||
  circle.coords.y - circle.radius <= 0 ||
  circle.coords.y + circle.radius >= height

const overflowsCanvas = overflows(canvas.width, canvas.height)

const isCoordsInCircle = circle => coords =>
  circle.radius >= coordsDistance(circle.coords, coords)

const circlesDistance = (circleA, circleB) =>
  coordsDistance(circleA.coords, circleB.coords)

const circlesIntersect = circleA => circleB =>
  circlesDistance(circleA, circleB) < circleA.radius + circleB.radius

const increaseRadius = circle =>
  Object.assign({}, circle, { radius: circle.radius + 1 })

const cannotGrow = (canvas, circles) =>
  compose(
    either(
      compose(
        any(__, circles),
        circlesIntersect
      ),
      overflows(canvas.width, canvas.height)
    ),
    increaseRadius
  )

createShapeFiller({
  backgroundColor: '#0b0b0b',
  cannotGrow,
  canvas,
  context,
  createShape: coords => ({ coords, radius: 2 }),
  drawShape: drawCircle,
  increaseShape: increaseRadius,
  isCoordsInShape: isCoordsInCircle,
  isBigEnough: circle => circle.radius >= 2,
})()
