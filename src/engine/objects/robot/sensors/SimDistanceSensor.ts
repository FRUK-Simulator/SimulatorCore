import * as THREE from "three";
import { SimBasicSensor } from "./SimBasicSensor";
import {
  IDistanceSensorSpec,
  IRobotSpec,
  BasicSensorOutputChannelType,
  IBasicSensorValue,
  SensorMountingFace,
} from "../../../specs/RobotSpecs";
import { ISensorFixtureUserData } from "../../../specs/UserDataSpecs";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import { Vec2, Box, Fixture } from "planck-js";
import { EntityCategory, EntityMask } from "../RobotCollisionConstants";

/**
 * Simulated Distance Sensor
 *
 * This is a {@link SimBasicSensor} that returns a numeric value, representing
 * a voltage percentage to the distance that it has measured. A percentage is
 * returned so that multiple use cases can be supported (i.e. "robots" running
 * at different voltages).
 *
 * Simply put, the sensor return represents a percentage of V<sub>ref</sub>, the
 * reference voltage that a robot controller (in real life) uses for analog inputs.
 *
 * As part of the {@link IDistanceSensorSpec | spec}, a `maxRange` must be specified.
 * Optionally, a `minRange` can be provided as well. The ranges represent the valid
 * distances in which an object can be detected by the sensor. Anything falling under
 * the minimum range will register as 0%, and anything outside of detection range
 * will register at 100%.
 */
export class SimDistanceSensor extends SimBasicSensor {
  private _minRange = 0;
  private _maxRange = 0;
  private _detectAngle = 0;

  private _timeSinceLastUpdateMs = 0;

  constructor(
    spec: IDistanceSensorSpec,
    robotGuid: string,
    robotSpec: IRobotSpec
  ) {
    super(
      "DistanceSensor",
      BasicSensorOutputChannelType.ANALOG,
      robotGuid,
      spec
    );

    this._minRange = spec.minRange || 0;
    this._maxRange = spec.maxRange;
    this._detectAngle = spec.detectionAngle || 0;

    const sensorPosition = getSensorMountPosition(
      robotSpec,
      spec.mountFace,
      spec.mountOffset
    );

    const sensorGeom = new THREE.BoxGeometry(0.01, 0.01, 0.01);
    const sensorMaterial = new THREE.MeshBasicMaterial({
      color: 0x0,
      transparent: true,
      opacity: 0,
    });
    const sensorMesh = new THREE.Mesh(sensorGeom, sensorMaterial);
    this._mesh = sensorMesh;

    let angle: number;
    switch (spec.mountFace) {
      case SensorMountingFace.FRONT:
        angle = -Math.PI;
        break;
      case SensorMountingFace.REAR:
        angle = 0;
        break;
      case SensorMountingFace.LEFT:
        angle = -Math.PI / 2;
        break;
      case SensorMountingFace.RIGHT:
        angle = Math.PI / 2;
        break;
    }

    this._bodySpecs = {
      type: "dynamic",
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle,
      bullet: true,
    };

    const userData: ISensorFixtureUserData = {
      selfGuid: this.guid,
      rootGuid: robotGuid,
      type: "sensor",
      sensor: {
        sensorType: this.sensorType,
        robotGuid: robotGuid,
        sensorIdent: this.identifier,
      },
    };

    this._fixtureSpecs = {
      shape: new Box(0.005, 0.005),
      density: 1,
      isSensor: true,
      userData,
      filterCategoryBits: EntityCategory.ROBOT_PART,
      filterMaskBits: EntityMask.ROBOT_PART,
    };
  }

  /**
   * Minimum range that this sensor supports (defaults to 0)
   */
  get minRange(): number {
    return this._minRange;
  }

  /**
   * Maximum range that this sensor supports
   */
  get maxRange(): number {
    return this._maxRange;
  }

  /**
   * Total angle coverage of the detection cone
   */
  get detectionAngle(): number {
    return this._detectAngle;
  }

  /**
   * Sensor output
   *
   * This value represents the percentage of V<sub>ref</sub> corresponding
   * to the distance detected
   */
  get value(): number {
    const pct =
      (this.getDistance() - this.minRange) / (this.maxRange - this.minRange);
    return pct;
  }

  private getDistance(): number {
    let result = 0;

    const sensorAngle = -this._body.getAngle();
    const bodyCenter = this._body.getWorldCenter();

    // Set up min/max points
    const p1 = new Vec2(
      bodyCenter.x + Math.sin(sensorAngle) * this.minRange,
      bodyCenter.y + Math.cos(sensorAngle) * this.minRange
    );

    // TODO Implement cone of detection here
    const p2 = new Vec2(
      bodyCenter.x + Math.sin(sensorAngle) * this.maxRange,
      bodyCenter.y + Math.cos(sensorAngle) * this.maxRange
    );

    const detectionRange = this.maxRange - this.minRange;

    this._body
      .getWorld()
      .rayCast(
        p1,
        p2,
        (fixture: Fixture, p: Vec2, normal: Vec2, fraction: number): number => {
          //Distance sensor rays collide with things the robot collides with...
          if (!(fixture.m_filterCategoryBits & EntityMask.SENSORS)) {
            // by returning -1 we ignore this collision and continue.
            return -1;
          }

          // Set the result to be the current reading
          result = fraction * detectionRange;

          // TODO(jp) add debug mode to sensors.
          if (false) {
            console.debug(
              "Ray cast hit object",
              fixture.getUserData(),
              p1,
              p2,
              p
            );
          }

          // by returning 0 we end the raycast.
          return 0.0;
        }
      );

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(dtS: number): void {
    const bodyCenter = this._body.getWorldCenter();
    const sensorAngle = -this._body.getAngle();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = sensorAngle;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSensorEvent(val: IBasicSensorValue): void {
    // no-op
    // We handle all sensor events synchronously within ourselves
  }
}
