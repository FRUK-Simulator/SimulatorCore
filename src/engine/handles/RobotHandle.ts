import { ObjectHandle } from "./ObjectHandle";
import { SimRobot } from "../objects/SimRobot";
import { ISimObjectRef } from "../SimTypes";
import { Sim3D } from "../Sim3D";

export class RobotHandle extends ObjectHandle {
  protected _robotObj: SimRobot;

  constructor(ref: ISimObjectRef, sim: Sim3D) {
    super(ref, sim);

    this._robotObj = <SimRobot>this._rootObject;
  }

  setMotorPower(channel: number, value: number): void {
    this._robotObj.setMotorPower(channel, value);
  }
}
