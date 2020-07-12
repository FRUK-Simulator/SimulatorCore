import { Vector3d } from "../SimTypes";
import { IWallSpec, IPerimeterSpec } from "../specs/CoreSpecs";

export interface SimulatorConfig {
  defaultWorld: WorldConfig;
}

export interface WorldConfig {
  xLength: number;
  zLength: number;
  walls?: IWallSpec[];
  perimeter?: IPerimeterSpec;

  camera?: {
    position: Vector3d;
  };
}
