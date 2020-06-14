import * as THREE from "three";
import { SimObject } from "./SimObject";
import { World, Vec2, Circle } from "planck-js";
import { IBallSpec } from "../specs/CoreSpecs";
import { Vector2d } from "../SimTypes";

const DEFAULT_BALL_COLOR = 0x0000ff;

/**
 * Factory method for creating a SimBall
 * @param scene
 * @param world
 * @param spec
 */
export function makeSimBall(
  scene: THREE.Scene,
  world: World,
  spec: IBallSpec
): SimBall {
  return new SimBall(scene, world, spec);
}

export class SimBall extends SimObject {
  constructor(scene: THREE.Scene, world: World, spec: IBallSpec) {
    super("SimBall", scene, world);

    const color = spec.baseColor ? spec.baseColor : DEFAULT_BALL_COLOR;
    const initialPosition: Vector2d = { x: 0, y: 0 };

    const ballGeom = new THREE.SphereGeometry(spec.radius);
    const ballMaterial = new THREE.MeshStandardMaterial({ color });
    const ballMesh = new THREE.Mesh(ballGeom, ballMaterial);

    if (spec.initialPosition) {
      initialPosition.x = spec.initialPosition.x;
      initialPosition.y = spec.initialPosition.y;
    }

    // Set initial starting positions
    ballMesh.position.y = spec.radius; // Ensure the ball is sitting on the field
    ballMesh.position.x = initialPosition.x;
    ballMesh.position.z = initialPosition.y;

    this._mesh = ballMesh;

    // Set up the physics body
    // NOTE: We will need to set sane defaults for physics properties in the event
    // that they are not provided by the spec
    this._body = world.createBody({
      type: spec.isStatic ? "static" : "dynamic",
      position: new Vec2(initialPosition.x, initialPosition.y),
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
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  setBaseColor(color: number): void {
    (<THREE.MeshStandardMaterial>this._mesh.material).color.set(color);
  }
}
