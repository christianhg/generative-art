import test from 'ava'
import { createArray, getCoords } from './core'

test('createArray', t => {
  t.deepEqual(createArray(1), [undefined])
  t.deepEqual(createArray(0), [])
  t.deepEqual(createArray(4), [undefined, undefined, undefined, undefined])
})

test('getCoords', t => {
  t.deepEqual(getCoords(0, 0), [{ x: 0, y: 0 }])
  t.deepEqual(getCoords(1, 0), [{ x: 0, y: 0 }, { x: 1, y: 0 }])
  t.deepEqual(getCoords(1, 1), [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
  ])
  t.deepEqual(getCoords(3, 3), [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 0 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ])
})
