import {
  IComplexSensorValue,
  IComplexSensorSpec,
} from "../../../specs/RobotSpecs";
import { SimObject } from "../../SimObject";
import { BodyDef, FixtureDef } from "planck-js";
import { EventRegistry } from "../../../EventRegistry";

/**
 * Abstract base class representing a ComplexSensor
 *
 * A ComplexSensor represents a physical sensor that provides feedback
 * via a JavsScript Object
 */
export abstract class SimComplexSensor extends SimObject {
  protected _channel: number;
  protected _sensorType: string;
  protected _bodySpecs: BodyDef;
  protected _fixtureSpecs: FixtureDef;

  /**
   * GUID of the robot that this sensor is attached to
   */
  protected _robotGuid: string;

  constructor(type: string, robotGuid: string, spec: IComplexSensorSpec) {
    super("ComplexSensor-" + type);
    this._channel = spec.channel;
    this._sensorType = type;
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
   * Robot-specific sensor identifier
   */
  get identifier(): string {
    return `${this._sensorType}-${this._channel}`;
  }

  /**
   * Current "public" value of this sensor
   *
   * This value represents what a physical sensor would send to its
   * controller. E.g. a distance sensor will convert the distance it
   * gets via the {@link onSensorEvent} callback into a voltage, and
   * return it here.
   *
   * In the base case, we just return an empty object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract getValue(): IComplexSensorValue;

  getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  getFixtureDefs(): FixtureDef[] {
    return [this._fixtureSpecs];
  }

  /**
   * Register this sensor with the simulator wide {@link EventRegistry}
   * @param robotGuid
   * @param eventRegistry
   */
  registerWithEventSystem(
    robotGuid: string,
    eventRegistry: EventRegistry
  ): void {
    eventRegistry.registerComplexSensor(robotGuid, this);
  }
}
