import { ISim3D } from "./interface/ISim3D";
import { SimulatorConfig } from "./interface/SimulatorConfig";
import { createBabylonSim3D } from "./plugins/babylon/Factory";
import { createThreeSim3D } from "./plugins/three/Factory";

export enum SimulatorPlugins {
  THREE,
  BABYLON,
}

export function createSim3D(
  plugin: SimulatorPlugins,
  canvas: HTMLCanvasElement,
  config?: SimulatorConfig
): ISim3D {
  if (plugin == SimulatorPlugins.BABYLON) {
    return createBabylonSim3D(canvas, config);
  } else {
    return createThreeSim3D(canvas, config);
  }
}
