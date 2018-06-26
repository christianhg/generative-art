import { padSquare } from '../common/bounds'
import { createCanvas } from '../common/canvas'
import {
  circleOverflowsSquare,
  circlesIntersect,
  createCircle,
  drawCircle,
  increaseRadius,
  isCoordsInCircle,
} from '../common/circles'
import { createShapeFiller } from '../common/shapeFiller'
import { createSquare } from '../common/squares'

const { canvas, context } = createCanvas()

document.body.appendChild(canvas)

createShapeFiller({
  backgroundColor: '#0b0b0b',
  bounds: padSquare(50)(
    createSquare(canvas.width)({
      x: canvas.width / 2,
      y: canvas.height / 2,
    })
  ),
  canvas,
  context,
  createShape: createCircle(2),
  drawShape: drawCircle(() => '#ffffff'),
  increaseShape: increaseRadius,
  intersects: circlesIntersect,
  isCoordsInShape: isCoordsInCircle,
  isBigEnough: circle => circle.radius >= 2,
  overflows: circleOverflowsSquare,
})()
