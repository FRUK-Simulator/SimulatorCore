import { ObjectHandle } from "./ObjectHandle";
import { SimCone } from "../objects/SimCone";

export class ConeHandle extends ObjectHandle<SimCone> {
  setBaseColor(color: number): void {
    this._rootObject.setBaseColor(color);
  }
}
