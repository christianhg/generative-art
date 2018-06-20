import { any, compose, either, map, min, reject, __ } from 'ramda'
import {
  coordsDistance,
  getCoords,
  isEqualCoords,
  randomCoords,
  randomElement,
} from '../common/core'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const size = min(640, window.innerWidth - 100)

document.body.appendChild(canvas)
canvas.width = size
canvas.height = size

const drawCircle = ({ coords, radius }) => {
  context.beginPath()
  context.arc(coords.x, coords.y, radius, 0, Math.PI * 2)
  context.closePath()
  context.strokeStyle = '#ffffff'
  context.stroke()
}

const overflows = (width, height) => circle =>
  circle.coords.x - circle.radius <= 0 ||
  circle.coords.x + circle.radius >= width ||
  circle.coords.y - circle.radius <= 0 ||
  circle.coords.y + circle.radius >= height

const overflowsCanvas = overflows(canvas.width, canvas.height)

const isCoordsInCircle = circle => coords =>
  circle.radius > coordsDistance(circle.coords, coords)

const circlesDistance = (circleA, circleB) =>
  coordsDistance(circleA.coords, circleB.coords)

const circlesIntersect = circleA => circleB =>
  circlesDistance(circleA, circleB) < circleA.radius + circleB.radius

const increaseRadius = circle =>
  Object.assign({}, circle, { radius: circle.radius + 1 })

const cannotGrow = circles =>
  compose(
    either(
      compose(
        any(__, circles),
        circlesIntersect
      ),
      overflowsCanvas
    ),
    increaseRadius
  )

const animateCircles = (coords, circles, circle) => () => {
  if (cannotGrow(circles)(circle)) {
    const newCoords = reject(
      either(isCoordsInCircle(circle), isEqualCoords(circle.coords)),
      coords
    )

    window.requestAnimationFrame(
      animateCircles(
        newCoords,
        circle.radius > 0 ? [...circles, circle] : circles,
        {
          coords: randomElement(newCoords),
          radius: 0,
        }
      )
    )
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height)
    map(drawCircle, [...circles, circle])
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
