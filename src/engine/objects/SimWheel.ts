import * as THREE from "three";
import { SimObject } from "./SimObject";
import { World, Vec2, Box } from "planck-js";
import { Vector3d } from "../SimTypes";
import { IWheelMountSpec } from "./MountPoints";

export interface ISimWheelSpec {
  radius: number;
  thickness: number;
  mountPosition: IWheelMountSpec;
  angleRad?: number; // Used for things like mecanum wheels which have 45 deg offsets
  sideSlip?: number;
}

export class SimWheel extends SimObject {
  protected _forceMag = 0;

  constructor(
    scene: THREE.Scene,
    world: World,
    spec: ISimWheelSpec,
    defaultPosition?: Vector3d
  ) {
    super("SimWheel", scene, world);

    const color = 0x000000;
    const wheelGeom = new THREE.CylinderGeometry(
      spec.radius,
      spec.radius,
      spec.thickness
    );
    const wheelMaterial = new THREE.MeshStandardMaterial({ color });
    const wheelMesh = new THREE.Mesh(wheelGeom, wheelMaterial);

    // rotate Pi/2 around Z axis to get it vertical/
    wheelMesh.rotation.z = Math.PI / 2;

    // move `radius` in Y to get it flat on the ground
    // wheelMesh.position.y = spec.radius; // TODO Fix?

    const bodyPos: Vec2 = new Vec2(0, 0);

    if (defaultPosition !== undefined) {
      wheelMesh.position.x = defaultPosition.x;
      wheelMesh.position.y = defaultPosition.y;
      wheelMesh.position.z = defaultPosition.z;
      bodyPos.x = defaultPosition.x;
      bodyPos.y = defaultPosition.z;
    }

    this._mesh = wheelMesh;

    this._body = world.createBody({
      type: "dynamic",
      position: bodyPos,
      angle: 0,
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    });

    this._body.createFixture({
      shape: new Box(spec.thickness / 2, spec.radius),
      density: 1,
      isSensor: false,
      friction: 0.3,
      restitution: 0.4,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const force = this._body.getWorldVector(new Vec2(0, 1));
    force.mul(this._forceMag);

    const bodyCenter = this._body.getWorldCenter();

    this._body.applyForce(force, bodyCenter);
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  setForce(force: number): void {
    this._forceMag = force;
  }
}
