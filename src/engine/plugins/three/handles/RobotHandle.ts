import { ObjectHandle } from "../../../ObjectHandle";
import { SimRobot } from "../objects/robot/SimRobot";
import { IRobotHandle } from "../../../interface/IRobotHandle";

export class RobotHandle extends ObjectHandle<SimRobot>
  implements IRobotHandle {
  setMotorPower(channel: number, value: number): void {
    this._rootObject.setMotorPower(channel, value);
  }

  getDigitalInput(channel: number): boolean {
    return this._rootObject.getDigitalInput(channel);
  }

  getAnalogInput(channel: number): number {
    return this._rootObject.getAnalogInput(channel);
  }
}
