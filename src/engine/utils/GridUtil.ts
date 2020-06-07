import * as THREE from "three";

export enum GridPlane {
    XY,
    XZ,
    YZ
};

/**
 * Make a plane grid
 * @param plane Plane to create the grid in
 * @param xLength Width of grid in normalized units (metres)
 * @param zLength Length of grid in normalized units (metres)
 * @param numLinesX Number of lines to draw in the width axis
 * @param numLinesZ Number of lines to draw in the length axis
 * @param color Grid color
 */
export function makeGrid(plane: GridPlane,
                          axis1Length: number,
                          axis2Length: number,
                          numLinesAxis1: number,
                          numLinesAxis2: number,
                          color: number = 0xCCCCCC): THREE.Object3D {

    const material = new THREE.LineBasicMaterial({
        color,
        opacity: 0.2
    });

    const gridObject = new THREE.Object3D();
    const gridGeom = new THREE.Geometry();
    const stepAxis1 = 2 * axis1Length / numLinesAxis1;
    const stepAxis2 = 2 * axis2Length / numLinesAxis2;

    for (let i = -axis1Length; i <= axis1Length; i += stepAxis1) {
        let xVal = 0;
        let yVal = 0;
        let zVal = 0;

        switch (plane) {
            case GridPlane.XY:
                xVal = i;
                yVal = axis2Length;
                break;
            case GridPlane.XZ:
                xVal = i;
                zVal = axis2Length;
                break;
            case GridPlane.YZ:
                yVal = i;
                zVal = axis2Length;
        }
        gridGeom.vertices.push(new THREE.Vector3(xVal, yVal, zVal));

        switch (plane) {
            case GridPlane.XY:
                yVal = -axis2Length;
                break;
            case GridPlane.XZ:
                zVal = -axis2Length;
                break;
            case GridPlane.YZ:
                zVal = -axis2Length;
        }
        gridGeom.vertices.push(new THREE.Vector3(xVal, yVal, zVal));
    }

    for (let i = -axis2Length; i <= axis2Length; i += stepAxis2) {
        let xVal = 0;
        let yVal = 0;
        let zVal = 0;

        switch (plane) {
            case GridPlane.XY:
                xVal = axis1Length;
                yVal = i;
                break;
            case GridPlane.XZ:
                xVal = axis1Length;
                zVal = i;
                break;
            case GridPlane.YZ:
                yVal = axis1Length;
                zVal = i;
        }

        gridGeom.vertices.push(new THREE.Vector3(xVal, yVal, zVal));

        switch (plane) {
            case GridPlane.XY:
                xVal = -axis1Length;
                break;
            case GridPlane.XZ:
                xVal = -axis1Length;
                break;
            case GridPlane.YZ:
                yVal = -axis1Length;
        }
        gridGeom.vertices.push(new THREE.Vector3(xVal, yVal, zVal));
    }

    const line = new THREE.LineSegments(gridGeom, material);
    gridObject.add(line);

    return gridObject;
}
