import * as THREE from "three";
import { FrictionSpec, SimObject } from "./SimObject";
import { Box, Vec2 } from "planck-js";
import { IBoxSpec } from "../specs/CoreSpecs";
import { Vector2d } from "../SimTypes";
import { FixtureDef } from "planck-js";
import { BodyDef } from "planck-js";
import { IBaseFixtureUserData } from "../specs/UserDataSpecs";
import { EntityCategory, EntityMask } from "./robot/RobotCollisionConstants";

const DEFAULT_BOX_COLOR = 0xff00ff;

/**
 * Factory method for creating a SimBox
 * @param spec
 */
export function makeSimBox(spec: IBoxSpec): SimBox {
  return new SimBox(spec);
}

export class SimBox extends SimObject {
  private bodySpecs: BodyDef;
  private fixtureSpecs: FixtureDef;

  constructor(spec: IBoxSpec) {
    super("SimBox");

    const color = spec.baseColor ? spec.baseColor : DEFAULT_BOX_COLOR;
    const initialPosition: Vector2d = { x: 0, y: 0 };

    const boxGeom = new THREE.BoxGeometry(
      spec.dimensions.x,
      spec.dimensions.y,
      spec.dimensions.z
    );
    const boxMaterial = new THREE.MeshStandardMaterial({ color });
    const boxMesh = new THREE.Mesh(boxGeom, boxMaterial);

    if (spec.initialPosition) {
      initialPosition.x = spec.initialPosition.x;
      initialPosition.y = spec.initialPosition.y;
    }

    // Set initial starting positions
    boxMesh.position.y = spec.dimensions.y / 2;
    boxMesh.position.x = initialPosition.x;
    boxMesh.position.z = initialPosition.y;

    this._mesh = boxMesh;

    // Set up the physics body
    this.bodySpecs = {
      type: spec.isStatic ? "static" : "dynamic",
      position: new Vec2(initialPosition.x, initialPosition.y),
      angle: 0,
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    };

    const userData: IBaseFixtureUserData = {
      selfGuid: this.guid,
      type: "simobject-box",
      id: spec.id,
    };

    this.fixtureSpecs = {
      shape: new Box(spec.dimensions.x / 2, spec.dimensions.z / 2),
      density: 1,
      isSensor: false,
      friction: 1,
      restitution: 0,
      userData,
      filterCategoryBits: EntityCategory.OBJECTS,
      filterMaskBits: EntityMask.OBJECTS,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  setBaseColor(color: number): void {
    (<THREE.MeshStandardMaterial>this._mesh.material).color.set(color);
  }

  getBodySpecs(): BodyDef {
    return this.bodySpecs;
  }

  getFixtureDefs(): FixtureDef[] {
    return [this.fixtureSpecs];
  }

  getFriction(): FrictionSpec | null {
    return {
      maxForce: 0.1,
      maxTorque: 0.001,
    };
  }
}
