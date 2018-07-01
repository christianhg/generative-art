import {
  any,
  compose,
  either,
  filter,
  ifElse,
  map,
  not,
  reject,
  __,
} from 'ramda'
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
  maxTries = 1000,
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

  const getNextShape = (canGrow, coords, tries = 1) => {
    return coords.length === 0
      ? Promise.reject('Done')
      : tries > maxTries
        ? Promise.reject(`Aborted after ${maxTries} tries`)
        : compose(
            ifElse(
              ({ nextShape }) => canGrow(nextShape),
              ({ newCoords, nextShape }) =>
                Promise.resolve({ newCoords, nextShape }),
              ({ newCoords }) => getNextShape(canGrow, newCoords, tries + 1)
            ),
            nextShape => ({
              newCoords: reject(isCoordsInShape(nextShape), coords),
              nextShape,
            })
          )(createShape(randomElement(coords)))
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
