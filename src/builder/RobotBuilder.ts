import {
  IRobotSpec,
  IRobotWheelGroup,
  IMotorGroup,
  IRobotWheelAndMount,
  WheelMountingPoint,
  IMotorSpec,
  IRobotWheelSpec,
  BasicSensorSpec,
  ComplexSensorSpec,
  IContactSensorSpec,
  SensorMountingFace,
  IDistanceSensorSpec,
  IColorSensorSpec,
  IGyroscopeSpec,
} from "../engine/specs/RobotSpecs";
import { Vector3d } from "../engine/SimTypes";

/**
 * Utility class to declaratively create a robot spec
 */
export class Builder {
  private _spec: IRobotSpec = {
    type: "robot",
    dimensions: { x: 0, y: 0, z: 0 },
    drivetrain: {
      wheelGroups: [],
      motorGroups: [],
    },
    basicSensors: [],
    complexSensors: [],
  };

  private _wheelGroups: Map<string, IRobotWheelGroup> = new Map<
    string,
    IRobotWheelGroup
  >();
  private _motorGroups: Map<string, IMotorGroup> = new Map<
    string,
    IMotorGroup
  >();

  setDimensions(dimensions: Vector3d): Builder {
    this._spec.dimensions = dimensions;
    return this;
  }

  addWheel(wheelGroupId: string, wheelSpec: IRobotWheelAndMount): Builder {
    let wheelGroup: IRobotWheelGroup;

    if (!this._wheelGroups.has(wheelGroupId)) {
      wheelGroup = {
        id: wheelGroupId,
        wheels: [],
      };

      this._wheelGroups.set(wheelGroupId, wheelGroup);
      this._spec.drivetrain.wheelGroups.push(wheelGroup);
    } else {
      wheelGroup = this._wheelGroups.get(wheelGroupId);
    }

    wheelGroup.wheels.push(wheelSpec);

    return this;
  }

  addWheels(wheelGroupId: string, wheels: IRobotWheelAndMount[]): Builder {
    wheels.forEach((wheel) => {
      this.addWheel(wheelGroupId, wheel);
    });
    return this;
  }

  addMotor(wheelGroupId: string, motorSpec: IMotorSpec): Builder {
    let motorGroup: IMotorGroup;

    if (!this._motorGroups.has(wheelGroupId)) {
      motorGroup = {
        wheelGroup: wheelGroupId,
        motors: [],
      };

      this._motorGroups.set(wheelGroupId, motorGroup);
      this._spec.drivetrain.motorGroups.push(motorGroup);
    } else {
      motorGroup = this._motorGroups.get(wheelGroupId);
    }

    motorGroup.motors.push(motorSpec);

    return this;
  }

  addMotors(wheelGroupId: string, motors: IMotorSpec[]): Builder {
    motors.forEach((motor) => {
      this.addMotor(wheelGroupId, motor);
    });
    return this;
  }

  addBasicSensor(sensor: BasicSensorSpec): Builder {
    this._spec.basicSensors.push(sensor);
    return this;
  }

  addComplexSensor(sensor: ComplexSensorSpec): Builder {
    this._spec.complexSensors.push(sensor);
    return this;
  }

  setId(id: string): Builder {
    this._spec.id = id;
    return this;
  }

  generateSpec(): IRobotSpec {
    return this._spec;
  }
}

export class MotorBuilder implements IMotorSpec {
  private _spec: IMotorSpec = {
    channel: 0,
    maxForce: 0,
  };

  constructor(channelOrSpec?: number | IMotorSpec, maxForce?: number) {
    if (typeof channelOrSpec === "number") {
      this._spec.channel = channelOrSpec;
      if (maxForce !== undefined) {
        this._spec.maxForce = maxForce;
      }
    } else if (channelOrSpec !== undefined) {
      this._spec = channelOrSpec;
    }
  }

  setChannel(channel: number): MotorBuilder {
    this._spec.channel = channel;
    return this;
  }

  setMaxForce(maxForce: number): MotorBuilder {
    this._spec.maxForce = maxForce;
    return this;
  }

  get channel(): number {
    return this._spec.channel;
  }

  get maxForce(): number {
    return this._spec.maxForce;
  }

  copy(): MotorBuilder {
    const newSpec: IMotorSpec = JSON.parse(JSON.stringify(this._spec));
    return new MotorBuilder(newSpec);
  }
}

