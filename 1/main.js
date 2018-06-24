import { any, compose, either, __ } from 'ramda'
import { padding } from '../common/bounds'
import { createCanvas } from '../common/canvas'
import { coordsDistance } from '../common/core'
import { createShapeFiller } from '../common/shapeFiller'

const { canvas, context } = createCanvas()

document.body.appendChild(canvas)

const drawCircle = context => ({ coords, radius }) => {
  context.beginPath()
  context.lineWidth = 2
  context.arc(coords.x, coords.y, radius - 2, 0, Math.PI * 2)
  context.closePath()
  context.strokeStyle = '#ffffff'
  context.stroke()
}

const overflows = bounds => circle =>
  circle.coords.x - circle.radius <= bounds.A.x ||
  circle.coords.x + circle.radius >= bounds.C.x ||
  circle.coords.y - circle.radius <= bounds.A.y ||
  circle.coords.y + circle.radius >= bounds.C.y

const overflowsCanvas = overflows(canvas.width, canvas.height)

const isCoordsInCircle = circle => coords =>
  circle.radius >= coordsDistance(circle.coords, coords)

const circlesDistance = (circleA, circleB) =>
  coordsDistance(circleA.coords, circleB.coords)

const circlesIntersect = circleA => circleB =>
  circlesDistance(circleA, circleB) < circleA.radius + circleB.radius

const increaseRadius = circle =>
  Object.assign({}, circle, { radius: circle.radius + 1 })

const cannotGrow = (bounds, circles) =>
  compose(
    either(
      compose(
        any(__, circles),
        circlesIntersect
      ),
      overflows(bounds)
    ),
    increaseRadius
  )

createShapeFiller({
  backgroundColor: '#0b0b0b',
  bounds: padding(50, canvas),
  cannotGrow,
  canvas,
  context,
  createShape: coords => ({ coords, radius: 2 }),
  drawShape: drawCircle,
  increaseShape: increaseRadius,
  isCoordsInShape: isCoordsInCircle,
  isBigEnough: circle => circle.radius >= 2,
})()
