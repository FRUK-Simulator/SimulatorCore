import { Box, Vec2 } from "planck-js";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import {
  IMechanismSpec,
  IRobotSpec,
  SensorMountingFace,
  SensorSpec,
} from "../../../specs/RobotSpecs";
import { SimMechanism } from "./SimMechanism";

enum GripperState {
  OPEN,
  CLOSING,
  OPENING,
  CLOSED_EMPTY,
  CLOSED_FULL,
}

const IO_TYPE_HELD = "held"; // held == 1 -> grabbed something, held == 0 nothing grabbed
const IO_TYPE_GRAB = "grab"; // set to 1 to start grabbing, set to 0 to open grabber

export class SimGripperMechanism extends SimMechanism {
  private _state: GripperState = GripperState.OPEN;
  private _heldSensorChanel: number;
  private _mountFace: SensorMountingFace;

  constructor(robotGuid: string, spec: IMechanismSpec, robotSpec: IRobotSpec) {
    super("Gripper", robotGuid, spec);

    this._heldSensorChanel = spec.ioMap.find(
      (io) => io.id == IO_TYPE_HELD
    )?.channel;
    this._mountFace = spec.mountFace;

    if (!this._heldSensorChanel) {
      throw new Error(
        `Gripper Mechanism is missing '${IO_TYPE_HELD}' iomap entry`
      );
    }

    // Get mount positions
    const sensorPosition = getSensorMountPosition(
      robotSpec,
      spec.mountFace,
      spec.mountOffset
    );

    let sensorDimensionX = 0;
    let sensorDimensionZ = 0;

    let range = 0.05;
    let width = 0.1;

    switch (spec.mountFace) {
      case SensorMountingFace.LEFT:
      case SensorMountingFace.RIGHT:
        sensorDimensionX = range * 2;
        sensorDimensionZ = width;
        break;
      case SensorMountingFace.FRONT:
      case SensorMountingFace.REAR:
        sensorDimensionX = width;
        sensorDimensionZ = range * 2;
        break;
    }

    //TODO(jp)
    // Create physics bodies
    // Set up the body and fixture
    this._bodySpecs = {
      type: "dynamic", // sensors are always dynamic
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle: 0,
      bullet: true,
    };
    this._fixtureSpecs = {
      shape: new Box(sensorDimensionX / 2, sensorDimensionZ / 2),
      density: 1,
      isSensor: true,
    };

    // Create meshes
  }

  public getValue(ioIdentifier: string): number {
    if (ioIdentifier !== IO_TYPE_HELD) {
      throw new Error("Unsupported operation");
    }

    return this._state == GripperState.CLOSED_FULL ? 1.0 : 0.0;
  }

  public setValue(ioIdentifier: string, value: number | boolean): void {
    if (ioIdentifier !== IO_TYPE_GRAB) {
      throw new Error("Unsupported operation");
    }

    enum Action {
      CLOSE,
      OPEN,
    }

    let action = value >= 0.5 ? Action.CLOSE : Action.OPEN;

    switch (action) {
      case Action.OPEN:
        throw new Error("Method not implemented.");
        break;
      case Action.CLOSE:
        throw new Error("Method not implemented.");
        break;
    }
  }

  public update(ms: number): void {
    //TODO(jp) implement
    // if the gripper is openning, continue releasing grip.
    // if the gripper is closing, continue closing grippers.
  }

  public getProxySensors(): SensorSpec[] {
    return [
      {
        type: "mechanism-sensor",
        channel: this._heldSensorChanel,
        mountFace: this._mountFace,
        getValueCallback: this.getValue.bind(this, "held"),
      },
    ];
  }
}
