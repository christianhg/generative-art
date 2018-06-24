import { min } from 'ramda'
import { padding } from '../common/bounds'
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
const size = min(640, window.innerWidth)

document.body.appendChild(canvas)
canvas.width = size
canvas.height = size

createShapeFiller({
  backgroundColor: '#ffffff',
  bounds: padding(50, canvas),
  cannotGrow,
  canvas,
  context,
  createShape: createSquare(2),
  drawShape: drawSquare(({ A, C }) => `rgb(${A.x / 2},${A.y / 2},${C.y / 2})`),
  increaseShape: increaseWidth,
  isCoordsInShape: isCoordsInSquare,
  isBigEnough: square => squareArea(square) >= 2,
})()
