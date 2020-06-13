import { ObjectHandle } from "./ObjectHandle";
import { SimBall } from "../objects/SimBall";
import { ISimObjectRef } from "../SimTypes";
import { Sim3D } from "../Sim3D";

export class BallHandle extends ObjectHandle {
  protected _ballObj: SimBall;

  constructor(ref: ISimObjectRef, sim: Sim3D) {
    super(ref, sim);

    this._ballObj = <SimBall>this._rootObject;
  }
}
