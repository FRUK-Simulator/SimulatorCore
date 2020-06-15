import * as THREE from "three";
import { SimObject } from "../../SimObject";
import { World, Vec2, Box } from "planck-js";
import { IRobotWheelSpec } from "../../../specs/RobotSpecs";
import { Vector3d } from "../../../SimTypes";

const DEFAULT_WHEEL_COLOR = 0x000000;
const DEFAULT_WHEEL_THICKNESS = 0.15;

export class SimRobotWheel extends SimObject {
  protected _forceMagnitude = 0;

  constructor(
    scene: THREE.Scene,
    world: World,
    spec: IRobotWheelSpec,
    wheelPos?: Vector3d
  ) {
    super("SimWheel", scene, world);

    const color =
      spec.baseColor !== undefined ? spec.baseColor : DEFAULT_WHEEL_COLOR;
    const thickness =
      spec.thickness !== undefined ? spec.thickness : DEFAULT_WHEEL_THICKNESS;

    const wheelGeom = new THREE.CylinderGeometry(
      spec.radius,
      spec.radius,
      thickness
    );
    const wheelMaterial = new THREE.MeshStandardMaterial({ color });
    const wheelMesh = new THREE.Mesh(wheelGeom, wheelMaterial);

    this._mesh = wheelMesh;

    // rotate Pi/2 around the Z axis to get it vertical
    wheelMesh.rotation.z = Math.PI / 2;

    const bodyPos: Vec2 = new Vec2(0, 0);

    if (wheelPos !== undefined) {
      wheelMesh.position.x = wheelPos.x;
      wheelMesh.position.y = wheelPos.y;
      wheelMesh.position.z = wheelPos.z;

      bodyPos.x = wheelPos.x;
      bodyPos.y = wheelPos.z;
    }

    this._body = world.createBody({
      type: "dynamic", // wheels are always dynamic
      position: bodyPos,
      angle: 0, // TODO implement using info provided in spec
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    });

    this._body.createFixture({
      shape: new Box(thickness / 2, spec.radius),
      density: 1,
      isSensor: false,
      friction: 0.3,
      restitution: 0.4,
      userData: {
        type: "robot-wheel",
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    // Generate a force based on input
    const forceVector = this._body.getWorldVector(new Vec2(0, 1));
    forceVector.mul(this._forceMagnitude);

    const bodyCenter = this._body.getWorldCenter();

    // Apply the force, simulating the wheel pushing against ground friction
    this._body.applyForce(forceVector, bodyCenter);

    // Update the mesh
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  setForce(force: number): void {
    this._forceMagnitude = force;
  }
}
