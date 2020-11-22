import {
  IBasicSensorValue,
  BasicSensorOutputChannelType,
  IMechanismProxySensorSpec,
} from "../../../specs/RobotSpecs";
import { SimBasicSensor } from "./SimBasicSensor";

/**
 * Simulated Sensor on mechanism
 *
 * This is a {@link SimBasicSensor} which is part of a mechanism.
 *
 * This sensor is not inteneded to be added to the robot itself, but is instead added as a side
 * effect of adding the mechanism to the robot.
 *
 * When this sensor object is read from, it forwards the request to the mechanism which answers for it.
 *
 * This is abstracted away from the robot interface which is able to read values from the robot.
 *
 */

export class MechanismProxySensor extends SimBasicSensor {
  private _getValueCallback: () => number;

  constructor(spec: IMechanismProxySensorSpec, robotGuid: string) {
    super(
      "MechanismProxySensor",
      BasicSensorOutputChannelType.DIGITAL,
      robotGuid,
      spec
    );
    this._getValueCallback = spec.getValueCallback;
  }

  // eslint-disable-next-line -- ignore empty function
  onSensorEvent(val: IBasicSensorValue): void {}

  // eslint-disable-next-line -- ignore empty function
  public update(ms: number): void {}

  get value(): number {
    return this._getValueCallback();
  }
}
