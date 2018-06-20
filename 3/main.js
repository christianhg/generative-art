import { min } from 'ramda'
import { createShapeFiller } from '../common/shapeFiller'
import {
  cannotGrow,
  createSquare,
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

const drawSquare = ({ A, B, C, D }) => {
  context.strokeStyle = `rgb(${A.x / 2},${A.y / 2},${C.y / 2})`
  context.beginPath()
  context.moveTo(A.x, A.y)
  context.lineTo(B.x, B.y)
  context.lineTo(C.x, C.y)
  context.lineTo(D.x, D.y)
  context.lineTo(A.x, A.y)
  context.stroke()
}

createShapeFiller({
  cannotGrow,
  canvas,
  context,
  createShape: createSquare(0),
  drawShape: drawSquare,
  increaseShape: increaseWidth,
  isCoordsInShape: isCoordsInSquare,
  isBigEnough: square => squareArea(square) > 0,
})()
