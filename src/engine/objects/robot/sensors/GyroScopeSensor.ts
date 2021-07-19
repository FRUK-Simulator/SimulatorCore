import * as THREE from "three";
import { SimBasicSensor } from "./SimBasicSensor";
import {
  IRobotSpec,
  BasicSensorOutputChannelType,
  IBasicSensorValue,
  SensorMountingFace,
  IGyroscopeSpec,
} from "../../../specs/RobotSpecs";
import { ISensorFixtureUserData } from "../../../specs/UserDataSpecs";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import { Vec2, Box } from "planck-js";
import { EntityCategory, EntityMask } from "../RobotCollisionConstants";

// A Gyroscope sensor to obtain the robot's angle (in world coordinates)
export class GyroscopeSensor extends SimBasicSensor {
  constructor(spec: IGyroscopeSpec, robotGuid: string, robotSpec: IRobotSpec) {
    super(
      "GyroscopeSensor",
      BasicSensorOutputChannelType.ANALOG,
      robotGuid,
      spec
    );

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
   * Sensor output
   *
   * Get world rotation angle in degrees.
   */
  get value(): number {
    return this._body.getAngle() * (180 / Math.PI);
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
