import { padSquare } from '../common/bounds'
import { createCanvas } from '../common/canvas'
import { createShapeFiller } from '../common/shapeFiller'
import {
  createSquare,
  drawSquare,
  increaseWidth,
  isCoordsInSquare,
  overflows,
  squareArea,
  squaresIntersect,
} from '../common/squares'

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
  createShape: createSquare(2),
  drawShape: drawSquare(() => '#ffffff'),
  increaseShape: increaseWidth,
  intersects: squaresIntersect,
  isCoordsInShape: isCoordsInSquare,
  isBigEnough: square => squareArea(square) >= 2,
  margin: 2,
  overflows,
})()
