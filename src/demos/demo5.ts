import { Sim3D, SimulatorConfig, RobotSpecs, RobotBuilder } from "../index";
import { GUI } from "dat.gui";
import { RobotHandle } from "../engine/handles";
import { ISimulatorEvent } from "../engine/specs/CoreSpecs";

let gui: GUI;
let simulator: Sim3D;
let robot: RobotHandle;

const LEFT_DRIVE_CHANNEL = 0;
const RIGHT_DRIVE_CHANNEL = 1;
const COLOR_SENSOR_CHANNEL = 1;
const DISTANCE_SENSOR_CHANNEL = 0;

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

function getHexColor(color: number): string {
  return color.toString(16).padStart(6, "0");
}

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("demo1");

  const debug_mode_default = false;
  //debug_mode_default = true;

  simulator = new Sim3D(canvas, simConfig);
  simulator.onresize();
  simulator.beginRendering();
  simulator.setDebugMode(debug_mode_default);

  gui = new GUI();
  (window as any).gui = gui; // eslint-disable-line @typescript-eslint/no-explicit-any
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

  const colorSensor = new RobotBuilder.ColorSensorBuilder(COLOR_SENSOR_CHANNEL);
  colorSensor.setMountFace(RobotSpecs.SensorMountingFace.BOTTOM);

  const distanceSensor = new RobotBuilder.DistanceSensorBuilder(
    DISTANCE_SENSOR_CHANNEL
  );
  distanceSensor.setMountFace(RobotSpecs.SensorMountingFace.FRONT);
  distanceSensor.setMaxRange(20.0);

  robotBuilder
    .setId("robo")
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
    .addMotor("right-drive", motor.copy().setChannel(RIGHT_DRIVE_CHANNEL))
    .addComplexSensor(colorSensor)
    .addBasicSensor(distanceSensor);

  const spec = robotBuilder.generateSpec();
  robot = simulator.addRobot(spec);

  simulator.addZone({
    type: "zone",
    zoneId: "A",
    zoneShape: {
      type: "polygon",
      points: [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
        { x: 3, y: 4 },
        { x: 1, y: 4 },
      ],
    },
    baseColor: 0xff0000,
    initialPosition: {
      x: -1,
      y: -1,
    },
  });

  const el = window.document.body;

  el.addEventListener("keydown", keyListener);
  el.addEventListener("keyup", keyListener);

  const eventListEl = window.document.createElement("ol");
  const clearEl = window.document.createElement("button");

  el.appendChild(eventListEl);
  el.appendChild(clearEl);

  eventListEl.style.fontFamily = "monospace";

  clearEl.textContent = "Clear";
  clearEl.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    eventListEl.innerHTML = "";
  });

  const distanceSensorDiv = window.document.createElement("div");
  el.appendChild(distanceSensorDiv);
  window.setInterval(() => {
    distanceSensorDiv.innerText = JSON.stringify(
      robot.getAnalogInput(DISTANCE_SENSOR_CHANNEL)
    );
  }, 500);

  const colorSensorDiv = window.document.createElement("div");
  el.appendChild(colorSensorDiv);
  window.setInterval(() => {
    // TODO: Make it display the actual color, or at least rgb value
    const colorSensorValue = robot.getComplexSensorValue(
      COLOR_SENSOR_CHANNEL,
      "ColorSensor"
    );
    const color =
      "color" in colorSensorValue
        ? getHexColor(colorSensorValue.color)
        : "ffffff";
    console.log(`color is ${color}`);
    colorSensorDiv.style.backgroundColor = `#${color}`;
    colorSensorDiv.style.width = "30px";
    colorSensorDiv.style.height = "30px";
    colorSensorDiv.style.borderStyle = "solid";
    colorSensorDiv.style.borderColor = "#000000";
  }, 500);

  simulator.addListener("simulation-event", (e) => {
    const event = e as ISimulatorEvent;
    const eventEl = window.document.createElement("li");
    eventEl.innerText = JSON.stringify(event.data);
    const eventTypeEl = window.document.createElement("i");
    eventTypeEl.innerText = event.type;
    eventEl.prepend(eventTypeEl);
    // eventListEl.appendChild(eventEl);
  });
}

enum Drive {
  LEFT,
  RIGHT,
  BOTH,
}
enum Direction {
  POS,
  NEG,
}

function keyListener(this: HTMLElement, e: KeyboardEvent) {
  console.assert(e.type === "keydown" || e.type == "keyup");
  const isDown = e.type == "keydown";

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
}
