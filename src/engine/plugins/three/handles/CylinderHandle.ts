import { ObjectHandle } from "./ObjectHandle";
import { SimCylinder } from "../objects/SimCylinder";

export class CylinderHandle extends ObjectHandle<SimCylinder> {
  setBaseColor(color: number): void {
    this._rootObject.setBaseColor(color);
  }
}
