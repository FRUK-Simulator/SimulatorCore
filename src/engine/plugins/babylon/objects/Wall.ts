import * as BABYLON from "babylonjs";
import { IWallSpec } from "./../../../specs/CoreSpecs";

const DEFAULT_BOX_COLOR = 0xff00ff;

export function makeSimWall(
  spec: IWallSpec,
  scene: BABYLON.Scene
): BABYLON.Mesh {
  const color = spec.baseColor ? spec.baseColor : DEFAULT_BOX_COLOR;

  let width, depth: number;

  if (spec.start.x == spec.end.x) {
    width = spec.thickness;
    depth = spec.start.y - spec.end.y;
  } else {
    width = spec.start.x - spec.end.x;
    depth = spec.thickness;
  }

  let box = BABYLON.MeshBuilder.CreateBox(
    "box",
    { width: width, depth: depth, height: spec.height },
    this.scene
  );

  box.position.x = (spec.start.x + spec.end.x) / 2;
  box.position.y = spec.height / 2;
  box.position.z = (spec.start.y + spec.end.y) / 2;

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
    { mass: 0, restitution: 0 },
    this.scene
  );

  return box;
}