export class WheelBuilder implements IRobotWheelAndMount {
  private _spec: IRobotWheelAndMount = {
    wheel: {
      type: "robot-wheel",
      radius: 0,
    },
    mountPoint: WheelMountingPoint.LEFT_CENTER,
  };

  constructor(
    diameterOrSpec: number | IRobotWheelAndMount,
    thickness?: number
  ) {
    if (typeof diameterOrSpec === "number") {
      this._spec.wheel.radius = diameterOrSpec / 2;
      this._spec.wheel.thickness = thickness;
    } else {
      this._spec = diameterOrSpec;
    }
  }

  get wheel(): IRobotWheelSpec {
    return this._spec.wheel;
  }

  get mountPoint(): WheelMountingPoint {
    return this._spec.mountPoint;
  }

  get offset(): Vector3d | undefined {
    return this._spec.offset;
  }

  setIsOmni(isOmni: boolean): WheelBuilder {
    this._spec.wheel.isOmni = isOmni;
    return this;
  }

  setMountPoint(mountPoint: WheelMountingPoint): WheelBuilder {
    this._spec.mountPoint = mountPoint;

    return this;
  }

  setMountOffset(offset: Vector3d): WheelBuilder {
    this._spec.offset = offset;
    return this;
  }

  copy(): WheelBuilder {
    const newSpec: IRobotWheelAndMount = JSON.parse(JSON.stringify(this._spec));
    return new WheelBuilder(newSpec);
  }
}

export class ContactSensorBuilder implements IContactSensorSpec {
  private _spec: IContactSensorSpec = {
    type: "contact-sensor",
    channel: 0,
    mountFace: SensorMountingFace.FRONT,
    width: 0,
    range: 0,
  };

  constructor(channelOrSpec?: number | IContactSensorSpec) {
    if (typeof channelOrSpec === "number") {
      this._spec.channel = channelOrSpec;
    } else if (channelOrSpec !== undefined) {
      this._spec = channelOrSpec;
    }
  }

  setChannel(ch: number): ContactSensorBuilder {
    this._spec.channel = ch;
    return this;
  }

  setMountFace(face: SensorMountingFace): ContactSensorBuilder {
    this._spec.mountFace = face;
    return this;
  }

  setMountOffset(offset: Vector3d): ContactSensorBuilder {
    this._spec.mountOffset = offset;
    return this;
  }

  setRender(render: boolean): ContactSensorBuilder {
    this._spec.render = render;
    return this;
  }

  setWidth(w: number): ContactSensorBuilder {
    this._spec.width = w;
    return this;
  }

  setRange(range: number): ContactSensorBuilder {
    this._spec.range = range;
    return this;
  }

  copy(): ContactSensorBuilder {
    const newParams = JSON.parse(
      JSON.stringify(this._spec)
    ) as IContactSensorSpec;
    return new ContactSensorBuilder(newParams);
  }

  get type(): "contact-sensor" {
    return this._spec.type;
  }

  get channel(): number {
    return this._spec.channel;
  }

  get mountFace(): SensorMountingFace {
    return this._spec.mountFace;
  }

  get mountOffset(): Vector3d | undefined {
    return this._spec.mountOffset;
  }

  get render(): boolean | undefined {
    return this._spec.render;
  }

  get width(): number {
    return this._spec.width;
  }

  get range(): number {
    return this._spec.range;
  }
}

export class DistanceSensorBuilder implements IDistanceSensorSpec {
  private _spec: IDistanceSensorSpec = {
    type: "distance-sensor",
    channel: 0,
    mountFace: SensorMountingFace.FRONT,
    minRange: 0,
    maxRange: 0,
    detectionAngle: 0,
  };

  constructor(channelOrSpec?: number | IDistanceSensorSpec) {
    if (typeof channelOrSpec === "number") {
      this._spec.channel = channelOrSpec;
    } else if (channelOrSpec !== undefined) {
      this._spec = channelOrSpec;
    }
  }

  setChannel(ch: number): DistanceSensorBuilder {
    this._spec.channel = ch;
    return this;
  }

  setMountFace(face: SensorMountingFace): DistanceSensorBuilder {
    this._spec.mountFace = face;
    return this;
  }

  setMountOffset(offset: Vector3d): DistanceSensorBuilder {
    this._spec.mountOffset = offset;
    return this;
  }

  setRender(render: boolean): DistanceSensorBuilder {
    this._spec.render = render;
    return this;
  }

  setMinRange(minRange: number): DistanceSensorBuilder {
    this._spec.minRange = minRange;
    return this;
  }

