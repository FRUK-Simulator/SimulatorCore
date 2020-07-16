import * as BABYLON from "babylonjs";
import { IBallSpec } from "./../../../specs/CoreSpecs";

const DEFAULT_BALL_COLOR = 0x0000ff;

export function makeSimBall(
  spec: IBallSpec,
  scene: BABYLON.Scene
): BABYLON.Mesh {
  const color = spec.baseColor ? spec.baseColor : DEFAULT_BALL_COLOR;

  let ball = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { segments: 16, diameter: 2 * spec.radius },
    scene
  );

  ball.position.x = spec.initialPosition.x;
  ball.position.y = 1.5 * spec.radius;
  ball.position.z = spec.initialPosition.y;
  let material = new BABYLON.StandardMaterial("ballMaterial", scene);
  material.diffuseColor = new BABYLON.Color3(
    color & 0xff0000,
    color & 0x00ff00,
    color & 0x0000ff
  );
  ball.material = material;

  ball.physicsImpostor = new BABYLON.PhysicsImpostor(
    ball,
    BABYLON.PhysicsImpostor.BoxImpostor,
    {
      mass: spec.physicsProperties.density,
      restitution: spec.physicsProperties.restitution,
    },
    scene
  );

  return ball;
}
