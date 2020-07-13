import { ISim3D } from "./interface/ISim3D";
import { SimulatorConfig } from "./interface/SimulatorConfig";
import { Sim3D } from "./plugins/three/Sim3D";

export function createThreeSim3D(
  canvas: HTMLCanvasElement,
  config?: SimulatorConfig
): ISim3D {
  return new Sim3D(canvas, config);
}
