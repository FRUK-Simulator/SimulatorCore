import {
  SensorOutputChannelType,
  IBasicSensorSpec,
} from "../../../specs/RobotSpecs";

export abstract class SimBasicSensor {
  protected _channel: number;
  protected _channelType: SensorOutputChannelType;
  protected _sensorType: string;

  protected _value: number;

  constructor(
    type: string,
    channelType: SensorOutputChannelType,
    spec: IBasicSensorSpec
  ) {
    this._channel = spec.channel;
    this._channelType = channelType;
    this._sensorType = type;
  }

  get sensorType(): string {
    return this._sensorType;
  }

  get channel(): number {
    return this._channel;
  }

  get channelType(): SensorOutputChannelType {
    return this._channelType;
  }

  get identifier(): string {
    return `${this._channelType}-${this._channel}`;
  }

  get value(): number {
    return this._value;
  }

  set value(val: number) {
    this._value = val;
  }
}
