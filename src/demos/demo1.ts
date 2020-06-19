import { Sim3D, CoreSpecs, SimulatorConfig, RobotSpecs } from "../index";

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

  const ballSpec: CoreSpecs.IBallSpec = {
    type: "ball",
    radius: 1,
    initialPosition: { x: 5, y: 2 },
  };
  simulator.addBall(ballSpec);

  const coneSpec: CoreSpecs.IConeSpec = {
    type: "cone",
    radius: 1,
    height: 4,
    initialPosition: { x: -2.5, y: 7 },
  };
  simulator.addCone(coneSpec);

  const pyramidSpec: CoreSpecs.IPyramidSpec = {
    type: "pyramid",
    baseDimensions: {
      x: 2,
      y: 2,
    },
    height: 3,
    initialPosition: {
      x: -2.5,
      y: 7,
    },
  };
  simulator.addPyramid(pyramidSpec);

  const cylinderSpec: CoreSpecs.ICylinderSpec = {
    type: "cylinder",
    radius: 1,
    height: 2,
    initialPosition: { x: 5, y: 2 },
  };
  simulator.addCylinder(cylinderSpec);

  const box1Spec: CoreSpecs.IBoxSpec = {
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

  const robotSpec: RobotSpecs.IRobotSpec = {
    type: "robot",
    dimensions: { x: 2, y: 1, z: 3 },
    basicSensors: [
      {
        type: "contact-sensor",
        channel: 0,
        mountFace: RobotSpecs.SensorMountingFace.FRONT,
        render: true,
        width: 1,
        range: 0.5,
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
              mountPoint: RobotSpecs.WheelMountingPoint.LEFT_FRONT,
              offset: { x: -0.075, y: -0.25, z: 0.5 },
            },
            {
              wheel: {
                type: "robot-wheel",
                radius: 0.5,
                thickness: 0.15,
              },
              mountPoint: RobotSpecs.WheelMountingPoint.LEFT_REAR,
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
              mountPoint: RobotSpecs.WheelMountingPoint.RIGHT_FRONT,
              offset: { x: 0.075, y: -0.25, z: 0.5 },
            },
            {
              wheel: {
                type: "robot-wheel",
                radius: 0.5,
                thickness: 0.15,
              },
              mountPoint: RobotSpecs.WheelMountingPoint.RIGHT_REAR,
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
