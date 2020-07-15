import {
  SimulatorConfig,
  RobotSpecs,
  RobotBuilder,
  CameraSpecs,
} from "../index";
import { Sim3D } from "../engine/plugins/babylon/Sim3D";
import { IRobotSpec } from "../engine/specs/RobotSpecs";

let simulator: Sim3D;

const simConfig: SimulatorConfig = {
  defaultWorld: {
    xLength: 6,
    zLength: 6,
    perimeter: { height: 1, thickness: 0.3 },

    camera: {
      position: {
        x: 0,
        y: 2,
        z: 2,
      },
    },
  },
};

window.onload = main;
window.onresize = () => {
  if (simulator) {
    simulator.onresize();
  }
};

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("demo2");

  simulator = new Sim3D(canvas, simConfig);
  simulator.onresize();
  simulator.beginRendering();
  let robotSpec: IRobotSpec;
  const robot = simulator.addRobot(robotSpec);
  simulator.addBox();

  enum RobotMode {
    LOOKING,
    RUN_AWAY,
  }

  let currMode = RobotMode.LOOKING;
  let switchTime = 0;

  setInterval(() => {
    switch (currMode) {
      case RobotMode.LOOKING:
        robot.setMotorPower(0, 5);
        robot.setMotorPower(1, 5);

        if (Date.now() - switchTime > 5000) {
          switchTime = Date.now();
          currMode = RobotMode.RUN_AWAY;
        }
        break;
      case RobotMode.RUN_AWAY:
        robot.setMotorPower(0, -3);
        robot.setMotorPower(1, -5);

        if (Date.now() - switchTime > 5000) {
          switchTime = Date.now();
          currMode = RobotMode.LOOKING;
        }
        break;
    }
  }, 100);
}
