import { padding } from '../common/bounds'
import { createCanvas } from '../common/canvas'
import {
  circleOverflows,
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
  bounds: padding(50, canvas),
  canvas,
  context,
  createShape: createCircle,
  drawShape: drawCircle(() => '#0b0b0b'),
  increaseShape: increaseRadius,
  intersects: circlesIntersect,
  isCoordsInShape: isCoordsInCircle,
  isBigEnough: circle => circle.radius >= 2,
  overflows: circleOverflows,
})()
