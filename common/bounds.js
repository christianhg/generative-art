export const padding = (padding, canvas) => ({
  A: { x: padding, y: padding },
  C: { x: canvas.width - padding, y: canvas.height - padding },
})
