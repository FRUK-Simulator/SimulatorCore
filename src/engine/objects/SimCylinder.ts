import * as THREE from "three";
import { FrictionSpec, SimObject } from "./SimObject";
import { Vec2, Box } from "planck-js";
import { ICylinderSpec } from "../specs/CoreSpecs";
import { Vector2d } from "../SimTypes";
import { FixtureDef } from "planck-js";
import { BodyDef } from "planck-js";
import { IBaseFixtureUserData } from "../specs/UserDataSpecs";
import { EntityCategory, EntityMask } from "./robot/RobotCollisionConstants";

const DEFAULT_CYLINDER_COLOR = 0xffff00;

/**
 * Factory method for creating a SimCylinder
 * @param spec
 */
export function makeSimCylinder(spec: ICylinderSpec): SimCylinder {
  return new SimCylinder(spec);
}

export class SimCylinder extends SimObject {
  private bodySpecs: BodyDef;
  private fixtureSpecs: FixtureDef;

  constructor(spec: ICylinderSpec) {
    super("SimCylinder");

    const color = spec.baseColor ? spec.baseColor : DEFAULT_CYLINDER_COLOR;
    const initialPosition: Vector2d = { x: 0, y: 0 };

    const cylinderGeom = new THREE.CylinderGeometry(
      spec.radius,
      spec.radius,
      spec.height
    );
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color });
    const cylinderMesh = new THREE.Mesh(cylinderGeom, cylinderMaterial);

    if (spec.initialPosition) {
      initialPosition.x = spec.initialPosition.x;
      initialPosition.y = spec.initialPosition.y;
    }

    // Set initial starting positions
    cylinderMesh.position.y = spec.height / 2; // Ensure the cylinder is sitting on the field
    cylinderMesh.position.x = initialPosition.x;
    cylinderMesh.position.z = initialPosition.y;

    this._mesh = cylinderMesh;

    // Set up the physics body
    // NOTE: We will need to set sane defaults for physics properties in the event
    // that they are not provided by the spec
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
      type: "simobject-cylinder",
      id: spec.id,
    };

    this.fixtureSpecs = {
      shape: new Box(spec.height / 2, spec.radius),
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

  getFixtureDef(): FixtureDef {
    return this.fixtureSpecs;
  }

  getFriction(): FrictionSpec | null {
    return {
      maxForce: 0.1,
      maxTorque: 0.001,
    };
  }
}
