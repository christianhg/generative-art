import { either, flatten, reject } from 'ramda'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

document.body.appendChild(canvas)
canvas.width = window.innerWidth - 100
canvas.height = window.innerWidth - 100

const getCoords = (width, height) =>
  flatten(
    Array.from(Array(width)).map((_, x) =>
      Array.from(Array(height)).map((_, y) => ({ x, y }))
    )
  )

const randomInt = max => Math.floor(Math.random() * Math.floor(max))

const randomCoords = (width, height) => ({
  x: randomInt(width),
  y: randomInt(height),
})

const drawCircle = ({ coords, radius }) => {
  context.beginPath()
  context.arc(coords.x, coords.y, radius, 0, Math.PI * 2)
  context.closePath()
  context.strokeStyle = '#ffffff'
  context.stroke()
}

const overflows = (width, height) => circle =>
  circle.coords.x - circle.radius < 0 ||
  circle.coords.x + circle.radius > width ||
  circle.coords.y - circle.radius < 0 ||
  circle.coords.y + circle.radius > height

const overflowsCanvas = overflows(canvas.width, canvas.height)

const isEqualCoords = coordsA => coordsB =>
  coordsA.x === coordsB.x && coordsA.y === coordsB.y

const coordsDistance = (coordsA, coordsB) =>
  Math.hypot(coordsB.x - coordsA.x, coordsB.y - coordsA.y)

const isCoordsInCircle = circle => coords =>
  circle.radius > coordsDistance(circle.coords, coords)

const circlesDistance = (circleA, circleB) =>
  coordsDistance(circleA.coords, circleB.coords)

const circlesIntersect = circleA => circleB =>
  circlesDistance(circleA, circleB) < circleA.radius + circleB.radius

const increaseRadius = circle =>
  Object.assign({}, circle, { radius: circle.radius + 1 })

const animateCircles = (coords, circles, circle) => () => {
  const shouldStop =
    overflowsCanvas(increaseRadius(circle)) ||
    circles.some(circlesIntersect(increaseRadius(circle)))

  if (shouldStop) {
    const newCoords = reject(
      either(isCoordsInCircle(circle), isEqualCoords(circle.coords)),
      coords
    )

    window.requestAnimationFrame(
      animateCircles(
        newCoords,
        circle.radius > 0 ? [...circles, circle] : circles,
        {
          coords: newCoords[randomInt(newCoords.length)],
          radius: 0,
        }
      )
    )
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height)
    ;[...circles, circle].map(drawCircle)
    window.requestAnimationFrame(
      animateCircles(coords, circles, increaseRadius(circle))
    )
  }
}

window.requestAnimationFrame(
  animateCircles(getCoords(canvas.width, canvas.height), [], {
    coords: randomCoords(canvas.width, canvas.height),
    radius: 0,
  })
)
