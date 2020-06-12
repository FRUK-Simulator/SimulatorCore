import * as THREE from "three";
import { SimObject } from "./SimObject";
import { Vector2d } from "../SimTypes";
import { World, Vec2, Circle } from "planck-js";

export interface ISimBallSpec {
  static: boolean;
  radius: number;
  startingPosition: Vector2d;
  color?: number;
}

export class SimBall extends SimObject {
  constructor(scene: THREE.Scene, world: World, spec: ISimBallSpec) {
    super("SimBall", scene, world);

    const color = spec.color !== undefined ? spec.color : 0x0000ff;

    const meshGeom = new THREE.SphereGeometry(spec.radius);
    const ballMaterial = new THREE.MeshStandardMaterial({ color });
    const ballMesh = new THREE.Mesh(meshGeom, ballMaterial);

    ballMesh.position.y = spec.radius;
    ballMesh.position.x = spec.startingPosition.x;
    ballMesh.position.z = spec.startingPosition.y;

    this._mesh = ballMesh;

    this._body = world.createBody({
      type: spec.static ? "static" : "dynamic",
      position: new Vec2(spec.startingPosition.x, spec.startingPosition.y),
      angle: 0,
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    });

    this._body.createFixture({
      shape: new Circle(spec.radius),
      density: 1,
      isSensor: false,
      friction: 0.3,
      restitution: 0.4,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    // TODO this can all move into a function on SimObject
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }
}
