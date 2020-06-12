import { Vector2d } from "../SimTypes";

export function getLineLength2d(start: Vector2d, end: Vector2d): number {
  const xDiff = end.x - start.x;
  const yDiff = end.y - start.y;
  return Math.sqrt( (xDiff * xDiff) + (yDiff * yDiff) );
}

export function getMidpoint2d(start: Vector2d, end: Vector2d): Vector2d {
  const xDiff = end.x - start.x;
  const yDiff = end.y - start.y;

  return {
    x: start.x + (xDiff / 2),
    y: start.y + (yDiff / 2)
  };
}

export function getAngleRadians2d(start: Vector2d, end: Vector2d): number {
  const xDiff = end.x - start.x;
  const yDiff = end.y - start.y;

  if (xDiff === 0) {
    return Math.PI / 2;
  }
  else if (yDiff === 0) {
    return 0;
  }

  return Math.atan(yDiff / xDiff);
}