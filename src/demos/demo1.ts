import {
  Sim3D,
  SimulatorConfig,
  RobotSpecs,
  RobotBuilder,
  CameraSpecs,
} from "../index";
import { GUI } from "dat.gui";

let gui: GUI;
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

const demoOptions = {
  debugMode: false,
  cameraMode: "position",
};

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("demo1");

  let debug_mode_default = false;
  //debug_mode_default = true;

  simulator = new Sim3D(canvas, simConfig);
  simulator.onresize();
  simulator.beginRendering();
  simulator.setDebugMode(debug_mode_default);

  gui = new GUI();
  const debugFolder = gui.addFolder("Debug Options");
  const debugModeController = debugFolder
    .add(demoOptions, "debugMode")
    .setValue(debug_mode_default);

  debugModeController.onChange((val) => {
    simulator.setDebugMode(val);
  });

  const cameraFolder = gui.addFolder("Camera Options");
  const cameraModeController = cameraFolder.add(demoOptions, "cameraMode", [
    "position",
    "chase",
    "orbit",
  ]);

  cameraModeController.onChange((val) => {
    switch (val) {
      case "position":
        simulator.setCameraMode({
          type: CameraSpecs.CameraMode.POSITION,
          position: {
            x: 0,
            y: 2,
            z: 2,
          },
        });
        break;
      case "chase":
        simulator.setCameraMode({
          type: CameraSpecs.CameraMode.THIRD_PERSON,
          handle: robot,
          offset: {
            x: 0.5,
            y: 1,
            z: 1,
          },
        });
        break;
      case "orbit":
        simulator.setCameraMode({
          type: CameraSpecs.CameraMode.ORBIT,
          handle: robot,
          radius: 3,
          height: 3,
        });
    }
  });

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
  const wheel = new RobotBuilder.WheelBuilder(0.1, 0.02)
    .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_FRONT)
    .setMountOffset({ x: -0.0075, y: -0.05, z: 0.033 });
  const motor = new RobotBuilder.MotorBuilder().setChannel(0).setMaxForce(0.25);

  const distanceSensor = new RobotBuilder.DistanceSensorBuilder(0)
    .setMountFace(RobotSpecs.SensorMountingFace.FRONT)
    .setMaxRange(5);

  const colorSensor = new RobotBuilder.ColorSensorBuilder(3)
    .setMountFace(RobotSpecs.SensorMountingFace.BOTTOM)
    .setWidth(0.25)
    .setRange(5);

  robotBuilder
    .setDimensions({ x: 0.225, y: 0.125, z: 0.255 })
    .addBasicSensor(
      distanceSensor
        .copy()
        // move infront of the grabber
        .setMountOffset({ x: 0, y: 0, z: -0.02 })
    )
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
    .addComplexSensor(colorSensor)
    .addWheel("left-drive", wheel)
    .addWheel(
      "left-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_REAR)
        .setMountOffset({ x: -0.0075, y: -0.05, z: -0.033 })
    )
    .addWheel(
      "right-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_FRONT)
        .setMountOffset({ x: 0.0075, y: -0.05, z: 0.033 })
    )
    .addWheel(
      "right-drive",
      wheel
        .copy()
        .setMountPoint(RobotSpecs.WheelMountingPoint.RIGHT_REAR)
        .setMountOffset({ x: 0.0075, y: -0.05, z: -0.033 })
    )
    .addMotor("left-drive", motor)
    .addMotor("right-drive", motor.copy().setChannel(1));

  const spec = robotBuilder.generateSpec();
  // spec.customMesh = {
  //   filePath: "assets/models/edubot-lores.gltf",
  //   rotation: {
  //     x: -Math.PI / 2,
  //     y: 0,
  //     z: Math.PI / 2,
  //   },
  // };

  let gripperGrabChannel = 0;
  let gripperHeldChannel = 1;

  spec.mechanisms = [
    {
      type: "gripper-mechanism",
      ioMap: [
        {
          id: "grab",
          channel: gripperGrabChannel,
          ioType: "DIGITAL_IN",
        },
        {
          id: "held",
          channel: gripperHeldChannel,
          ioType: "DIGITAL_OUT",
        },
      ],
      depth: 1,
      maxWidth: 2,
      minWidth: 0.9,
      mountOffset: { x: 0, y: 0, z: -0.01 },
      mountFace: RobotSpecs.SensorMountingFace.FRONT,
    },
  ];

  const robot = simulator.addRobot(spec);

  const polygonZone = {
    type: "polygon",
    points: [
      { x: -2, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: -2 },
      { x: -2, y: -2 },
    ],
  };

  simulator.addZone({
    type: "zone",
    initialPosition: { x: 0, y: 0 },
    baseColor: 0xff0000,
    opacity: 0.4,
    zoneShape: {
      type: "polygon",
      points: [
        { x: 0, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 0 },
        { x: 0, y: 0 },
      ],
    },
    zoneId: "test-zone",
  });

  /*
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

        if (robot.getAnalogInput(0) > 0 && robot.getAnalogInput(0) < 0.05) {
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

  */

  enum RobotMode {
    WAITING = "Waiting",
    GRABBING = "Grabbing",
    CELEBRATE = "Celebraiting",
    SHAME = "Shame",
  }

  /*
  WAITING -> GRABBING
  GRABBING -> (grabbed==true) -> CELEBRATE
  GRABBING -> (grabbed==false) -> SHAME
  CELEBRATE -> WAITING
  SHAME -> WAITING
  */

  let currMode: RobotMode = null;
  let modeStart = new Date();
  let modeLength = 4000;

  setInterval(() => {
    let timePassed = new Date().getTime() - modeStart.getTime();
    if (currMode !== null && timePassed < modeLength) {
      return;
    }

    let newMode = null;

    // we waitied long enough, do the thing
    switch (currMode) {
      case RobotMode.WAITING:
        newMode = RobotMode.GRABBING;
        break;
      case RobotMode.GRABBING:
        let success = robot.getDigitalInput(gripperHeldChannel);

        newMode = success ? RobotMode.CELEBRATE : RobotMode.SHAME;
        break;
      case RobotMode.CELEBRATE:
        newMode = RobotMode.WAITING;
        break;
      case RobotMode.SHAME:
        newMode = RobotMode.WAITING;
        break;
      default:
        newMode = RobotMode.WAITING;
    }

    switch (newMode) {
      case RobotMode.WAITING:
        // trigger graber to release
        robot.setDigitalInput(gripperGrabChannel, false);
        // move forward slowly
        robot.setMotorPower(0, 0.1);
        robot.setMotorPower(1, 0.1);
        break;
      case RobotMode.GRABBING:
        // trigger grabbing to start
        robot.setDigitalInput(gripperGrabChannel, true);
        // stop motors
        robot.setMotorPower(0, -0.0);
        robot.setMotorPower(1, 0.0);
        break;
      case RobotMode.CELEBRATE:
        // set motors to fast spin
        robot.setMotorPower(0, -0.5);
        robot.setMotorPower(1, 0.5);
        break;
      case RobotMode.SHAME:
        // set motors to slow spin
        robot.setMotorPower(0, 0.1);
        robot.setMotorPower(1, -0.1);
        break;
    }

    if (newMode !== null) {
      // we just entered a new mode!
      console.log("Switching mode: ", currMode, " -> ", newMode);

      currMode = newMode;
      modeStart = new Date();
    }
  }, 100);
}
