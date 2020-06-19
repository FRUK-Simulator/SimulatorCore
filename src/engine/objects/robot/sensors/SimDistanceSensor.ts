import * as THREE from "three";
import { SimBasicSensor } from "./SimBasicSensor";
import {
  IDistanceSensorSpec,
  IRobotSpec,
  BasicSensorOutputChannelType,
  ISimUserData,
  IBasicSensorValue,
  SensorMountingFace,
} from "../../../specs/RobotSpecs";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import { Vec2, Box } from "planck-js";

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

  constructor(
    spec: IDistanceSensorSpec,
    robotGuid: string,
    robotSpec: IRobotSpec
  ) {
    super("DistanceSensor", BasicSensorOutputChannelType.ANALOG, spec);

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
        angle = 0;
        break;
      case SensorMountingFace.REAR:
        angle = Math.PI;
        break;
      case SensorMountingFace.LEFT:
        angle = Math.PI / 2;
        break;
      case SensorMountingFace.RIGHT:
        angle = -Math.PI / 2;
        break;
    }

    this._bodySpecs = {
      type: "dynamic",
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle,
      bullet: true,
    };

    const userData: ISimUserData = {
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
      userData: userData,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  onSensorEvent(val: IBasicSensorValue): void {
    // TODO We can add support for more creative methods of
    // adjusting values (e.g. some Sharp IR sensors have a
    // non-linear response curve)

    // For now, return a straight percentage of range
    const pct = (val.value - this.minRange) / (this.maxRange - this.minRange);
    this._value = {
      value: pct,
    };
  }
}