  setMaxRange(maxRange: number): DistanceSensorBuilder {
    this._spec.maxRange = maxRange;
    return this;
  }

  setDetectionAngle(angle: number): DistanceSensorBuilder {
    this._spec.detectionAngle = angle;
    return this;
  }

  copy(): DistanceSensorBuilder {
    const newParams = JSON.parse(
      JSON.stringify(this._spec)
    ) as IDistanceSensorSpec;
    return new DistanceSensorBuilder(newParams);
  }

  get type(): "distance-sensor" {
    return this._spec.type;
  }

  get channel(): number {
    return this._spec.channel;
  }

  get mountFace(): SensorMountingFace {
    return this._spec.mountFace;
  }

  get mountOffset(): Vector3d | undefined {
    return this._spec.mountOffset;
  }

  get render(): boolean | undefined {
    return this._spec.render;
  }

  get minRange(): number | undefined {
    return this._spec.minRange;
  }

  get maxRange(): number {
    return this._spec.maxRange;
  }

  get detectionAngle(): number | undefined {
    return this._spec.detectionAngle;
  }
}
export class GyroscopeSensorBuilder implements IGyroscopeSpec {
  private _spec: IGyroscopeSpec = {
    type: "gyroscope-sensor",
    channel: 0,
    mountFace: SensorMountingFace.FRONT,
  };

  constructor(channelOrSpec?: number | IGyroscopeSpec) {
    if (typeof channelOrSpec === "number") {
      this._spec.channel = channelOrSpec;
    } else if (channelOrSpec !== undefined) {
      this._spec = channelOrSpec;
    }
  }

  setChannel(ch: number): GyroscopeSensorBuilder {
    this._spec.channel = ch;
    return this;
  }

  setMountFace(face: SensorMountingFace): GyroscopeSensorBuilder {
    this._spec.mountFace = face;
    return this;
  }

  setMountOffset(offset: Vector3d): GyroscopeSensorBuilder {
    this._spec.mountOffset = offset;
    return this;
  }

  setRender(render: boolean): GyroscopeSensorBuilder {
    this._spec.render = render;
    return this;
  }

  get type(): "gyroscope-sensor" {
    return this._spec.type;
  }

  get channel(): number {
    return this._spec.channel;
  }

  get mountFace(): SensorMountingFace {
    return this._spec.mountFace;
  }

  get mountOffset(): Vector3d | undefined {
    return this._spec.mountOffset;
  }

  get render(): boolean | undefined {
    return this._spec.render;
  }
}

export class ColorSensorBuilder implements IColorSensorSpec {
  private _spec: IColorSensorSpec = {
    type: "color-sensor",
    channel: 0,
    width: 0,
    range: 0,
    mountFace: SensorMountingFace.BOTTOM,
  };

  constructor(channelOrSpec?: number | IColorSensorSpec) {
    if (typeof channelOrSpec === "number") {
      this._spec.channel = channelOrSpec;
    } else if (channelOrSpec !== undefined) {
      this._spec = channelOrSpec;
    }
  }

  setChannel(ch: number): ColorSensorBuilder {
    this._spec.channel = ch;
    return this;
  }

  setMountFace(face: SensorMountingFace): ColorSensorBuilder {
    this._spec.mountFace = face;
    return this;
  }

  setMountOffset(offset: Vector3d): ColorSensorBuilder {
    this._spec.mountOffset = offset;
    return this;
  }

  setRender(render: boolean): ColorSensorBuilder {
    this._spec.render = render;
    return this;
  }

  setWidth(width: number): ColorSensorBuilder {
    this._spec.width = width;
    return this;
  }

  setRange(range: number): ColorSensorBuilder {
    this._spec.range = range;
    return this;
  }

  copy(): ColorSensorBuilder {
    const newParams = JSON.parse(
      JSON.stringify(this._spec)
    ) as IColorSensorSpec;
    return new ColorSensorBuilder(newParams);
  }

  get type(): "color-sensor" {
    return this._spec.type;
  }

  get channel(): number {
    return this._spec.channel;
  }

  get mountFace(): SensorMountingFace {
    return this._spec.mountFace;
  }

  get mountOffset(): Vector3d | undefined {
    return this._spec.mountOffset;
  }

  get render(): boolean | undefined {
    return this._spec.render;
  }

  get width(): number {
    return this._spec.width;
  }

  get range(): number {
    return this._spec.range;
  }
}
