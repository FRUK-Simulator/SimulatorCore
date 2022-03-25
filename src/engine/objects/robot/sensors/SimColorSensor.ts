import * as THREE from "three";

import { SimComplexSensor } from "./SimComplexSensor";
import {
  IColorSensorSpec,
  IRobotSpec,
  IComplexSensorValue,
  SensorMountingFace,
} from "../../../specs/RobotSpecs";
import { ISensorFixtureUserData } from "../../../specs/UserDataSpecs";
import { Vec2, Box } from "planck-js";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import { EntityCategory, EntityMask } from "../RobotCollisionConstants";

/**
 * Simulated Color Sensor
 *
 * This is a {@link SimComplexSensor} that returns a JS object, representing
 * the color detected as { red: <number>, green: <number>, blue: <number> }.
 *
 * As part of the {@link IColorSensorSpec | spec}, a `width` and `range` can be
 * specified. Range is optional and represents how far out from its mounting face
 * the sensor can detect when mounted on the FRONT/BACK/LEFT/RIGHT faces.
 * Width represents how wide the sensing area is.
 *
 * If the `render` flag is passed in the spec, a visual representation of the
 * sensor will be shown on the robot. This visual representation will turn red
 * when it is active (currently touching something).
 */
export class SimColorSensor extends SimComplexSensor {
  constructor(
    spec: IColorSensorSpec,
    robotGuid: string,
    robotSpec: IRobotSpec
  ) {
    super("ColorSensor", robotGuid, spec);
    console.log("Creating the color sensor");

    const sensorPosition = getSensorMountPosition(
      robotSpec,
      SensorMountingFace.BOTTOM,
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

    sensorMesh.position.x = sensorPosition.x;
    sensorMesh.position.y = sensorPosition.y;
    sensorMesh.position.z = sensorPosition.z;

    this._mesh = sensorMesh;

    this._bodySpecs = {
      type: "dynamic",
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
      shape: new Box(0.005, 0.005),
      density: 1,
      isSensor: true,
      userData,
      filterCategoryBits: EntityCategory.ROBOT_PART,
      filterMaskBits: EntityMask.SENSORS,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  onSensorEvent(val: IComplexSensorValue): void {
    console.log(`Setting color sensor value ${JSON.stringify(val)}`);
    this.setValue(val);
  }
}
