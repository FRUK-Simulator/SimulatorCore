import { Box, Vec2, FixtureDef, BodyDef } from "planck-js";
import { IRobotSpec } from "../../../specs/RobotSpecs";
import { IMechanismSpec } from "../../../specs/RobotSpecs";
import * as THREE from "three";
import { SimObject } from "../../SimObject";
import { getSensorMountPosition } from "../../../utils/RobotUtils";

export class SimGripperJaw extends SimObject {
  private _bodySpecs: BodyDef;
  private _fixtureSpecs: FixtureDef;

  constructor(
    thickness: number,
    depth: number,
    maxOffset: number,
    spec: IMechanismSpec,
    robotSpec: IRobotSpec
  ) {
    super("SimGripperJaw");

    // Get mount positions, mount the jaws forward of the backboard
    const sensorPosition = getSensorMountPosition(robotSpec, spec.mountFace, {
      x: spec.mountOffset.x + maxOffset,
      y: spec.mountOffset.y,
      z: spec.mountOffset.z - depth / 2,
    });

    // Set body, fixure specs
    this._bodySpecs = {
      type: "dynamic", // sensors are always dynamic
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle: 0,
      bullet: true,
    };
    this._fixtureSpecs = {
      shape: new Box(thickness / 2, depth / 2),
      density: 1,
      isSensor: false,
    };

    // Set mesh
    let backboardGeom = new THREE.BoxGeometry(thickness, 0.1, depth);
    this._mesh = new THREE.Mesh(
      backboardGeom,
      new THREE.MeshStandardMaterial({ color: 0x003377 })
    );

    this._mesh.position.y = 0.1;
  }

  public update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  public getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  public getFixtureDef(): FixtureDef {
    return this._fixtureSpecs;
  }
}
