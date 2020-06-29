import { ISimObjectRef } from "../SimTypes";
import { SimObject } from "../objects/SimObject";
import { HandleRegistry } from "../HandleRegistry";

export abstract class ObjectHandle<T extends SimObject> {
  protected _rootObject: T;
  protected _objectRef: ISimObjectRef;
  protected _isValid: boolean;

  constructor(
    ref: ISimObjectRef,
    rootObject: T,
    handleRegistry: HandleRegistry
  ) {
    this._objectRef = ref;
    this._rootObject = rootObject;
    this._isValid = true;

    // Register ourselves with the handle registry
    handleRegistry.registerHandle(
      this._objectRef.guid,
      this._onInvalidate.bind(this)
    );
  }

  /**
   * Whether or not this handle is currently valid
   */
  get valid(): boolean {
    return this._isValid;
  }

  get ref(): ISimObjectRef {
    return this._objectRef;
  }

  private _onInvalidate(): void {
    // This method will get called when the handle is invalidated
    // Basically we just set all our properties to undefined, and this will
    // automatically throw whenever an external caller tries to invoke
    // methods on the handle
    this._rootObject = undefined;
    this._objectRef = undefined;

    this._isValid = false;
  }
}
