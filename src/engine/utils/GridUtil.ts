import * as THREE from "three";

export enum GridPlane {
  XY,
  XZ,
  YZ,
}

/**
 * Make a plane grid centered around origin
 *
 * Note that this function takes in HALF-LENGTHS, thus, if you want a grid
 * that is e.g. 10 x 20, you should pass in 5 and 10 instead. The center of
 * the grid will be set as the origin.
 *
 * @param plane Plane to create the grid in
 * @param axis1HalfLength half-length of grid in first axis in normalized units (metres)
 * @param axis2HalfLength half-length of grid in second axis normalized units (metres)
 * @param numLinesX Number of lines to draw in the width axis
 * @param numLinesZ Number of lines to draw in the length axis
 * @param color Grid color
 */
export function makeGrid(
  plane: GridPlane,
  axis1HalfLength: number,
  axis2HalfLength: number,
  numLinesAxis1: number,
  numLinesAxis2: number,
  color = 0xcccccc
): THREE.Object3D {
  const material = new THREE.LineBasicMaterial({
    color,
    opacity: 0.2,
  });

  const stepAxis1 = (2 * axis1HalfLength) / numLinesAxis1;
  const stepAxis2 = (2 * axis2HalfLength) / numLinesAxis2;

  let vertices = [];
  for (let i = -axis1HalfLength; i <= axis1HalfLength; i += stepAxis1) {
    let xVal = 0;
    let yVal = 0;
    let zVal = 0;

    switch (plane) {
      case GridPlane.XY:
        xVal = i;
        yVal = axis2HalfLength;
        break;
      case GridPlane.XZ:
        xVal = i;
        zVal = axis2HalfLength;
        break;
      case GridPlane.YZ:
        yVal = i;
        zVal = axis2HalfLength;
    }
    vertices.push(new THREE.Vector3(xVal, yVal, zVal));

    switch (plane) {
      case GridPlane.XY:
        yVal = -axis2HalfLength;
        break;
      case GridPlane.XZ:
        zVal = -axis2HalfLength;
        break;
      case GridPlane.YZ:
        zVal = -axis2HalfLength;
    }
    vertices.push(new THREE.Vector3(xVal, yVal, zVal));
  }

  for (let i = -axis2HalfLength; i <= axis2HalfLength; i += stepAxis2) {
    let xVal = 0;
    let yVal = 0;
    let zVal = 0;

    switch (plane) {
      case GridPlane.XY:
        xVal = axis1HalfLength;
        yVal = i;
        break;
      case GridPlane.XZ:
        xVal = axis1HalfLength;
        zVal = i;
        break;
      case GridPlane.YZ:
        yVal = axis1HalfLength;
        zVal = i;
    }

    vertices.push(new THREE.Vector3(xVal, yVal, zVal));

    switch (plane) {
      case GridPlane.XY:
        xVal = -axis1HalfLength;
        break;
      case GridPlane.XZ:
        xVal = -axis1HalfLength;
        break;
      case GridPlane.YZ:
        yVal = -axis1HalfLength;
    }
    vertices.push(new THREE.Vector3(xVal, yVal, zVal));
  }

  const gridObject = new THREE.Object3D();
  const gridGeom = new THREE.BufferGeometry();
  gridGeom.setFromPoints(vertices);
  const line = new THREE.LineSegments(gridGeom, material);
  gridObject.add(line);

  return gridObject;
}
