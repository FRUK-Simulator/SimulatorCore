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
import { EntityCategory, EntityMask } from "./robot/RobotCollisionConstants";
import { IBaseFixtureUserData } from "../specs/UserDataSpecs";

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
    const wallPanelThickness = 0.05;
    const wallHeight =
      spec.height !== undefined ? spec.height : DEFAULT_WALL_HEIGHT;
    const wallColor =
      spec.baseColor !== undefined ? spec.baseColor : DEFAULT_WALL_COLOR;

    // Build the wall in the X direction, thickness in Z and height in Y
    const meshGeom = new THREE.BoxGeometry(
      wallLength,
      wallHeight,
      wallPanelThickness
    );
    const wallMaterial = new THREE.MeshPhongMaterial({
      color: wallColor,
      opacity: 0.5,
      transparent: true,
    });
    const wallSolidMaterial = new THREE.MeshPhongMaterial({ color: wallColor });
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

    const meshEdgeGeom = new THREE.BoxGeometry(wallLength, 0.05, wallThickness);
    const wallTopMesh = new THREE.Mesh(meshEdgeGeom, wallSolidMaterial);
    wallTopMesh.position.y = wallHeight / 2;
    wallMesh.add(wallTopMesh);
    const wallBottomMesh = new THREE.Mesh(meshEdgeGeom, wallSolidMaterial);
    wallBottomMesh.position.y = -wallHeight / 2;
    wallMesh.add(wallBottomMesh);

    // Physics
    this.bodySpecs = {
      type: "static",
      angle: wallAngleRadians,
      position: new Vec2(wallMidpoint.x, wallMidpoint.y),
    };

    // Add user data to aid debugging.
    const userData: IBaseFixtureUserData = {
      selfGuid: this.guid,
      type: "wall",
    };

    this.fixtureSpecs = {
      shape: new Box(wallLength / 2, wallThickness / 2),
      density: 1,
      isSensor: false,
      filterCategoryBits: EntityCategory.WALL,
      filterMaskBits: EntityMask.WALL,
      userData,
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
