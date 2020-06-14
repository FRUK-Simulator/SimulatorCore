import { Vector3d } from "./SimTypes";
import { IWallSpec } from "./specs/CoreSpecs";

export interface SimulatorConfig {
  defaultWorld: WorldConfig;
}

export interface WorldConfig {
  xLength: number;
  zLength: number;
  walls?: IWallSpec[];

  camera?: {
    position: Vector3d;
  };
}
