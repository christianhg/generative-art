import { compose, flatten, inc } from 'ramda'

export const coordsDistance = (coordsA, coordsB) =>
  Math.hypot(coordsB.x - coordsA.x, coordsB.y - coordsA.y)

export const createArray = compose(
  Array.from,
  Array
)

export const getCoords = (width, height) =>
  flatten(
    createArray(inc(width)).map((_, x) =>
      createArray(inc(height)).map((_, y) => ({ x, y }))
    )
  )

export const isEqualCoords = coordsA => coordsB =>
  coordsA.x === coordsB.x && coordsA.y === coordsB.y

export const randomInt = max => Math.floor(Math.random() * Math.floor(max))

export const randomCoords = (width, height) => ({
  x: randomInt(width),
  y: randomInt(height),
})
