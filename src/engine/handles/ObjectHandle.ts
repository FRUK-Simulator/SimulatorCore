import { SimObject } from "../objects/SimObject";
import { ISimObjectRef } from "../SimTypes";
import { Sim3D } from "../Sim3D";

export abstract class ObjectHandle {
  protected _rootObject: SimObject;
  protected _objectRef: ISimObjectRef;
  protected _simulator: Sim3D;

  constructor(ref: ISimObjectRef, sim: Sim3D) {
    this._objectRef = ref;
    this._simulator = sim;

    this._rootObject = sim.getSimObject(ref);
    if (!this._rootObject) {
      throw new Error("Unable to get SimObject");
    }
  }
}
