import * as THREE from "three";

import { SimBasicSensor } from "./SimBasicSensor";
import {
  IContactSensorSpec,
  BasicSensorOutputChannelType,
  IRobotSpec,
  SensorMountingFace,
  ISimUserData,
} from "../../../specs/RobotSpecs";
import { Body, World, Vec2, Box } from "planck-js";
import { getSensorMountPosition } from "../../../utils/RobotUtils";

const SENSOR_INACTIVE_COLOR: number = 0xaaaaaa;
const SENSOR_ACTIVE_COLOR: number = 0xff0000;

export class SimContactSensor extends SimBasicSensor {
  constructor(
    spec: IContactSensorSpec,
    robotGuid: string,
    robotSpec: IRobotSpec
  ) {
    super("ContactSensor", BasicSensorOutputChannelType.DIGITAL, spec);
    const render = !!spec.render;

    // Get mount positions
    const sensorPosition = getSensorMountPosition(
      robotSpec,
      spec.mountFace,
      spec.mountOffset
    );

    let sensorDimensionX = 0;
    let sensorDimensionY = 0.05; // Arbitrary
    let sensorDimensionZ = 0;

    switch (spec.mountFace) {
      case SensorMountingFace.LEFT:
      case SensorMountingFace.RIGHT:
        sensorDimensionX = spec.range;
        sensorDimensionZ = spec.width;
        break;
      case SensorMountingFace.FRONT:
      case SensorMountingFace.REAR:
        sensorDimensionX = spec.width;
        sensorDimensionZ = spec.range;
        break;
    }

    // Create the mesh
    const sensorGeom = new THREE.BoxGeometry(
      sensorDimensionX,
      sensorDimensionY,
      sensorDimensionZ
    );
    const sensorMaterial = new THREE.MeshStandardMaterial({
      color: SENSOR_INACTIVE_COLOR,
    });

    sensorMaterial.transparent = !render;
    sensorMaterial.opacity = render ? 1 : 0;

    const sensorMesh = new THREE.Mesh(sensorGeom, sensorMaterial);

    sensorMesh.position.x = sensorPosition.x;
    sensorMesh.position.y = sensorPosition.y;
    sensorMesh.position.z = sensorPosition.z;

    this._mesh = sensorMesh;

    // Set up the body and fixture
    this._bodySpecs = {
      type: "dynamic", // sensors are always dynamic
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle: 0,
    };

    const userData: ISimUserData = {
      sensor: {
        sensorType: this.sensorType,
        robotGuid: robotGuid,
        sensorIdent: this.identifier,
      },
    };

    this._fixtureSpecs = {
      shape: new Box(sensorDimensionX / 2, sensorDimensionZ / 2),
      density: 1,
      isSensor: true,
      userData: userData,
    };
  }

  update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }
}
