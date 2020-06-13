import { Sim3D } from "../engine/Sim3D";
import { WheelMountingPoint } from "..//engine/objects/MountPoints";
import { RobotHandle } from "../engine/handles/RobotHandle";

let simulator: Sim3D;

window.onload = main;
window.onresize = () => {
  if (simulator) {
    simulator.onresize();
  }
};

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("demo1");

  simulator = new Sim3D(canvas, {
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
  });
  simulator.onresize();
  simulator.beginRendering();

  const robotRef = simulator.addRobot({
    dimensions: { x: 2, y: 1, z: 3 },
    startingPosition: { x: 0, y: 0, z: 0 },
    motorGroups: [
      {
        wheelGroupId: "left-drive",
        motors: [
          {
            channel: 0,
            maxPower: 5,
          },
          {
            channel: 1,
            maxPower: 5,
          },
        ],
      },
      {
        wheelGroupId: "right-drive",
        motors: [
          {
            channel: 2,
            maxPower: 5,
          },
          {
            channel: 3,
            maxPower: 5,
          },
        ],
      },
    ],
    wheelGroups: [
      {
        id: "left-drive",
        wheelSpecs: [
          {
            radius: 0.5,
            thickness: 0.15,
            mountPosition: {
              mountPoint: WheelMountingPoint.LEFT_FRONT,
              offset: { x: -0.075, y: -0.25, z: 0.5 },
            },
          },
          {
            radius: 0.5,
            thickness: 0.15,
            mountPosition: {
              mountPoint: WheelMountingPoint.LEFT_REAR,
              offset: { x: -0.075, y: -0.25, z: -0.5 },
            },
          },
        ],
      },
      {
        id: "right-drive",
        wheelSpecs: [
          {
            radius: 0.5,
            thickness: 0.15,
            mountPosition: {
              mountPoint: WheelMountingPoint.RIGHT_FRONT,
              offset: { x: 0.075, y: -0.25, z: 0.5 },
            },
          },
          {
            radius: 0.5,
            thickness: 0.15,
            mountPosition: {
              mountPoint: WheelMountingPoint.RIGHT_REAR,
              offset: { x: 0.075, y: -0.25, z: -0.5 },
            },
          },
        ],
      },
    ],
  });

  const robotHandle = new RobotHandle(robotRef, simulator);
  robotHandle.setMotorPower(0, 0.3);
  robotHandle.setMotorPower(2, -0.3);
}
