import { Vector3d } from "../SimTypes";

export enum WheelMountingPoint {
  LEFT_FRONT,
  LEFT_CENTER,
  LEFT_REAR,
  RIGHT_FRONT,
  RIGHT_CENTER,
  RIGHT_REAR,
}

export interface IWheelMountSpec {
  mountPoint: WheelMountingPoint;
  offset?: Vector3d;
}
