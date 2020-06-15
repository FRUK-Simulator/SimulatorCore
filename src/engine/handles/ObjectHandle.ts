import { ISimObjectRef } from "../SimTypes";
import { SimObject } from "../objects/SimObject";

export abstract class ObjectHandle<T extends SimObject> {
  protected _rootObject: T;
  protected _objectRef: ISimObjectRef;

  constructor(ref: ISimObjectRef, rootObject: T) {
    this._objectRef = ref;
    this._rootObject = rootObject;
  }
}
