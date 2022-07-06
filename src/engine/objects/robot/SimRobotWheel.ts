import * as THREE from "three";
import { SimObject } from "../SimObject";
import { Vec2, Box, BodyDef, FixtureDef } from "planck-js";
import { IRobotWheelSpec } from "../../specs/RobotSpecs";
import { IBaseFixtureUserData } from "../../specs/UserDataSpecs";
import { Vector3d } from "../../SimTypes";
import { EntityCategory, EntityMask } from "./RobotCollisionConstants";

const DEFAULT_WHEEL_COLOR = 0x000000;
const DEFAULT_WHEEL_THICKNESS = 0.15;

// Controls how much skidding happens in the robot's left right plane.
const DEFAULT_OMNI_SIDESLIP_FACTOR = 0.1;
const DEFAULT_NON_OMNI_SIDESLIP_FACTOR = 5;

export class SimRobotWheel extends SimObject {
  protected _forceMagnitude = 0;
  protected _sideSlipFactor = 0;

  private _bodySpecs: BodyDef;
  private _fixtureSpecs: FixtureDef;

  constructor(
    spec: IRobotWheelSpec,
    robotGuid: string,
    wheelPos?: Vector3d,
    shouldRender?: boolean
  ) {
    super("SimWheel");

    this._sideSlipFactor = spec.isOmni
      ? DEFAULT_OMNI_SIDESLIP_FACTOR
      : DEFAULT_NON_OMNI_SIDESLIP_FACTOR;

    const thickness =
      spec.thickness !== undefined ? spec.thickness : DEFAULT_WHEEL_THICKNESS;

    if (shouldRender) {
      const color =
        spec.baseColor !== undefined ? spec.baseColor : DEFAULT_WHEEL_COLOR;

      const wheelGeom = new THREE.CylinderGeometry(
        spec.radius,
        spec.radius,
        thickness
      );
      const wheelMaterial = new THREE.MeshStandardMaterial({ color });
      const wheelMesh = new THREE.Mesh(wheelGeom, wheelMaterial);

      this._mesh = wheelMesh;
    } else {
      // empty mesh
      this._mesh = new THREE.Mesh();
    }

    // rotate Pi/2 around the Z axis to get it vertical
    this._mesh.rotation.z = Math.PI / 2;

    const bodyPos: Vec2 = new Vec2(0, 0);

    if (wheelPos !== undefined) {
      this._mesh.position.x = wheelPos.x;
      this._mesh.position.y = wheelPos.y;
      this._mesh.position.z = wheelPos.z;

      bodyPos.x = wheelPos.x;
      bodyPos.y = wheelPos.z;
    }

    this._bodySpecs = {
      type: "dynamic", // wheels are always dynamic
      position: bodyPos,
      angle: 0, // TODO implement using info provided in spec
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    };

    const userData: IBaseFixtureUserData = {
      selfGuid: this.guid,
      rootGuid: robotGuid,
      type: "wheel",
      id: spec.id,
    };

    this._fixtureSpecs = {
      shape: new Box(thickness / 2, spec.radius),
      density: 1,
      isSensor: true,
      userData,
      filterCategoryBits: EntityCategory.ROBOT_PART,
      filterMaskBits: EntityMask.ROBOT_PART,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();

    this.updateFriction();
    this.updateDrive();

    // Update the mesh
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  setForce(force: number): void {
    this._forceMagnitude = force;
  }

  getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  getFixtureDefs(): FixtureDef[] {
    return [this._fixtureSpecs];
  }

  private getForwardVelocity(): Vec2 {
    const currForwardNormal = this._body.getWorldVector(new Vec2(0, 1));
    return currForwardNormal.mul(
      Vec2.dot(currForwardNormal, this._body.getLinearVelocity())
    );
  }

  private getLateralVelocity(): Vec2 {
    const currRightNormal = this._body.getWorldVector(new Vec2(1, 0));
    return currRightNormal.mul(
      Vec2.dot(currRightNormal, this._body.getLinearVelocity())
    );
  }

  private updateFriction(): void {
    // Lateral
    // TODO the max lateral impulse should be proportional to mass
    const maxLateralImpulse = 2.0;
    let impulseLateral = this.getLateralVelocity().mul(
      -this._body.getMass() * this._sideSlipFactor
    );

    if (impulseLateral.length() > maxLateralImpulse) {
      impulseLateral = impulseLateral.mul(
        maxLateralImpulse / impulseLateral.length()
      );
    }
    this._body.applyLinearImpulse(impulseLateral, this._body.getWorldCenter());

    // Angular
    this._body.applyAngularImpulse(
      0.1 * this._body.getInertia() * -this._body.getAngularVelocity()
    );

    // Forward linear velocity (aka breaking force)
    // apply a force in the opposite direction to "slide direction"
    // the slide direction is the `getForwardVelocity` function return
    if (this._forceMagnitude < 0.000005) {
      const breakImpulse = this.getForwardVelocity()
        .mul(-1)
        .mul(1.5)
        .mul(this._body.getMass());
      this._body.applyLinearImpulse(breakImpulse, this._body.getWorldCenter());
    }
  }

  private updateDrive(): void {
    const forceVector = this._body.getWorldVector(new Vec2(0, -1));
    forceVector.mul(this._forceMagnitude);

    // TODO take into account static friction?
    if (forceVector.lengthSquared() > 0.00000005) {
      // Apply the force, simulating the wheel pushing against ground friction
      this._body.applyForce(forceVector, this._body.getWorldCenter(), true);
    }
  }
}
