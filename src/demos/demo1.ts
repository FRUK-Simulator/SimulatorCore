import { Sim3D, SimulatorConfig, RobotSpecs, RobotBuilder } from "../index";

let simulator: Sim3D;

const simConfig: SimulatorConfig = {
  defaultWorld: {
    xLength: 6,
    zLength: 6,
    walls: [],

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

  // simulator.addBox({
  //   type: "box",
  //   dimensions: { x: 1, y: 1, z: 1 },
  //   initialPosition: { x: 3, y: 0 },
  // });

  const robotBuilder = new RobotBuilder.Builder();
  const wheel = new RobotBuilder.WheelBuilder(0.09)
    .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_FRONT)
    .setMountOffset({ x: -0.0075, y: -0.25, z: 0.033 });
  const motor = new RobotBuilder.MotorBuilder().setChannel(0).setMaxForce(0.25);

  const distanceSensor = new RobotBuilder.DistanceSensorBuilder(0)
    .setMountFace(RobotSpecs.SensorMountingFace.FRONT)
    .setMaxRange(5);

  robotBuilder
    .setDimensions({ x: 0.225, y: 0.225, z: 0.255 })
    .addBasicSensor(distanceSensor)
    .addBasicSensor(
      distanceSensor
        .copy()
        .setChannel(1)
        .setMountFace(RobotSpecs.SensorMountingFace.REAR)
    )
    .addBasicSensor(
      distanceSensor
        .copy()
        .setChannel(2)
        .setMountFace(RobotSpecs.SensorMountingFace.RIGHT)
    )
    .addWheel("left-drive", wheel)
    .addWheel(
      "left-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_REAR)
        .setMountOffset({ x: -0.0075, y: -0.25, z: -0.033 })
    )
    .addWheel(
      "right-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_FRONT)
        .setMountOffset({ x: 0.0075, y: -0.25, z: 0.033 })
    )
    .addWheel(
      "right-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_REAR)
        .setMountOffset({ x: 0.0075, y: -0.25, z: -0.033 })
    )
    .addMotor("left-drive", motor)
    .addMotor("right-drive", motor.copy().setChannel(1));

  const spec = robotBuilder.generateSpec();
  spec.customMesh = {
    filePath: "assets/models/edubot-lores.gltf",
    rotation: {
      x: -Math.PI / 2,
      y: 0,
      z: Math.PI / 2,
    },
  };
  const robot = simulator.addRobot(spec);

  enum RobotMode {
    LOOKING,
    RUN_AWAY,
  }

  let currMode = RobotMode.LOOKING;
  let runAwayStartTime = 0;

  setInterval(() => {
    switch (currMode) {
      case RobotMode.LOOKING:
        robot.setMotorPower(0, 0.35);
        robot.setMotorPower(1, 0.35);

        if (robot.getAnalogInput(0) > 0 && robot.getAnalogInput(0) < 0.15) {
          runAwayStartTime = Date.now();
          currMode = RobotMode.RUN_AWAY;
        }
        break;
      case RobotMode.RUN_AWAY:
        robot.setMotorPower(0, -0.15);
        robot.setMotorPower(1, -0.35);

        if (Date.now() - runAwayStartTime > 1000) {
          currMode = RobotMode.LOOKING;
        }
        break;
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
