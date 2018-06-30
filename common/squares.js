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
  type: 'SQUARE',
})

export const decreaseSize = square => ({
  ...square,
  A: {
    x: square.A.x + 1,
    y: square.A.y + 1,
  },
  B: {
    x: square.B.x - 1,
    y: square.B.y + 1,
  },
  C: {
    x: square.C.x - 1,
    y: square.C.y - 1,
  },
  D: {
    x: square.D.x + 1,
    y: square.D.y - 1,
  },
})

export const drawSquare = colorSquare => context => square => {
  const { A, B, C, D } = decreaseSize(square)

  context.strokeStyle = colorSquare(square)
  context.beginPath()
  context.moveTo(A.x, A.y)
  context.lineWidth = 2
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

export const increaseWidth = amount => square => ({
  ...square,
  A: {
    x: square.A.x - amount,
    y: square.A.y - amount,
  },
  B: {
    x: square.B.x + amount,
    y: square.B.y - amount,
  },
  C: {
    x: square.C.x + amount,
    y: square.C.y + amount,
  },
  D: {
    x: square.D.x - amount,
    y: square.D.y + amount,
  },
})

export const isSquare = shape => shape.type === 'SQUARE'

export const overflows = bounds => square =>
  square.A.x <= bounds.A.x ||
  square.A.y <= bounds.A.y ||
  square.C.x >= bounds.C.x ||
  square.C.y >= bounds.C.y

export const squareArea = square =>
  (square.D.y - square.A.y) * (square.B.x - square.A.x)

export const squaresIntersect = a => b =>
  a.A.x <= b.C.x && a.C.x >= b.A.x && a.A.y <= b.C.y && a.C.y >= b.A.y
