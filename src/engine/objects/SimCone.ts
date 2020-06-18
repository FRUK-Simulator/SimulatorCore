import * as THREE from "three";
import { SimObject } from "./SimObject";
import { Vec2, Circle } from "planck-js";
import { IConeSpec } from "../specs/CoreSpecs";
import { Vector2d } from "../SimTypes";
import { FixtureDef } from "planck-js";
import { BodyDef } from "planck-js";

const DEFAULT_CONE_COLOR = 0xffff00;

/**
 * Factory method for creating a SimCone
 * @param spec
 */
export function makeSimCone(spec: IConeSpec): SimCone {
  return new SimCone(spec);
}

export class SimCone extends SimObject {
  private bodySpecs: BodyDef;
  private fixtureSpecs: FixtureDef;

  constructor(spec: IConeSpec) {
    super("SimCone");

    const color = spec.baseColor ? spec.baseColor : DEFAULT_CONE_COLOR;
    const initialPosition: Vector2d = { x: 0, y: 0 };

    const coneGeom = new THREE.ConeGeometry(spec.radius, spec.height, 32);
    const coneMaterial = new THREE.MeshStandardMaterial({ color });
    const coneMesh = new THREE.Mesh(coneGeom, coneMaterial);

    if (spec.initialPosition) {
      initialPosition.x = spec.initialPosition.x;
      initialPosition.y = spec.initialPosition.y;
    }

    // Set initial starting positions
    coneMesh.position.y = spec.radius; // Ensure the cone is sitting on the field
    coneMesh.position.x = initialPosition.x;
    coneMesh.position.z = initialPosition.y;

    this._mesh = coneMesh;

    // Set up the physics body
    // NOTE: We will need to set sane defaults for physics properties in the event
    // that they are not provided by the spec
    this.bodySpecs = {
      type: spec.isStatic ? "static" : "dynamic",
      position: new Vec2(initialPosition.x, initialPosition.y),
      angle: 0,
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    };

    this.fixtureSpecs = {
      shape: new Circle(spec.radius),
      density: 1,
      isSensor: false,
      friction: 0.3,
      restitution: 0.4,
    };
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

  getBodySpecs(): BodyDef {
    return this.bodySpecs;
  }

  getFixtureDef(): FixtureDef {
    return this.fixtureSpecs;
  }
}
