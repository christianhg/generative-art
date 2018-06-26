import test from 'ava'
import {
  createCircle,
  circleOverflowsCircle,
  circleOverflowsSquare,
} from './circles'
import { createSquare } from './squares'

test('circleOverflowsCircle', t => {
  t.true(
    circleOverflowsCircle(createCircle(10)({ x: 10, y: 10 }))(
      createCircle(10)({ x: 10, y: 10 })
    )
  )
  t.true(
    circleOverflowsCircle(createCircle(10)({ x: 10, y: 10 }))(
      createCircle(11)({ x: 10, y: 10 })
    )
  )
  t.false(
    circleOverflowsCircle(createCircle(10)({ x: 10, y: 10 }))(
      createCircle(9)({ x: 10, y: 10 })
    )
  )
})

test('circleOverflowsSquare', t => {
  t.true(
    circleOverflowsSquare(createSquare(10)({ x: 15, y: 15 }))(
      createCircle(5)({ x: 15, y: 15 })
    )
  )
  t.true(
    circleOverflowsSquare(createSquare(10)({ x: 15, y: 15 }))(
      createCircle(6)({ x: 15, y: 15 })
    )
  )
  t.false(
    circleOverflowsSquare(createSquare(10)({ x: 15, y: 15 }))(
      createCircle(4)({ x: 15, y: 15 })
    )
  )
})

test('createCircle', t => {
  t.deepEqual(createCircle(4)({ x: 10, y: 10 }), {
    coords: { x: 10, y: 10 },
    radius: 4,
    type: 'CIRCLE',
  })
})
