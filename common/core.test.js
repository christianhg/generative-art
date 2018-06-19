import test from 'ava'
import { createArray } from './core'

test('createArray', t => {
  t.deepEqual(createArray(1), [undefined])
  t.deepEqual(createArray(0), [])
  t.deepEqual(createArray(4), [undefined, undefined, undefined, undefined])
})
