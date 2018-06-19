import { any, compose, either, min, reject, __ } from 'ramda'
import { getCoords, randomCoords, randomInt } from '../common/core'
import {
  createSquare,
  increaseWidth,
  isCoordsInSquare,
  squareArea,
  squaresIntersect,
} from '../common/squares'

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

const animate = (coords, squares, square) => () => {
  console.log(coords.length)
  if (cannotGrow(squares)(square)) {
    const newCoords = reject(isCoordsInSquare(square), coords)

    if (newCoords.length > 0) {
      window.requestAnimationFrame(
        animate(
          newCoords,
          squareArea(square) > 0 ? [...squares, square] : squares,
          createSquare(newCoords[randomInt(newCoords.length)], 0)
        )
      )
    }
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height)
    ;[...squares, square].map(drawSquare)
    window.requestAnimationFrame(
      animate(coords, squares, increaseWidth(square))
    )
  }
}

window.requestAnimationFrame(
  animate(
    getCoords(canvas.width, canvas.height),
    [],
    createSquare(randomCoords(canvas.width, canvas.height), 0)
  )
)
