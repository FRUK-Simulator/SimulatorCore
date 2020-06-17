import { Sim3D } from "../engine/Sim3D";
import { IBallSpec, IBoxSpec } from "../engine/specs/CoreSpecs";
import { SimulatorConfig } from "../engine/SimulatorConfig";
import { IRobotSpec, WheelMountingPoint } from "..//engine/specs/RobotSpecs";

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
  simulator.addBall(ballSpec);

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
  const box1 = simulator.addBox(box1Spec);

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
  const robot = simulator.addRobot(robotSpec);

  robot.setMotorPower(0, 0.5);
  robot.setMotorPower(1, -0.5);
}
