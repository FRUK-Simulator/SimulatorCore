import {
  SimulatorConfig,
  RobotSpecs,
  RobotBuilder,
  CameraSpecs,
} from "../index";
import { createSim3D } from "../engine/EngineFactory";
import { IRobotSpec } from "../engine/specs/RobotSpecs";
import { ISim3D } from "../engine/interface/ISim3D";
import { Sim3D } from "../engine/plugins/babylon/Sim3D";

let simulator: ISim3D;

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

  //simulator = createSim3D(SimulatorPlugin.BABYLON, canvas, simConfig);
  let simulator: Sim3D = new Sim3D(canvas, simConfig);
  simulator.onresize();
  simulator.beginRendering();

  let robotSpec: IRobotSpec;
  const robot = simulator.addRobot(robotSpec);

  simulator.addBox({
    type: "box",
    baseColor: 0x00ffff,
    dimensions: { x: 2, y: 4, z: 8 },
    physicsProperties: { density: 2 },
    initialPosition: { x: -16, y: -8 },
  });

  simulator.addBox({
    type: "box",
    baseColor: 0xffffff,
    dimensions: { x: 2, y: 4, z: 8 },
    physicsProperties: { density: 2 },
    initialPosition: { x: -8, y: -8 },
  });

  simulator.addBall({
    type: "ball",
    radius: 2,
    physicsProperties: { density: 2 },
    initialPosition: { x: 4, y: 4 },
  });

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
