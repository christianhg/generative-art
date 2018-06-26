import { padCircle } from '../common/bounds'
import { createCanvas } from '../common/canvas'
import {
  circleOverflowsCircle,
  circlesIntersect,
  createCircle,
  drawCircle,
  increaseRadius,
  isCoordsInCircle,
} from '../common/circles'
import { createShapeFiller } from '../common/shapeFiller'

const { canvas, context } = createCanvas()

document.body.appendChild(canvas)

createShapeFiller({
  backgroundColor: '#ffffff',
  bounds: padCircle(50)(
    createCircle(canvas.width / 2)({
      x: canvas.width / 2,
      y: canvas.height / 2,
    })
  ),
  canvas,
  context,
  createShape: createCircle(2),
  drawShape: drawCircle(() => '#0b0b0b'),
  increaseShape: increaseRadius,
  intersects: circlesIntersect,
  isCoordsInShape: isCoordsInCircle,
  isBigEnough: circle => circle.radius >= 2,
  overflows: circleOverflowsCircle,
})()
