import { any, compose, either, map, reject, __ } from 'ramda'
import { randomElement, getCoords, randomCoords } from './core'
import { inBounds } from './bounds'

export const createShapeFiller = ({
  backgroundColor,
  bounds,
  canvas,
  context,
  createShape,
  drawShape,
  increaseShape,
  intersects,
  isCoordsInShape,
  isBigEnough,
  overflows,
}) => () => {
  const draw = shapes => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
    map(drawShape(context), shapes)
  }

  const animate = (coords, shapes, shape) => () => {
    const cannotGrow = compose(
      either(
        compose(
          any(__, shapes),
          intersects
        ),
        overflows(bounds)
      ),
      increaseShape
    )

    if (cannotGrow(shape)) {
      const newCoords = reject(isCoordsInShape(shape), coords)

      if (newCoords.length > 0) {
        window.requestAnimationFrame(
          animate(
            newCoords,
            isBigEnough(shape) ? [...shapes, shape] : shapes,
            createShape(randomElement(newCoords))
          )
        )
      }
    } else {
      draw([...shapes, shape])

      window.requestAnimationFrame(
        animate(coords, shapes, increaseShape(shape))
      )
    }
  }

  const coords = reject(
    inBounds(bounds),
    getCoords(canvas.width, canvas.height)
  )

  window.requestAnimationFrame(
    animate(coords, [], createShape(randomElement(coords)))
  )
}
