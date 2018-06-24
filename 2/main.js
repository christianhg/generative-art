import { padding } from '../common/bounds'
import { createCanvas } from '../common/canvas'
import { createShapeFiller } from '../common/shapeFiller'
import {
  cannotGrow,
  createSquare,
  drawSquare,
  increaseWidth,
  isCoordsInSquare,
  squareArea,
} from '../common/squares'

const { canvas, context } = createCanvas()

document.body.appendChild(canvas)

createShapeFiller({
  backgroundColor: '#0b0b0b',
  bounds: padding(50, canvas),
  cannotGrow,
  canvas,
  context,
  createShape: createSquare(2),
  drawShape: drawSquare(() => '#ffffff'),
  increaseShape: increaseWidth,
  isCoordsInShape: isCoordsInSquare,
  isBigEnough: square => squareArea(square) >= 2,
})()
