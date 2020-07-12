import * as THREE from "three";
import { BodyDef, FixtureDef, Vec2, Box } from "planck-js";
import { IZoneSpec } from "../../../specs/CoreSpecs";
import { SimObject } from "./SimObject";
import { Vector2d } from "../../../SimTypes";

/**
 * Factory method for creating a Zone
 * @param spec
 */
export function makeZone(spec: IZoneSpec): Zone {
  return new Zone(spec);
}

export class Zone extends SimObject {
  private _bodySpecs: BodyDef;
  private _fixtureSpecs: FixtureDef;

  private _zoneId: string;

  constructor(spec: IZoneSpec) {
    super("Zone");

    this._zoneId = spec.zoneId;

    const initialPosition: Vector2d = { x: 0, y: 0 };

    const materialSpecs: THREE.MeshBasicMaterialParameters = {
      side: THREE.DoubleSide,
      transparent: true,
    };

    if (spec.baseColor !== undefined) {
      materialSpecs.color = spec.baseColor;
    }

    if (spec.opacity !== undefined) {
      materialSpecs.opacity = spec.opacity;
    }

    if (spec.initialPosition) {
      initialPosition.x = spec.initialPosition.x;
      initialPosition.y = spec.initialPosition.y;
    }

    const zoneGeom = new THREE.PlaneGeometry(spec.xLength, spec.zLength);
    const zoneMaterial = new THREE.MeshBasicMaterial(materialSpecs);
    const zoneMesh = new THREE.Mesh(zoneGeom, zoneMaterial);

    zoneMesh.position.y = 0;
    zoneMesh.position.x = initialPosition.x;
    zoneMesh.position.z = initialPosition.y;

    // Rotate along the x axis
    zoneMesh.rotation.x = Math.PI / 2;

    this._mesh = zoneMesh;

    // Set up the physics body
    this._bodySpecs = {
      type: "static",
      position: new Vec2(initialPosition.x, initialPosition.y),
      angle: 0,
    };

    this._fixtureSpecs = {
      shape: new Box(spec.xLength / 2, spec.zLength / 2),
      isSensor: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;
  }

  getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  getFixtureDef(): FixtureDef {
    return this._fixtureSpecs;
  }

  setColor(color: number): void {
    (<THREE.MeshBasicMaterial>this._mesh.material).color.set(color);
  }

  setOpacity(opacity: number): void {
    (<THREE.MeshBasicMaterial>this._mesh.material).opacity = opacity;
  }

  getZoneId(): string {
    return this._zoneId;
  }
}
