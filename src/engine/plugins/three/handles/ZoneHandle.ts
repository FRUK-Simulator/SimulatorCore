import { ObjectHandle } from "../../../ObjectHandle";
import { Zone } from "../objects/Zone";

export class ZoneHandle extends ObjectHandle<Zone> {
  setColor(color: number): void {
    this._rootObject.setColor(color);
  }

  setOpacity(opacity: number): void {
    this._rootObject.setOpacity(opacity);
  }

  getZoneId(): string {
    return this._rootObject.getZoneId();
  }
}
