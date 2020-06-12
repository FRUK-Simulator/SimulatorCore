import { Vector3d } from "./SimTypes";
import { ISimWallSpec } from "./objects/SimWall";

export interface SimulatorConfig {
  defaultWorld: WorldConfig;
}

export interface WorldConfig {
  xLength: number;
  zLength: number;
  walls?: ISimWallSpec[];

  camera?: {
    position: Vector3d;
  }
}
