import { Sim3D, SimulatorConfig, RobotSpecs, RobotBuilder } from "../index";

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

  // const ballSpec: CoreSpecs.IBallSpec = {
  //   type: "ball",
  //   radius: 1,
  //   initialPosition: { x: 5, y: 2 },
  // };
  // simulator.addBall(ballSpec);

  // const coneSpec: CoreSpecs.IConeSpec = {
  //   type: "cone",
  //   radius: 1,
  //   height: 4,
  //   initialPosition: { x: -2.5, y: 7 },
  // };
  // simulator.addCone(coneSpec);

  // const pyramidSpec: CoreSpecs.IPyramidSpec = {
  //   type: "pyramid",
  //   baseDimensions: {
  //     x: 2,
  //     y: 2,
  //   },
  //   height: 3,
  //   initialPosition: {
  //     x: -2.5,
  //     y: 7,
  //   },
  // };
  // simulator.addPyramid(pyramidSpec);

  // const cylinderSpec: CoreSpecs.ICylinderSpec = {
  //   type: "cylinder",
  //   radius: 1,
  //   height: 2,
  //   initialPosition: { x: 5, y: 2 },
  // };
  // simulator.addCylinder(cylinderSpec);

  // const box1Spec: CoreSpecs.IBoxSpec = {
  //   type: "box",
  //   dimensions: {
  //     x: 1,
  //     y: 1,
  //     z: 1,
  //   },
  //   initialPosition: {
  //     x: 0,
  //     y: 5,
  //   },
  // };
  // const box1 = simulator.addBox(box1Spec);

  // let switchColor = false;
  // setInterval(() => {
  //   switchColor = !switchColor;
  //   if (switchColor) {
  //     box1.setBaseColor(0xff0000);
  //   } else {
  //     box1.setBaseColor(0xff00ff);
  //   }
  // }, 2000);

  const robotBuilder = new RobotBuilder.Builder();
  const wheel = new RobotBuilder.WheelBuilder(1)
    .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_FRONT)
    .setMountOffset({ x: -0.075, y: -0.25, z: 0.5 });
  const motor = new RobotBuilder.MotorBuilder().setChannel(0).setMaxForce(5);

  const distanceSensor = new RobotBuilder.DistanceSensorBuilder(0)
    .setMountFace(RobotSpecs.SensorMountingFace.FRONT)
    .setMaxRange(5);

  robotBuilder
    .setDimensions({ x: 2, y: 1, z: 3 })
    .addBasicSensor(distanceSensor)
    .addBasicSensor(
      distanceSensor
        .copy()
        .setChannel(1)
        .setMountFace(RobotSpecs.SensorMountingFace.REAR)
    )
    .addWheel("left-drive", wheel)
    .addWheel(
      "left-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_REAR)
        .setMountOffset({ x: -0.075, y: -0.25, z: -0.5 })
    )
    .addWheel(
      "right-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_FRONT)
        .setMountOffset({ x: 0.075, y: -0.25, z: 0.5 })
    )
    .addWheel(
      "right-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_REAR)
        .setMountOffset({ x: 0.075, y: -0.25, z: -0.5 })
    )
    .addMotor("left-drive", motor)
    .addMotor("right-drive", motor.copy().setChannel(1));

  const robot = simulator.addRobot(robotBuilder.generateSpec());

  let isGoingForward = true;
  robot.setMotorPower(0, 0.5);
  robot.setMotorPower(1, 0.5);

  setInterval(() => {
    if (
      isGoingForward &&
      robot.getAnalogInput(0) > 0 &&
      robot.getAnalogInput(0) < 0.15
    ) {
      isGoingForward = false;
      robot.setMotorPower(0, -0.5);
      robot.setMotorPower(1, -0.5);
    }

    if (
      !isGoingForward &&
      robot.getAnalogInput(1) > 0 &&
      robot.getAnalogInput(1) < 0.15
    ) {
      isGoingForward = true;
      robot.setMotorPower(0, 0.5);
      robot.setMotorPower(1, 0.5);
    }
  }, 100);

  const button = document.createElement("button");
  button.textContent = "Toggle wireframe";
  button.addEventListener("click", (ev) => {
    simulator.setDebugMode(!simulator.isDebugMode());
    ev.stopPropagation();
    ev.preventDefault();
  });
  document.body.appendChild(button);
}
