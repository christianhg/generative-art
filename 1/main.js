const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

document.body.appendChild(canvas)
canvas.width = window.innerWidth - 100
canvas.height = window.innerWidth - 100

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

const circlesDistance = (circleA, circleB) =>
  Math.hypot(
    circleB.coords.x - circleA.coords.x,
    circleB.coords.y - circleA.coords.y
  )

const circlesIntersect = circleA => circleB =>
  circlesDistance(circleA, circleB) < circleA.radius + circleB.radius

const animateCircles = (circles, circle) => () => {
  const shouldStop =
    overflowsCanvas(circle) || circles.some(circlesIntersect(circle))

  if (shouldStop) {
    window.requestAnimationFrame(
      animateCircles([...circles, circle], {
        coords: randomCoords(canvas.width, canvas.height),
        radius: 0,
      })
    )
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height)
    ;[...circles, circle].map(drawCircle)
    window.requestAnimationFrame(
      animateCircles(
        circles,
        Object.assign({}, circle, { radius: circle.radius + 1 })
      )
    )
  }
}

window.requestAnimationFrame(
  animateCircles([], {
    coords: randomCoords(canvas.width, canvas.height),
    radius: 0,
  })
)
