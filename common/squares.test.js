import test from 'ava'
import { all, none } from 'ramda'
import {
  createSquare,
  increaseWidth,
  isCoordsInSquare,
  squaresIntersect,
} from './squares'

test('createSquare', t => {
  t.deepEqual(createSquare(6)({ x: 4, y: 4 }), {
    A: { x: 1, y: 1 },
    B: { x: 7, y: 1 },
    C: { x: 7, y: 7 },
    D: { x: 1, y: 7 },
    type: 'SQUARE',
  })
  t.deepEqual(createSquare(5)({ x: 4, y: 4 }), {
    A: { x: 1, y: 1 },
    B: { x: 7, y: 1 },
    C: { x: 7, y: 7 },
    D: { x: 1, y: 7 },
    type: 'SQUARE',
  })
  t.deepEqual(createSquare(4)({ x: 4, y: 4 }), {
    A: { x: 2, y: 2 },
    B: { x: 6, y: 2 },
    C: { x: 6, y: 6 },
    D: { x: 2, y: 6 },
    type: 'SQUARE',
  })
})

test('increaseWidth', t => {
  t.deepEqual(
    increaseWidth(1)({
      A: { x: 1, y: 1 },
      B: { x: 1, y: 1 },
      C: { x: 1, y: 1 },
      D: { x: 1, y: 1 },
    }),
    {
      A: { x: 0, y: 0 },
      B: { x: 2, y: 0 },
      C: { x: 2, y: 2 },
      D: { x: 0, y: 2 },
    }
  )
})

test('isCoordsInSquare', t => {
  t.true(
    all(
      isCoordsInSquare({
        A: { x: 0, y: 0 },
        B: { x: 3, y: 0 },
        C: { x: 3, y: 3 },
        D: { x: 0, y: 3 },
      })
    )([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
    ])
  )
  t.true(
    none(
      isCoordsInSquare({
        A: { x: 0, y: 0 },
        B: { x: 3, y: 0 },
        C: { x: 3, y: 3 },
        D: { x: 0, y: 3 },
      })
    )([
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: 2, y: -1 },
      { x: 3, y: -1 },
      { x: 4, y: -1 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
      { x: 1, y: 4 },
      { x: 0, y: 4 },
      { x: -1, y: 4 },
      { x: -1, y: 3 },
      { x: -1, y: 2 },
      { x: -1, y: 1 },
      { x: -1, y: 0 },
    ])
  )
})

test('squaresIntersect', t => {
  // Two squares on top of each other
  t.true(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })
  )

  // Second square directly above
  t.true(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: 0, y: -10 },
      B: { x: 10, y: -10 },
      C: { x: 10, y: 0 },
      D: { x: 0, y: 0 },
    })
  )
  t.false(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: 0, y: -11 },
      B: { x: 10, y: -11 },
      C: { x: 10, y: -1 },
      D: { x: 0, y: -1 },
    })
  )

  // Second square directly to the right
  t.true(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: 10, y: 0 },
      B: { x: 20, y: 0 },
      C: { x: 20, y: 10 },
      D: { x: 10, y: 10 },
    })
  )
  t.false(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: 11, y: 0 },
      B: { x: 21, y: 0 },
      C: { x: 21, y: 10 },
      D: { x: 11, y: 10 },
    })
  )

  // Second square directly below
  t.true(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: 0, y: 10 },
      B: { x: 10, y: 10 },
      C: { x: 10, y: 20 },
      D: { x: 0, y: 20 },
    })
  )
  t.false(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: 0, y: 11 },
      B: { x: 10, y: 11 },
      C: { x: 10, y: 21 },
      D: { x: 0, y: 201 },
    })
  )

  // Second square directly to the left
  t.true(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: -10, y: 0 },
      B: { x: 0, y: 0 },
      C: { x: 0, y: 10 },
      D: { x: -10, y: 10 },
    })
  )
  t.false(
    squaresIntersect({
      A: { x: 0, y: 0 },
      B: { x: 10, y: 0 },
      C: { x: 10, y: 10 },
      D: { x: 0, y: 10 },
    })({
      A: { x: -11, y: 0 },
      B: { x: -1, y: 0 },
      C: { x: -1, y: 10 },
      D: { x: -11, y: 10 },
    })
  )
})
