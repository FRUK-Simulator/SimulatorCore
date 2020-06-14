import { ObjectHandle } from "./ObjectHandle";
import { SimBall } from "../objects/SimBall";

export class BallHandle extends ObjectHandle<SimBall> {
  setBaseColor(color: number): void {
    this._rootObject.setBaseColor(color);
  }
}
