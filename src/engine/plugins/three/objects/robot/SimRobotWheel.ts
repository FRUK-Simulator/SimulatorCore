import * as THREE from "three";
import { SimObject } from "../SimObject";
import { Vec2, Box, BodyDef, FixtureDef } from "planck-js";
import { IRobotWheelSpec, ISimUserData } from "../../../../specs/RobotSpecs";
import { Vector3d } from "../../../../SimTypes";

const DEFAULT_WHEEL_COLOR = 0x000000;
const DEFAULT_WHEEL_THICKNESS = 0.15;

const DEFAULT_OMNI_SIDESLIP_PCT = 0.1;
const DEFAULT_NON_OMNI_SIDESLIP_PCT = 0.5;

export class SimRobotWheel extends SimObject {
  protected _forceMagnitude = 0;
  protected _sideSlipPercent = 0;

  private _bodySpecs: BodyDef;
  private _fixtureSpecs: FixtureDef;

  constructor(
    spec: IRobotWheelSpec,
    robotGuid: string,
    wheelPos?: Vector3d,
    shouldRender?: boolean
  ) {
    super("SimWheel");

    this._sideSlipPercent = spec.isOmni
      ? DEFAULT_OMNI_SIDESLIP_PCT
      : DEFAULT_NON_OMNI_SIDESLIP_PCT;

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

    const userData: ISimUserData = {
      robotGuid,
    };

    this._fixtureSpecs = {
      shape: new Box(thickness / 2, spec.radius),
      density: 1,
      isSensor: false,
      userData: userData,
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

  getFixtureDef(): FixtureDef {
    return this._fixtureSpecs;
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
    let impulse = this.getLateralVelocity().mul(
      -this._body.getMass() * this._sideSlipPercent
    );

    if (impulse.length() > maxLateralImpulse) {
      impulse = impulse.mul(maxLateralImpulse / impulse.length());
    }
    this._body.applyLinearImpulse(impulse, this._body.getWorldCenter());

    // Angular
    this._body.applyAngularImpulse(
      0.1 * this._body.getInertia() * -this._body.getAngularVelocity()
    );

    // Forward linear velocity
    // TODO Implement Brake/Coast logic here
  }

  private updateDrive(): void {
    const forceVector = this._body.getWorldVector(new Vec2(0, -1));
    forceVector.mul(this._forceMagnitude);

    // TODO take into account static friction?
    if (forceVector.lengthSquared() > 0.0005) {
      // Apply the force, simulating the wheel pushing against ground friction
      this._body.applyForce(forceVector, this._body.getWorldCenter(), true);
    }
  }
}
