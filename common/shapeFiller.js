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

  const canGrow = shapes =>
    compose(
      not,
      either(
        compose(
          any(__, shapes),
          intersects
        ),
        overflows(bounds)
      ),
      increaseShape(1 + margin)
    )

  function getNextShape(canGrow, coords) {
    const nextShape = createShape(randomElement(coords))
    const newCoords = reject(isCoordsInShape(nextShape), coords)

    return newCoords.length === 0
      ? Promise.reject('Done')
      : canGrow(nextShape)
        ? Promise.resolve({ newCoords, nextShape })
        : getNextShape(canGrow, newCoords)
  }

  const animate = (coords, shapes, shape) => () => {
    if (canGrow(shapes)(shape)) {
      draw([...shapes, shape])

      window.requestAnimationFrame(
        animate(coords, shapes, increaseShape(1)(shape))
      )
    } else {
      getNextShape(
        canGrow([...shapes, shape]),
        reject(isCoordsInShape(increaseShape(margin)(shape)), coords)
      ).then(({ newCoords, nextShape }) => {
        window.requestAnimationFrame(
          animate(
            newCoords,
            isBigEnough(shape) ? [...shapes, shape] : shapes,
            nextShape
          )
        )
      }, console.log)
    }
  }

  getNextShape(
    canGrow([]),
    filter(inBounds(bounds), getCoords(canvas.width, canvas.height))
  ).then(({ newCoords, nextShape }) => {
    window.requestAnimationFrame(animate(newCoords, [], nextShape))
  }, console.log)
}
