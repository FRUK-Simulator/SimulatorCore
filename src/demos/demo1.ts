import { Sim3D } from "../engine/Sim3D";
import { IBallSpec, IBoxSpec } from "../engine/specs/CoreSpecs";
import { SimulatorConfig } from "../engine/SimulatorConfig";
import { BallHandle } from "../engine/handles/BallHandle";
import {
  IRobotSpec,
  WheelMountingPoint,
  SensorMountingFace,
} from "..//engine/specs/RobotSpecs";
import { RobotHandle } from "../engine/handles/RobotHandle";

let simulator: Sim3D;

const simConfig: SimulatorConfig = {
  defaultWorld: {
    xLength: 10,
    zLength: 20,
    walls: [],

    camera: {
      position: {
        x: 0,
        y: 4,
        z: 12,
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
  const canvas = <HTMLCanvasElement>document.getElementById("demo1");

  simulator = new Sim3D(canvas, simConfig);
  simulator.onresize();
  simulator.beginRendering();

  const ballSpec: IBallSpec = {
    type: "ball",
    radius: 1,
    initialPosition: { x: 2, y: 2 },
  };
  simulator.addGameObject(ballSpec);

  const box1Spec: IBoxSpec = {
    type: "box",
    dimensions: {
      x: 1,
      y: 1,
      z: 1,
    },
    initialPosition: {
      x: 0,
      y: 5,
    },
  };
  const box1spec = simulator.addGameObject(box1Spec);
  const box1 = new BallHandle(box1spec, simulator);

  let switchColor = false;
  setInterval(() => {
    switchColor = !switchColor;
    if (switchColor) {
      box1.setBaseColor(0xff0000);
    } else {
      box1.setBaseColor(0xff00ff);
    }
  }, 2000);

  const robotSpec: IRobotSpec = {
    type: "robot",
    dimensions: { x: 2, y: 1, z: 3 },
    basicSensors: [
      {
        type: "contact-sensor",
        width: 0.25,
        range: 0.05,
        channel: 0,
        mountFace: SensorMountingFace.FRONT,
      },
    ],
    drivetrain: {
      motorGroups: [
        {
          wheelGroup: "left-drive",
          motors: [{ channel: 0, maxForce: 5 }],
        },
        {
          wheelGroup: "right-drive",
          motors: [{ channel: 1, maxForce: 5 }],
        },
      ],
      wheelGroups: [
        {
          id: "left-drive",
          wheels: [
            {
              wheel: {
                type: "robot-wheel",
                radius: 0.5,
                thickness: 0.15,
              },
              mountPoint: WheelMountingPoint.LEFT_FRONT,
              offset: { x: -0.075, y: -0.25, z: 0.5 },
            },
            {
              wheel: {
                type: "robot-wheel",
                radius: 0.5,
                thickness: 0.15,
              },
              mountPoint: WheelMountingPoint.LEFT_REAR,
              offset: { x: -0.075, y: -0.25, z: -0.5 },
            },
          ],
        },
        {
          id: "right-drive",
          wheels: [
            {
              wheel: {
                type: "robot-wheel",
                radius: 0.5,
                thickness: 0.15,
              },
              mountPoint: WheelMountingPoint.RIGHT_FRONT,
              offset: { x: 0.075, y: -0.25, z: 0.5 },
            },
            {
              wheel: {
                type: "robot-wheel",
                radius: 0.5,
                thickness: 0.15,
              },
              mountPoint: WheelMountingPoint.RIGHT_REAR,
              offset: { x: 0.075, y: -0.25, z: -0.5 },
            },
          ],
        },
      ],
    },
  };
  const robotRef = simulator.addRobot(robotSpec);
  const robotHandle = new RobotHandle(robotRef, simulator);

  robotHandle.setMotorPower(0, 0.5);
  robotHandle.setMotorPower(1, 0.5);

  let motorPower = 0.5;
  setInterval(() => {
    if (motorPower > 0 && robotHandle.getDigitalInput(1)) {
      motorPower = -0.5;
    } else if (motorPower < 0 && robotHandle.getDigitalInput(0)) {
      motorPower = 0.5;
    }

    robotHandle.setMotorPower(0, motorPower);
    robotHandle.setMotorPower(1, motorPower);
  }, 100);
}
