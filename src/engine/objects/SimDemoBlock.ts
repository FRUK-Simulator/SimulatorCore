import * as THREE from "three";
import { SimObject } from "./SimObject";
import { World, Vec2, Box } from "planck-js";
import { Scene } from "three";
import { Vector2d, Vector3d } from "../SimTypes";

export interface ISimDemoBlockSpec {
  startingPosition: Vector2d;
  dimensions: Vector3d;
  color?: number;
}

/**
 * Example of a dynamic SimObject that participates in the physics simulation
 */
export class SimDemoBlock extends SimObject {
  protected _forceMag: number;

  constructor(scene: Scene, world: World, spec: ISimDemoBlockSpec) {
    super("SimDemoBlock", scene, world);

    const color = spec.color !== undefined ? spec.color : 0xff0000;
    // DEMO - Simple Box
    const meshGeom = new THREE.BoxGeometry(
      spec.dimensions.x,
      spec.dimensions.y,
      spec.dimensions.z
    );
    const blockMaterial = new THREE.MeshStandardMaterial({ color });
    const blockMesh = new THREE.Mesh(meshGeom, blockMaterial);

    blockMesh.position.x = spec.startingPosition.x;
    blockMesh.position.z = spec.startingPosition.y;
    blockMesh.position.y = spec.dimensions.y / 2;

    this._mesh = blockMesh;

    this._forceMag = 0;

    // Physics
    this._body = world.createBody({
      type: "dynamic",
      position: new Vec2(spec.startingPosition.x, spec.startingPosition.y),
      angle: 0,
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    });

    this._body.createFixture({
      shape: new Box(spec.dimensions.x / 2, spec.dimensions.z / 2),
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
