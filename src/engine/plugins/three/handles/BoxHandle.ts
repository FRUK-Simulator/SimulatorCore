import { ObjectHandle } from "../../../ObjectHandle";
import { SimBox } from "../objects/SimBox";

export class BoxHandle extends ObjectHandle<SimBox> {
  setBaseColor(color: number): void {
    this._rootObject.setBaseColor(color);
  }
}
