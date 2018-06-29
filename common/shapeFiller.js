import { any, compose, either, filter, map, not, reject, __ } from 'ramda'
import { inBounds } from './bounds'
import { getCoords, randomElement } from './core'

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
  margin,
  overflows,
}) => () => {
  const draw = shapes => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
    map(drawShape(context), shapes)
  }

  const cannotGrow = shapes =>
    compose(
      either(
        compose(
          any(__, shapes),
          intersects
        ),
        overflows(bounds)
      ),
      increaseShape(1 + margin)
    )

  const canGrow = shapes =>
    compose(
      not,
      cannotGrow(shapes)
    )

  function getNextShape(canGrow, coords, tries = 1) {
    const nextShape = createShape(randomElement(coords))
    const newCoords = reject(isCoordsInShape(nextShape), coords)

    return newCoords.length === 0 || tries > 200
      ? { newCoords }
      : canGrow(nextShape)
        ? { newCoords, nextShape }
        : getNextShape(canGrow, newCoords, tries + 1)
  }

  const animate = (coords, shapes, shape) => () => {
    if (cannotGrow(shapes)(shape)) {
      const { newCoords, nextShape } = getNextShape(
        canGrow([...shapes, shape]),
        reject(isCoordsInShape(increaseShape(margin)(shape)), coords)
      )

      if (newCoords.length > 0 && nextShape) {
        window.requestAnimationFrame(
          animate(
            newCoords,
            isBigEnough(shape) ? [...shapes, shape] : shapes,
            nextShape
          )
        )
      }
    } else {
      draw([...shapes, shape])

      window.requestAnimationFrame(
        animate(coords, shapes, increaseShape(1)(shape))
      )
    }
  }

  const { newCoords, nextShape } = getNextShape(
    canGrow([]),
    filter(inBounds(bounds), getCoords(canvas.width, canvas.height))
  )

  if (nextShape) {
    window.requestAnimationFrame(animate(newCoords, [], nextShape))
  }
}
