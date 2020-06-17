import {
  BasicSensorOutputChannelType,
  IBasicSensorValue,
  IBasicSensorSpec,
} from "../../../specs/RobotSpecs";
import { SimObject } from "../../SimObject";
import { BodyDef, FixtureDef } from "planck-js";
import { EventRegistry } from "../../../EventRegistry";

export abstract class SimBasicSensor extends SimObject {
  protected _channel: number;
  protected _channelType: BasicSensorOutputChannelType;
  protected _sensorType: string;

  protected _value: IBasicSensorValue;

  protected _bodySpecs: BodyDef;
  protected _fixtureSpecs: FixtureDef;

  constructor(
    type: string,
    channelType: BasicSensorOutputChannelType,
    spec: IBasicSensorSpec
  ) {
    super("BasicSensor-" + type);
    this._channel = spec.channel;
    this._channelType = channelType;
    this._sensorType = type;
    this._value = { value: 0.0 };
  }

  get sensorType(): string {
    return this._sensorType;
  }

  get channel(): number {
    return this._channel;
  }

  get channelType(): BasicSensorOutputChannelType {
    return this._channelType;
  }

  get identifier(): string {
    return `${this._channelType}-${this._channel}`;
  }

  get value(): number {
    return this._value.value;
  }

  setValue(val: IBasicSensorValue): void {
    this._value = val;
  }

  getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  getFixtureDef(): FixtureDef {
    return this._fixtureSpecs;
  }

  protected abstract onSensorEvent(val: IBasicSensorValue): void;

  registerWithEventSystem(
    robotGuid: string,
    eventRegistry: EventRegistry
  ): void {
    eventRegistry.registerSensor(
      robotGuid,
      this.identifier,
      this.onSensorEvent.bind(this)
    );
  }
}
