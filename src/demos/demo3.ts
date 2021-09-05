import { Sim3D, SimulatorConfig, RobotSpecs, RobotBuilder } from "../index";
import { GUI } from "dat.gui";
import { RobotHandle } from "../engine/handles";
import { ZeroSlopeEnding } from "three";
import { ISimulatorEvent } from "../engine/specs/CoreSpecs";

let gui: GUI;
let simulator: Sim3D;
let robot: RobotHandle;

const LEFT_DRIVE_CHANNEL = 0;
const RIGHT_DRIVE_CHANNEL = 1;
const GRIPPER_CHANEL = 0;

const setting = {
  speed: 1,
};

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

  const settingFolder = gui.addFolder("Settings");
  settingFolder.add(setting, "speed", 0, 5, 0.1);

  const robotBuilder = new RobotBuilder.Builder();
  const wheel = new RobotBuilder.WheelBuilder(0.1, 0.03)
    .setMountPoint(RobotSpecs.WheelMountingPoint.LEFT_FRONT)
    .setMountOffset({ x: -0.0075, y: -0.05, z: 0.033 });

  const motor = new RobotBuilder.MotorBuilder()
    .setChannel(LEFT_DRIVE_CHANNEL)
    .setMaxForce(1);

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
    .addMotor("right-drive", motor.copy().setChannel(RIGHT_DRIVE_CHANNEL));

  const spec = robotBuilder.generateSpec();

  spec.mechanisms = [
    {
      type: "gripper-mechanism",
      ioMap: [
        {
          id: "grab",
          channel: GRIPPER_CHANEL,
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

  robot = simulator.addRobot(spec);

  simulator.addBox({
    type: "box",
    dimensions: {
      x: 0.15,
      y: 0.15,
      z: 0.15,
    },
    baseColor: 0xff0033,
    initialPosition: {
      x: 0,
      y: -1,
    },
  });

  simulator.addZone({
    type: "zone",
    zoneId: "A",
    zoneShape: {
      type: "rectangle",
      xLength: 2,
      zLength: 1,
    },
    initialPosition: {
      x: 1,
      y: -2,
    },
  });

  let el = window.document.body;

  el.addEventListener("keydown", keyListener);
  el.addEventListener("keyup", keyListener);

  let eventListEl = window.document.createElement("ol");
  let clearEl = window.document.createElement("button");

  el.appendChild(eventListEl);
  el.appendChild(clearEl);

  eventListEl.style.fontFamily = "monospace";

  clearEl.textContent = "Clear";
  clearEl.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    eventListEl.innerHTML = "";
  });

  simulator.addListener("simulation-event", (e) => {
    let event = e as ISimulatorEvent;
    let eventEl = window.document.createElement("li");
    eventEl.innerText = JSON.stringify(e);
    eventListEl.appendChild(eventEl);
  });
}

enum Drive {
  LEFT,
  RIGHT,
  BOTH,
  GRIPPER,
}
enum Direction {
  POS,
  NEG,
}

function keyListener(this: HTMLElement, e: KeyboardEvent) {
  console.assert(e.type === "keydown" || e.type == "keyup");
  let isDown = e.type == "keydown";

  let drive: Drive = null;
  let direction: Direction = null;

  switch (e.code) {
    case "KeyW":
      drive = Drive.BOTH;
      direction = Direction.POS;
      break;
    case "KeyA":
      drive = Drive.RIGHT;
      direction = Direction.POS;
      break;
    case "KeyS":
      drive = Drive.BOTH;
      direction = Direction.NEG;
      break;
    case "KeyD":
      drive = Drive.LEFT;
      direction = Direction.POS;
      break;
    case "Space":
      drive = Drive.GRIPPER;
      direction = isDown ? Direction.POS : Direction.NEG;
      break;
    default:
      return;
  }

  e.preventDefault();
  e.stopImmediatePropagation();

  if (e.repeat) {
    return;
  }

  let motorPower = direction === Direction.POS ? 1 : -1;

  motorPower *= isDown ? setting.speed : 0;

  if (drive === Drive.LEFT || drive === Drive.BOTH) {
    robot.setMotorPower(LEFT_DRIVE_CHANNEL, motorPower);
  }
  if (drive === Drive.RIGHT || drive === Drive.BOTH) {
    robot.setMotorPower(RIGHT_DRIVE_CHANNEL, motorPower);
  }
  if (drive === Drive.GRIPPER) {
    robot.setDigitalOutput(GRIPPER_CHANEL, direction === Direction.POS);
  }
}
