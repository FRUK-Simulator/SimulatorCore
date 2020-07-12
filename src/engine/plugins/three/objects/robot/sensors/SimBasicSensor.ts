import {
  BasicSensorOutputChannelType,
  IBasicSensorValue,
  IBasicSensorSpec,
} from "../../../../../specs/RobotSpecs";
import { SimObject } from "../../SimObject";
import { BodyDef, FixtureDef } from "planck-js";
import { EventRegistry } from "../../../EventRegistry";

/**
 * Abstract base class representing a BasicSensor
 *
 * A BasicSensor represents a physical sensor that provides feedback
 * either via a digital channel (HIGH/LOW) or an analog channel (voltage)
 */
export abstract class SimBasicSensor extends SimObject {
  protected _channel: number;
  protected _channelType: BasicSensorOutputChannelType;
  protected _sensorType: string;

  protected _value: IBasicSensorValue;

  protected _bodySpecs: BodyDef;
  protected _fixtureSpecs: FixtureDef;

  /**
   * GUID of the robot that this sensor is attached to
   */
  protected _robotGuid: string;

  constructor(
    type: string,
    channelType: BasicSensorOutputChannelType,
    robotGuid: string,
    spec: IBasicSensorSpec
  ) {
    super("BasicSensor-" + type);
    this._channel = spec.channel;
    this._channelType = channelType;
    this._sensorType = type;
    this._value = { value: 0.0 };
    this._robotGuid = robotGuid;
  }

  /**
   * Sensor specific type identifier
   */
  get sensorType(): string {
    return this._sensorType;
  }

  /**
   * Channel number of this sensor
   */
  get channel(): number {
    return this._channel;
  }

  /**
   * Channel type (analog/digital) of this sensor
   */
  get channelType(): BasicSensorOutputChannelType {
    return this._channelType;
  }

  /**
   * Robot-specific sensor identifier
   */
  get identifier(): string {
    return `${this._channelType}-${this._channel}`;
  }

  /**
   * Current "public" value of this sensor
   *
   * This value represents what a physical sensor would send to its
   * controller. E.g. a distance sensor will convert the distance it
   * gets via the {@link onSensorEvent} callback into a voltage, and
   * return it here.
   *
   * In the base case, we just return the raw value as a number
   */
  get value(): number {
    return this._value.value;
  }

  /**
   * Update the value of this sensor
   *
   * Usually called via the {@link onSensorEvent} callback
   * @protected
   * @param val
   */
  protected setValue(val: IBasicSensorValue): void {
    this._value = val;
  }

  getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  getFixtureDef(): FixtureDef {
    return this._fixtureSpecs;
  }

  /**
   * Callback triggered whenever a sensor event happens
   * @param val
   */
  abstract onSensorEvent(val: IBasicSensorValue): void;

  /**
   * Register this sensor with the simulator wide {@link EventRegistry}
   * @param robotGuid
   * @param eventRegistry
   */
  registerWithEventSystem(
    robotGuid: string,
    eventRegistry: EventRegistry
  ): void {
    eventRegistry.registerSensor(robotGuid, this);
  }
}
