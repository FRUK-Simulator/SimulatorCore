import { IBaseSimObjectSpec } from "./CoreSpecs";
import { Vector3d } from "../SimTypes";

export enum WheelMountingPoint {
  LEFT_FRONT,
  LEFT_CENTER,
  LEFT_REAR,
  RIGHT_FRONT,
  RIGHT_CENTER,
  RIGHT_REAR,
}

export enum SensorMountingFace {
  FRONT,
  LEFT,
  RIGHT,
  REAR,
  TOP,
  BOTTOM,
}

export enum SensorMountingPoint {
  TOP_LEFT,
  TOP_MIDDLE,
  TOP_RIGHT,
  CENTER_LEFT,
  CENTER_MIDDLE,
  CENTER_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_MIDDLE,
  BOTTOM_RIGHT,
}

export interface IRobotWheelSpec extends IBaseSimObjectSpec {
  type: "robot-wheel";
  radius: number;
  thickness?: number;
  isOmni?: boolean;
  sideSlipForce?: number;
  angleRadians?: number; // Used for things like mecanum wheels which have 45 degree offset
}

export interface IRobotWheelAndMount {
  wheel: IRobotWheelSpec;
  mountPoint: WheelMountingPoint;
  offset?: Vector3d;
}

/**
 * This interface describes a group of wheels that are mechanically linked
 *
 * In real life, this would mean that the wheels are connected via belt/chain/gears
 * and thus move together at the same rate
 */
export interface IRobotWheelGroup {
  id: string;
  wheels: IRobotWheelAndMount[];
}

/**
 * This interface describes a single motor
 */
export interface IMotorSpec {
  channel: number; // which motor/PWM port this is connected to
  maxForce: number; // TODO this is very simplified
  // TODO For slightly higher accuracy, we should take RPM + stall torque
}

/**
 * This interface describes a group of motors that are mechanically linked and
 * that power a single `IRobotWheelGroup`
 *
 * In real life, this describes a gearbox with 1 or more motors that are mechanically
 * connected to a set of wheels via belt/chain/gears.
 */
export interface IMotorGroup {
  wheelGroup: string; // The ID of the wheelgroup this motor group powers
  motors: IMotorSpec[];
}

/**
 * This interface describes a robot drivetrain that consists of wheelgroups and
 * motorgroups.
 */
export interface IDrivetrainSpec {
  wheelGroups: IRobotWheelGroup[];
  motorGroups: IMotorGroup[];
}

export interface ISensorSpec {}

export interface IRobotSpec extends IBaseSimObjectSpec {
  type: "robot";
  dimensions: Vector3d;
  drivetrain: IDrivetrainSpec;
  // TODO as we add more features to the robot (e.g. sensors or mechanisms)
  // they can get added as properties here
}
