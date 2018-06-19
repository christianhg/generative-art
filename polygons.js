import { coordsDistance } from './core'

const triangleArea = ({ A, B, C }) =>
  (coordsDistance(A, B) + coordsDistance(B, C) + coordsDistance(C, A)) / 2

const isCoordsInPolygon = polygon => coords =>
  triangleArea({ A: polygon.A, B: coords, C: polygon.D }) +
    triangleArea({ A: polygon.D, B: coords, C: polygon.C }) +
    triangleArea({ A: polygon.C, B: coords, C: polygon.B }) +
    triangleArea({ A: coords, B: polygon.B, C: polygon.A }) <=
  squareArea(polygon)
