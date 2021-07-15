import { Sim3D, SimulatorConfig, RobotSpecs, RobotBuilder } from "../index";
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

  const debug_mode_default = false;
  //debug_mode_default = true;

  simulator = new Sim3D(canvas, simConfig);
  simulator.onresize();
  simulator.beginRendering();
  simulator.setDebugMode(debug_mode_default);

  gui = new GUI();
  (window as any).gui = gui;
  const debugFolder = gui.addFolder("Debug Options");
  const debugModeController = debugFolder
    .add(demoOptions, "debugMode")
    .setValue(debug_mode_default);

  debugModeController.onChange((val) => {
    simulator.setDebugMode(val);
  });

  const robotBuilder = new RobotBuilder.Builder();
  const wheel = new RobotBuilder.WheelBuilder(0.1, 0.03)
    .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_FRONT)
    .setMountOffset({ x: -0.0075, y: -0.05, z: 0.033 });
  const motor = new RobotBuilder.MotorBuilder().setChannel(0).setMaxForce(1);
  const gyroscopeSensor = new RobotBuilder.GyroscopeSensorBuilder(
    0
  ).setMountFace(RobotSpecs.SensorMountingFace.TOP);

  robotBuilder
    .setDimensions({ x: 0.225, y: 0.125, z: 0.255 })

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
    .addMotor("right-drive", motor.copy().setChannel(1))
    .addBasicSensor(gyroscopeSensor);

  const spec = robotBuilder.generateSpec();

  spec.mechanisms = [
    {
      type: "gripper-mechanism",
      ioMap: [
        {
          id: "grab",
          channel: 0,
          ioType: RobotSpecs.MechanismIOType.DIGITAL_OUT,
        },
        {
          id: "held",
          channel: 1,
          ioType: RobotSpecs.MechanismIOType.DIGITAL_IN,
        },
      ],
      depth: 0.1,
      maxWidth: 0.4,
      mountOffset: { x: 0, y: 0.5, z: -0.01 },
      mountFace: RobotSpecs.SensorMountingFace.FRONT,
      closeSpeed: 0.1,
    },
  ];

  const robot = simulator.addRobot(spec);

  const settings = {
    MotorZeroPower: 0.1,
    MotorOnePower: 0.1,
    MotorSpinZeroPower: -0.1,
    MotorSpinOnePower: 0.1,
  };
  const ControlsFolder = gui.addFolder("Control Options");
  ControlsFolder.add(settings, "MotorZeroPower", -1, 1, 0.05);
  ControlsFolder.add(settings, "MotorOnePower", -1, 1, 0.05);
  ControlsFolder.add(settings, "MotorSpinZeroPower", -1, 1, 0.05);
  ControlsFolder.add(settings, "MotorSpinOnePower", -1, 1, 0.05);

  const ForwardButtonEl = document.createElement("button");
  ForwardButtonEl.textContent = "Forward";
  ForwardButtonEl.addEventListener("mousedown", () => {
    robot.setMotorPower(0, settings.MotorZeroPower);
    robot.setMotorPower(1, settings.MotorOnePower);
  });
  ForwardButtonEl.addEventListener("mouseup", () => {
    robot.setMotorPower(0, 0);
    robot.setMotorPower(1, 0);
  });
  document.body.appendChild(ForwardButtonEl);

  const AntiClockwiseButtonEl = document.createElement("button");
  AntiClockwiseButtonEl.textContent = "AntiClockwise";
  AntiClockwiseButtonEl.addEventListener("mousedown", () => {
    robot.setMotorPower(0, settings.MotorSpinZeroPower);
    robot.setMotorPower(1, settings.MotorSpinOnePower);
    console.debug(`Robot rotation: ${robot.getAnalogInput(0)}`);
  });
  AntiClockwiseButtonEl.addEventListener("mouseup", () => {
    robot.setMotorPower(0, 0);
    robot.setMotorPower(1, 0);
  });

  document.body.appendChild(AntiClockwiseButtonEl);
}
