import { ObjectHandle } from "./ObjectHandle";
import { ISimObjectRef } from "../SimTypes";
import { Sim3D } from "../Sim3D";
import { SimDemoBlock } from "../objects/SimDemoBlock";

export class DemoBlockHandle extends ObjectHandle {
  protected _demoBlockObj: SimDemoBlock;

  constructor(ref: ISimObjectRef, sim: Sim3D) {
    super(ref, sim);

    // Cast to the object type we expect
    this._demoBlockObj = <SimDemoBlock>this._rootObject;
  }

  applyForce(magnitude: number): void {
    this._demoBlockObj.setForce(magnitude);
  }
}
