import { map, reject } from 'ramda'
import { randomElement, getCoords, randomCoords } from './core'

export const createShapeFiller = ({
  cannotGrow,
  canvas,
  context,
  createShape,
  drawShape,
  increaseShape,
  isCoordsInShape,
  isBigEnough,
}) => () => {
  const animate = (coords, shapes, shape) => () => {
    if (cannotGrow(canvas, shapes)(shape)) {
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
      context.clearRect(0, 0, canvas.width, canvas.height)
      map(drawShape, [...shapes, shape])
      window.requestAnimationFrame(
        animate(coords, shapes, increaseShape(shape))
      )
    }
  }

  window.requestAnimationFrame(
    animate(
      getCoords(canvas.width, canvas.height),
      [],
      createShape(randomCoords(canvas.width, canvas.height))
    )
  )
}
