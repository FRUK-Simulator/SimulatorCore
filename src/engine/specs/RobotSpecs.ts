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
 * Interface describing a group of wheels that are mechanically linked
 *
 * In real life, this would mean that the wheels are connected via belt/chain/gears
 * and thus move together at the same rate
 */
export interface IRobotWheelGroup {
  id: string;
  wheels: IRobotWheelAndMount[];
}

/**
 * Interface describing a single motor
 */
export interface IMotorSpec {
  channel: number; // which motor/PWM port this is connected to
  maxForce: number; // TODO this is very simplified
  // TODO For slightly higher accuracy, we should take RPM + stall torque
}

/**
 * Interface describing a group of motors that are mechanically linked and
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
 * Interface describing a robot drivetrain that consists of wheelgroups and
 * motorgroups.
 */
export interface IDrivetrainSpec {
  wheelGroups: IRobotWheelGroup[];
  motorGroups: IMotorGroup[];
}

/**
 * Interface representing a specification for a robot, including
 * drivetrain (including wheels and motors), sensors, etc
 */
export interface IRobotSpec extends IBaseSimObjectSpec {
  type: "robot";
  dimensions: Vector3d;
  drivetrain: IDrivetrainSpec;
  basicSensors?: BasicSensorSpec[];
  // TODO as we add more features to the robot (e.g. sensors or mechanisms)
  // they can get added as properties here
}

/**
 * Interface describing user-specified data that can be attached
 * to simulator engine objects
 */
export interface ISimUserData {
  sensor?: ISimSensorDescriptor;
}

// Sensors

/**
 * Interface representing a descriptor of a unique sensor
 */
export interface ISimSensorDescriptor {
  robotGuid: string;
  sensorIdent: string;
  sensorType: string;
}

/**
 * Interface representing a BasicSensor value (e.g. simple digital/analog)
 */
export interface IBasicSensorValue {
  value: number;
  // Add more fields here if necessary. e.g. for contact sensors, maybe impulse
}

/**
 * Output channel type for a Basic Sensor (digital or analog)
 */
export enum BasicSensorOutputChannelType {
  DIGITAL = "Digital",
  ANALOG = "Analog",
}

/**
 * Spec for a Basic Sensor (simple digital/analog input)
 */
export interface IBasicSensorSpec {
  type: string;
  channel: number;
  mountFace: SensorMountingFace;
  mountOffset?: Vector3d;
  render?: boolean;
}

/**
 * Spec for a Contact sensor (e.g. touch sensor, tact switch, bumper switch)
 */
export interface IContactSensorSpec extends IBasicSensorSpec {
  type: "contact-sensor";
  width: number;
  range: number;
}

// Add additional basic sensor types to this union
export type BasicSensorSpec = IContactSensorSpec;
