import { Vector3d } from "./SimTypes";

export interface SimulatorConfig {
    defaultWorld: WorldConfig;
}

export interface WorldConfig {
    xLength: number;
    zLength: number;
    includeWalls: boolean;

    camera?: {
        position: Vector3d;
    }
}
