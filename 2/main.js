import { min } from 'ramda'
import { createShapeFiller } from '../common/shapeFiller'
import {
  cannotGrow,
  createSquare,
  drawSquare,
  increaseWidth,
  isCoordsInSquare,
  squareArea,
} from '../common/squares'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const size = min(640, window.innerWidth - 100)

document.body.appendChild(canvas)
canvas.width = size
canvas.height = size

createShapeFiller({
  cannotGrow,
  canvas,
  context,
  createShape: createSquare(2),
  drawShape: drawSquare(() => '#ffffff'),
  increaseShape: increaseWidth,
  isCoordsInShape: isCoordsInSquare,
  isBigEnough: square => squareArea(square) >= 2,
})()
