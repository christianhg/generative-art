import { always, compose, cond, gt, lte, prop, __ } from 'ramda'
import { padCircle } from '../common/bounds'
import { createCanvas } from '../common/canvas'
import {
  circleOverflowsCircle,
  circlesIntersect,
  createCircle,
  increaseRadius,
  isCoordsInCircle,
  fillCircle,
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
  drawShape: fillCircle(
    compose(
      cond([
        [gt(__, 100), always('#FF1D23')],
        [gt(__, 60), always('#D40D12')],
        [gt(__, 20), always('#94090D')],
        [gt(__, 10), always('#5C0002')],
        [lte(__, 10), always('#450003')],
      ]),
      prop('radius')
    )
  ),
  increaseShape: increaseRadius,
  intersects: circlesIntersect,
  isCoordsInShape: isCoordsInCircle,
  isBigEnough: circle => circle.radius >= 2,
  overflows: circleOverflowsCircle,
})()
