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
import { get_next_zone_render_order } from "../utils/RenderOrderConstants";
import { ShapeUtils } from "three";

/**
 * Factory method for creating a Zone
 * @param spec
 */
export function makeZone(spec: IZoneSpec): Zone {
  return new Zone(spec);
}

export class Zone extends SimObject {
  private _bodySpecs: BodyDef;
  private _fixtureSpecs: FixtureDef[];

  private _zoneId: string;

  constructor(spec: IZoneSpec) {
    super("Zone");

    this._zoneId = spec.zoneId;
    this._fixtureSpecs = [];

    const initialPosition: Vector2d = { x: 0, y: 0 };

    const materialSpecs: THREE.MeshBasicMaterialParameters = {
      side: THREE.DoubleSide,
      transparent: false,
      depthTest: false, // This allows us to draw zones on the same vertical plane without z fighting
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

    // eslint-disable-next-line prefer-const
    let fixtureShapes = [];
    let zoneMesh;

    if (spec.zoneShape.type == "rectangle") {
      const zoneShape = spec.zoneShape as IRectangleZoneSpec;
      const zoneGeom = new THREE.PlaneGeometry(
        zoneShape.xLength,
        zoneShape.zLength
      );
      zoneMesh = new THREE.Mesh(zoneGeom, zoneMaterial);
      fixtureShapes.push(new Box(zoneShape.xLength / 2, zoneShape.zLength / 2));
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

      fixtureShapes.push(new Box(zoneShape.xRadius, zoneShape.zRadius));
    } else if (spec.zoneShape.type == "polygon") {
      const zoneShape = spec.zoneShape as IPolygonZoneSpec;
      const shapePoints: THREE.Vector2[] = [];

      // We need to transform the zone's Vector2d points into THREE.Vector2 points.
      zoneShape.points.forEach((vector2dPoint) => {
        const point = new THREE.Vector2(
          vector2dPoint.x + initialPosition.x,
          vector2dPoint.y + initialPosition.y
        );
        shapePoints.push(point);
      });

      const triangles = ShapeUtils.triangulateShape(shapePoints, []);

      triangles.forEach((triangle) => {
        const point1 = shapePoints[triangle[0]];
        const point2 = shapePoints[triangle[1]];
        const point3 = shapePoints[triangle[2]];

        // We now need to use planck's Vec2.
        const fixPoint1 = new Vec2(point1.x, point1.y);
        const fixPoint2 = new Vec2(point2.x, point2.y);
        const fixPoint3 = new Vec2(point3.x, point3.y);

        fixtureShapes.push(new Polygon([fixPoint1, fixPoint2, fixPoint3]));
      });

      const shape = new THREE.Shape(shapePoints);
      const zoneGeom = new THREE.ShapeBufferGeometry(shape);
      zoneMesh = new THREE.Mesh(zoneGeom, zoneMaterial);
    } else {
      console.warn("Some type of zone must be specified");
    }

    // Draw this zone on top of previous zones.
    zoneMesh.renderOrder = get_next_zone_render_order();

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
        order: zoneMesh.renderOrder,
      },
    };

    fixtureShapes.forEach((fixtureShape) => {
      this._fixtureSpecs.push({
        shape: fixtureShape,
        isSensor: true,
        userData,
        filterCategoryBits: EntityCategory.ZONES,
        filterMaskBits: EntityMask.ZONES,
      });
    });
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

  getFixtureDefs(): FixtureDef[] {
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
