import { min } from 'ramda'

export const createCanvas = () => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const size = min(640, window.innerWidth)

  canvas.width = size
  canvas.height = size

  canvas.addEventListener('click', () => {
    const link = document.createElement('a')
    link.download = Date.now()
    link.href = canvas.toDataURL()
    link.click()
  })

  return { canvas, context }
}
