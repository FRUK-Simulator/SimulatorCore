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

  get minRange(): number {
    return this._minRange;
  }

  get maxRange(): number {
    return this._maxRange;
  }

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
    this._value = val;
  }
}
