import { Vector3d } from "./SimTypes";
import { IPerimeterSpec } from "./specs/CoreSpecs";

export interface SimulatorConfig {
  defaultWorld: WorldConfig;
}

export interface WorldConfig {
  xLength: number;
  zLength: number;
  walls?: IPerimeterSpec;

  camera?: {
    position: Vector3d;
  };
}
