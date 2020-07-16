import * as BABYLON from "babylonjs";
import { IBoxSpec } from "./../../../specs/CoreSpecs";

const DEFAULT_BOX_COLOR = 0xff00ff;

export function makeSimBox(spec: IBoxSpec, scene: BABYLON.Scene): BABYLON.Mesh {
  const color = spec.baseColor ? spec.baseColor : DEFAULT_BOX_COLOR;

  let box = BABYLON.MeshBuilder.CreateBox(
    "box",
    {
      width: spec.dimensions.x,
      depth: spec.dimensions.y,
      height: spec.dimensions.z,
    },
    this.scene
  );

  box.position.x = spec.initialPosition.x;
  box.position.y = spec.dimensions.z;
  box.position.z = spec.initialPosition.y;

  let material = new BABYLON.StandardMaterial("boxMaterial", this.scene);
  material.diffuseColor = new BABYLON.Color3(
    color & 0xff0000,
    color & 0x00ff00,
    color & 0x0000ff
  );
  box.material = material;
  box.physicsImpostor = new BABYLON.PhysicsImpostor(
    box,
    BABYLON.PhysicsImpostor.BoxImpostor,
    {
      mass: spec.physicsProperties.density,
      restitution: spec.physicsProperties.restitution,
    },
    this.scene
  );

  return box;
}
