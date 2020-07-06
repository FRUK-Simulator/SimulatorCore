import { ObjectHandle } from "../handles/ObjectHandle";
import { Vector3d } from "../SimTypes";

export enum CameraMode {
  POSITION = "POSITION",
  THIRD_PERSON = "THIRD_PERSON",
  ORBIT = "ORBIT",
}

interface ICameraSpec {
  type: string;
}

export interface IPositionCameraSpec extends ICameraSpec {
  type: CameraMode.POSITION;
  position: Vector3d;
}

export interface IThirdPersonCameraSpec extends ICameraSpec {
  type: CameraMode.THIRD_PERSON;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle: ObjectHandle<any>;
  offset?: Vector3d;
}

export interface IOrbitCameraSpec extends ICameraSpec {
  type: CameraMode.ORBIT;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle: ObjectHandle<any>;
  radius: number;
  height: number;
  angularVelocity?: number;
}

export type CameraModeSpec =
  | IPositionCameraSpec
  | IThirdPersonCameraSpec
  | IOrbitCameraSpec;
