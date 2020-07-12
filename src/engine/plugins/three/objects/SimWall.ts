import * as THREE from "three";
import { SimObject } from "./SimObject";
import { Vector2d } from "../SimTypes";
import {
  getLineLength2d,
  getMidpoint2d,
  getAngleRadians2d,
} from "../utils/Geom2dUtil";
import { Vec2, Box } from "planck-js";
import { IWallSpec } from "../specs/CoreSpecs";
import { FixtureDef } from "planck-js";
import { BodyDef } from "planck-js";

export const DEFAULT_WALL_THICKNESS = 0.1;
export const DEFAULT_WALL_HEIGHT = 1;
const DEFAULT_WALL_COLOR = 0x226622;

/**
 * Factory method for creating a SimWall
 * @param spec
 */
export function makeSimWall(spec: IWallSpec): SimWall {
  return new SimWall(spec);
}

export class SimWall extends SimObject {
  private bodySpecs: BodyDef;
  private fixtureSpecs: FixtureDef;

  constructor(spec: IWallSpec) {
    super("SimWall");

    const wallLength: number = getLineLength2d(spec.start, spec.end);
    const wallMidpoint: Vector2d = getMidpoint2d(spec.start, spec.end);
    const wallAngleRadians: number = getAngleRadians2d(spec.start, spec.end);

    const wallThickness =
      spec.thickness !== undefined ? spec.thickness : DEFAULT_WALL_THICKNESS;
    const wallHeight =
      spec.height !== undefined ? spec.height : DEFAULT_WALL_HEIGHT;
    const wallColor =
      spec.baseColor !== undefined ? spec.baseColor : DEFAULT_WALL_COLOR;

    // Build the wall in the X direction, thickness in Z and height in Y
    const meshGeom = new THREE.BoxGeometry(
      wallLength,
      wallHeight,
      wallThickness
    );
    const wallMaterial = new THREE.MeshStandardMaterial({ color: wallColor });
    const wallMesh = new THREE.Mesh(meshGeom, wallMaterial);

    // Set position
    // Vector2d has fields x and y (by convention) but we need to map to
    // the x and z axes in THREE.
    wallMesh.position.x = wallMidpoint.x;
    wallMesh.position.z = wallMidpoint.y;
    wallMesh.position.y = wallHeight / 2;

    // We only do rotations about the Y axis
    wallMesh.rotation.x = 0;
    wallMesh.rotation.z = 0;
    wallMesh.rotation.y = wallAngleRadians;

    this._mesh = wallMesh;

    // Physics
    this.bodySpecs = {
      type: "static",
      angle: wallAngleRadians,
      position: new Vec2(wallMidpoint.x, wallMidpoint.y),
    };

    this.fixtureSpecs = {
      shape: new Box(wallLength / 2, wallThickness / 2),
      density: 1,
      isSensor: false,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(ms: number): void {
    // noop
  }

  getBodySpecs(): BodyDef {
    return this.bodySpecs;
  }

  getFixtureDef(): FixtureDef {
    return this.fixtureSpecs;
  }
}
