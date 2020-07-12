import { ObjectHandle } from "./ObjectHandle";
import { SimPyramid } from "../objects/SimPyramid";

export class PyramidHandle extends ObjectHandle<SimPyramid> {
  setBaseColor(color: number): void {
    this._rootObject.setBaseColor(color);
  }
}
