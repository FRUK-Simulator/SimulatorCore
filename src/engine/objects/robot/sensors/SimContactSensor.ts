import * as THREE from "three";

import { SimBasicSensor } from "./SimBasicSensor";
import {
  IContactSensorSpec,
  BasicSensorOutputChannelType,
  IRobotSpec,
  SensorMountingFace,
  IBasicSensorValue,
} from "../../../specs/RobotSpecs";
import { ISensorFixtureUserData } from "../../../specs/UserDataSpecs";
import { Vec2, Box } from "planck-js";
import { getSensorMountPosition } from "../../../utils/RobotUtils";

const SENSOR_INACTIVE_COLOR = 0xaaaaaa;
const SENSOR_ACTIVE_COLOR = 0xff0000;

/**
 * Simulated Contact/Touch Sensor
 *
 * This is a {@link SimBasicSensor} that returns a binary value, representing
 * whether or not it has been triggered. Contact sensors are usually short range
 * and can only tell if something is in range or not.
 *
 * As part of the {@link IContactSensorSpec | spec}, a `width` and `range` can be
 * specified. Range represents how far out from its mounting face the sensor can
 * detect. Width represents how wide the sensing area is. This is used to
 * simulate a full width bumper backed by contact sensors, where even though
 * the contact sensor (in real life) is small, the sensing area can be very large.
 *
 * If the `render` flag is passed in the spec, a visual representation of the
 * sensor will be shown on the robot. This visual representation will turn red
 * when it is active (currently touching something).
 */
export class SimContactSensor extends SimBasicSensor {
  constructor(
    spec: IContactSensorSpec,
    robotGuid: string,
    robotSpec: IRobotSpec
  ) {
    super(
      "ContactSensor",
      BasicSensorOutputChannelType.DIGITAL,
      robotGuid,
      spec
    );
    const render = !!spec.render;

    // Get mount positions
    const sensorPosition = getSensorMountPosition(
      robotSpec,
      spec.mountFace,
      spec.mountOffset
    );

    let sensorDimensionX = 0;
    const sensorDimensionY = 0.05; // Arbitrary
    let sensorDimensionZ = 0;

    switch (spec.mountFace) {
      case SensorMountingFace.LEFT:
      case SensorMountingFace.RIGHT:
        sensorDimensionX = spec.range * 2;
        sensorDimensionZ = spec.width;
        break;
      case SensorMountingFace.FRONT:
      case SensorMountingFace.REAR:
        sensorDimensionX = spec.width;
        sensorDimensionZ = spec.range * 2;
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
      shape: new Box(sensorDimensionX / 2, sensorDimensionZ / 2),
      density: 1,
      isSensor: true,
      userData: userData,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const material = <THREE.MeshStandardMaterial>this._mesh.material;
    if (this._value) {
      if (this._value.value > 0.0) {
        material.color.set(SENSOR_ACTIVE_COLOR);
      } else {
        material.color.set(SENSOR_INACTIVE_COLOR);
      }
    }

    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  onSensorEvent(val: IBasicSensorValue): void {
    this.setValue(val);
  }
}
