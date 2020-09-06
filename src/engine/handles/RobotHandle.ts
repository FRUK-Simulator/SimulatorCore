import { ObjectHandle } from "./ObjectHandle";
import { SimRobot } from "../objects/robot/SimRobot";

export class RobotHandle extends ObjectHandle<SimRobot> {
  setMotorPower(channel: number, value: number): void {
    this._rootObject.setMotorPower(channel, value);
  }

  getDigitalInput(channel: number): boolean {
    return this._rootObject.getDigitalInput(channel);
  }

  getAnalogInput(channel: number): number {
    return this._rootObject.getAnalogInput(channel);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getComplexSensorValue(channel: number, sensorType: string): any {
    return this._rootObject.getComplexSensorValue(channel, sensorType);
  }
}
