import * as THREE from "three";
import { SimObject } from "./SimObject";
import { Vector2d } from "../SimTypes";
import { getLineLength2d, getMidpoint2d, getAngleRadians2d } from "../utils/Geom2dUtil";

const DEFAULT_WALL_THICKNESS: number = 0.1;
const DEFAULT_WALL_HEIGHT: number = 1;
const DEFAULT_WALL_COLOR: number = 0x226622;

export interface ISimWallSpec {
    start: Vector2d;
    end: Vector2d;
    thickness?: number;
    height?: number;
    color?: number;
}

export class SimWall extends SimObject {
    constructor(spec: ISimWallSpec) {
        super();

        const wallLength: number = getLineLength2d(spec.start, spec.end);
        const wallMidpoint: Vector2d = getMidpoint2d(spec.start, spec.end);
        const wallAngleRadians: number = getAngleRadians2d(spec.start, spec.end);

        const wallThickness = spec.thickness !== undefined ? spec.thickness : DEFAULT_WALL_THICKNESS;
        const wallHeight = spec.height !== undefined ? spec.height : DEFAULT_WALL_HEIGHT;
        const wallColor = spec.color !== undefined ? spec.color : DEFAULT_WALL_COLOR;

        // Build the wall in the X direction, thickness in Z and height in Y
        const meshGeom = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
        const wallMaterial = new THREE.MeshStandardMaterial({ color: wallColor });
        const wallMesh = new THREE.Mesh(meshGeom, wallMaterial);

        // Set position
        // Vector2d has fields x and y (by convention) but we need to map to
        // the x and z axes in THREE.
        wallMesh.position.x = wallMidpoint.x;
        wallMesh.position.z = wallMidpoint.y;
        wallMesh.position.y = (wallHeight / 2);

        // We only do rotations about the Y axis
        wallMesh.rotation.x = 0;
        wallMesh.rotation.z = 0;
        wallMesh.rotation.y = wallAngleRadians;

        this._mesh = wallMesh;
    }
}
