import { SimBasicSensor } from "./SimBasicSensor";
import {
  IRobotSpec,
  BasicSensorOutputChannelType,
  BasicSensorSpec,
} from "../../../specs/RobotSpecs";
import { SimContactSensor } from "./SimContactSensor";
import { EventRegistry } from "../../../EventRegistry";
import { SimDistanceSensor } from "./SimDistanceSensor";
import { MechanismProxySensor } from "./MechanismProxySensor";
import { GyroscopeSensor } from "./GyroScopeSensor";

/**
 * Class representing a collection of robot sensors
 *
 * This class is not a SimObject, but instead a "manager" or SimObjects,
 * in this instance, SimBasicSensor objects.
 */
export class BasicSensorManager {
  private _sensors: Map<string, SimBasicSensor> = new Map<
    string,
    SimBasicSensor
  >();

  constructor(robotSpec: IRobotSpec, robotGuid: string) {
    this.configureSensors(robotSpec, robotGuid);
  }

  private configureSensors(robotSpec: IRobotSpec, robotGuid: string): void {
    if (!robotSpec.basicSensors) {
      return;
    }

    robotSpec.basicSensors.forEach((sensorSpec) => {
      this.addSensor(sensorSpec, robotSpec, robotGuid);
    });
  }

  /**
   * List of all currently registered {@link SimBasicSensor}s
   */
  get sensors(): SimBasicSensor[] {
    const result: SimBasicSensor[] = [];
    this._sensors.forEach((sensor) => {
      result.push(sensor);
    });

    return result;
  }

  addSensor(
    sensorSpec: BasicSensorSpec,
    robotSpec: IRobotSpec,
    robotGuid: string
  ): void {
    let sensor: SimBasicSensor;
    // TODO move this to a factory
    if (sensorSpec.type === "contact-sensor") {
      sensor = new SimContactSensor(sensorSpec, robotGuid, robotSpec);
    } else if (sensorSpec.type === "distance-sensor") {
      sensor = new SimDistanceSensor(sensorSpec, robotGuid, robotSpec);
    } else if (sensorSpec.type === "mechanism-sensor") {
      sensor = new MechanismProxySensor(sensorSpec, robotGuid);
    } else if (sensorSpec.type === "gyroscope-sensor") {
      sensor = new GyroscopeSensor(sensorSpec, robotGuid, robotSpec);
    }

    if (this._sensors.has(sensor.identifier)) {
      throw new Error(
        `Sensor with identifier "${sensor.identifier}" already exists`
      );
    }
    this._sensors.set(sensor.identifier, sensor);
  }

  /**
   * Query a digital sensor for its current state.
   *
   * @param channel
   * @returns `true` if the sensor is active, `false` if inactive or unregistered
   */
  getDigitalInput(channel: number): boolean {
    const ident = `${BasicSensorOutputChannelType.DIGITAL}-${channel}`;
    if (!this._sensors.has(ident)) {
      return false;
    }

    return this._sensors.get(ident).value > 0.0;
  }

  getAnalogInput(channel: number): number {
    const ident = `${BasicSensorOutputChannelType.ANALOG}-${channel}`;
    if (!this._sensors.has(ident)) {
      return 0.0;
    }

    return this._sensors.get(ident).value;
  }

  registerWithEventSystem(
    robotGuid: string,
    eventRegistry: EventRegistry
  ): void {
    this.sensors.forEach((sensor) => {
      sensor.registerWithEventSystem(robotGuid, eventRegistry);
    });
  }
}
