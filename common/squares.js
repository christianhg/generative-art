import { any, compose, either, __ } from 'ramda'

export const cannotGrow = (canvas, squares) =>
  compose(
    either(
      compose(
        any(__, squares),
        squaresIntersect
      ),
      overflows(canvas.width, canvas.height)
    ),
    increaseWidth
  )

export const createSquare = width => centre => ({
  A: {
    x: centre.x - Math.round(width / 2),
    y: centre.y - Math.round(width / 2),
  },
  B: {
    x: centre.x + Math.round(width / 2),
    y: centre.y - Math.round(width / 2),
  },
  C: {
    x: centre.x + Math.round(width / 2),
    y: centre.y + Math.round(width / 2),
  },
  D: {
    x: centre.x - Math.round(width / 2),
    y: centre.y + Math.round(width / 2),
  },
})

export const drawSquare = colorSquare => context => ({ A, B, C, D }) => {
  context.strokeStyle = colorSquare({ A, B, C, D })
  context.beginPath()
  context.moveTo(A.x, A.y)
  context.lineTo(B.x, B.y)
  context.lineTo(C.x, C.y)
  context.lineTo(D.x, D.y)
  context.lineTo(A.x, A.y)
  context.stroke()
}

export const isCoordsInSquare = square => coords =>
  square.A.x <= coords.x &&
  square.A.y <= coords.y &&
  square.B.x >= coords.x &&
  square.B.y <= coords.y &&
  square.C.x >= coords.x &&
  square.C.y >= coords.y &&
  square.D.x <= coords.x &&
  square.D.y >= coords.y

export const increaseWidth = square => ({
  A: {
    x: square.A.x - 1,
    y: square.A.y - 1,
  },
  B: {
    x: square.B.x + 1,
    y: square.B.y - 1,
  },
  C: {
    x: square.C.x + 1,
    y: square.C.y + 1,
  },
  D: {
    x: square.D.x - 1,
    y: square.D.y + 1,
  },
})

export const overflows = (width, height) => square =>
  square.A.x <= 0 ||
  square.A.y <= 0 ||
  square.C.x >= width ||
  square.C.y >= height

export const squareArea = square =>
  (square.D.y - square.A.y) * (square.B.x - square.A.x)

export const squaresIntersect = a => b =>
  a.A.x <= b.C.x && a.C.x >= b.A.x && a.A.y <= b.C.y && a.C.y >= b.A.y
