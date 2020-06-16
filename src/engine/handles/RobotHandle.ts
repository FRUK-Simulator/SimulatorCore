import { ObjectHandle } from "./ObjectHandle";
import { SimRobot } from "../objects/robot/SimRobot";

export class RobotHandle extends ObjectHandle<SimRobot> {
  setMotorPower(channel: number, value: number): void {
    this._rootObject.setMotorPower(channel, value);
  }

  getDigitalInput(channel: number): boolean {
    return this._rootObject.getDigitalInput(channel);
  }
}
