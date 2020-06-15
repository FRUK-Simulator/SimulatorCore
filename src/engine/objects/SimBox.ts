import * as THREE from "three";
import { SimObject } from "./SimObject";
import { World, Box, Vec2 } from "planck-js";
import { IBoxSpec } from "../specs/CoreSpecs";
import { Vector2d } from "../SimTypes";

const DEFAULT_BOX_COLOR = 0xff00ff;

/**
 * Factory method for creating a SimBox
 * @param scene
 * @param world
 * @param spec
 */
export function makeSimBox(
  scene: THREE.Scene,
  world: World,
  spec: IBoxSpec
): SimBox {
  return new SimBox(scene, world, spec);
}

export class SimBox extends SimObject {
  constructor(scene: THREE.Scene, world: World, spec: IBoxSpec) {
    super("SimBox", scene, world);

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
    this._body = world.createBody({
      type: spec.isStatic ? "static" : "dynamic",
      position: new Vec2(initialPosition.x, initialPosition.y),
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
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  setBaseColor(color: number): void {
    (<THREE.MeshStandardMaterial>this._mesh.material).color.set(color);
  }
}
