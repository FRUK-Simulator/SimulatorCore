import { IRobotHandle } from "./IRobotHandle";
import { IRobotSpec } from "../specs/RobotSpecs";

export interface ISim3D {
  addRobot(robotSpec: IRobotSpec): IRobotHandle;
  beginRendering(): void;
  stopRendering(): void;
  onresize(): void;
}
