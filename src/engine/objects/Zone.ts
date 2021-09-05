import * as THREE from "three";
import { BodyDef, FixtureDef, Vec2, Box, Polygon } from "planck-js";
import {
  IZoneSpec,
  IRectangleZoneSpec,
  IEllipseZoneSpec,
  IPolygonZoneSpec,
} from "../specs/CoreSpecs";
import { SimObject } from "./SimObject";
import { Vector2d } from "../SimTypes";
import { IZoneFixtureUserData } from "../specs/UserDataSpecs";
import { EntityCategory, EntityMask } from "./robot/RobotCollisionConstants";

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

    const zoneMaterial = new THREE.MeshBasicMaterial(materialSpecs);

    let fixtureShape;
    let zoneMesh;

    if (spec.zoneShape.type == "rectangle") {
      const zoneShape = spec.zoneShape as IRectangleZoneSpec;
      const zoneGeom = new THREE.PlaneGeometry(
        zoneShape.xLength,
        zoneShape.zLength
      );
      zoneMesh = new THREE.Mesh(zoneGeom, zoneMaterial);

      fixtureShape = new Box(zoneShape.xLength / 2, zoneShape.zLength / 2);
    } else if (spec.zoneShape.type == "ellipse") {
      const zoneShape = spec.zoneShape as IEllipseZoneSpec;
      const xRadius = zoneShape.xRadius;
      const yRadius = zoneShape.zRadius;

      const shape = new THREE.Shape().ellipse(
        initialPosition.x,
        initialPosition.y,
        xRadius,
        yRadius,
        0,
        2 * Math.PI,
        false,
        0
      );

      const zoneGeom = new THREE.ShapeBufferGeometry(shape);
      zoneMesh = new THREE.Mesh(zoneGeom, zoneMaterial);

      fixtureShape = new Box(zoneShape.xRadius, zoneShape.zRadius);
    } else if (spec.zoneShape.type == "polygon") {
      const zoneShape = spec.zoneShape as IPolygonZoneSpec;
      const shapePoints = [];
      const fixturePoints = [];

      for (let i = 0; i < zoneShape.points.length; i++) {
        const point = new THREE.Vector2(
          zoneShape.points[i].x,
          zoneShape.points[i].y
        );
        shapePoints.push(point);

        const fixPoint = new Vec2(zoneShape.points[i].x, zoneShape.points[i].y);
        fixturePoints.push(fixPoint);
      }

      const shape = new THREE.Shape(shapePoints);
      const zoneGeom = new THREE.ShapeBufferGeometry(shape);
      zoneMesh = new THREE.Mesh(zoneGeom, zoneMaterial);

      fixtureShape = new Polygon(fixturePoints);
    } else {
      console.warn("Some type of zone must be specified");
    }

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

    const userData: IZoneFixtureUserData = {
      selfGuid: this.guid,
      type: "zone",
      id: this._zoneId,
      zone: {
        color: spec.baseColor,
      },
    };

    this._fixtureSpecs = {
      shape: fixtureShape,
      isSensor: true,
      userData,
      filterCategoryBits: EntityCategory.ZONES,
      filterMaskBits: EntityMask.ZONES,
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
