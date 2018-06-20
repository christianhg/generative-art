import { any, compose, either, min, __ } from 'ramda'
import {
  createSquare,
  increaseWidth,
  isCoordsInSquare,
  squareArea,
  squaresIntersect,
} from '../common/squares'
import { createShapeFiller } from '../common/shapeFiller'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const size = min(640, window.innerWidth - 100)

document.body.appendChild(canvas)
canvas.width = size
canvas.height = size

const drawSquare = ({ A, B, C, D }) => {
  context.strokeStyle = '#ffffff'
  context.beginPath()
  context.moveTo(A.x, A.y)
  context.lineTo(B.x, B.y)
  context.lineTo(C.x, C.y)
  context.lineTo(D.x, D.y)
  context.lineTo(A.x, A.y)
  context.stroke()
}

const overflows = (width, height) => square =>
  square.A.x <= 0 ||
  square.A.y <= 0 ||
  square.C.x >= width ||
  square.C.y >= height

const overflowsCanvas = overflows(canvas.width, canvas.height)

const cannotGrow = squares =>
  compose(
    either(
      compose(
        any(__, squares),
        squaresIntersect
      ),
      overflowsCanvas
    ),
    increaseWidth
  )

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
