import { SimComplexSensor } from "./SimComplexSensor";
import { SimColorSensor } from "./SimColorSensor";
import { ComplexSensorSpec, IRobotSpec } from "../../../specs/RobotSpecs";
import { EventRegistry } from "../../../EventRegistry";

/**
 * Class representing a collection of robot sensors
 *
 * This class is not a SimObject, but instead a "manager" or SimObjects,
 * in this instance, SimComplexSensor objects.
 */
export class ComplexSensorManager {
  private _sensors: Map<string, SimComplexSensor> = new Map<
    string,
    SimComplexSensor
  >();

  constructor(robotSpec: IRobotSpec, robotGuid: string) {
    this.configureSensors(robotSpec, robotGuid);
  }

  private configureSensors(robotSpec: IRobotSpec, robotGuid: string): void {
    if (!robotSpec.complexSensors) {
      return;
    }
    robotSpec.complexSensors.forEach((sensorSpec) => {
      this.addSensor(sensorSpec, robotSpec, robotGuid);
    });
  }

  /**
   * List of all currently registered {@link SimComplexSensor}s
   */
  get sensors(): SimComplexSensor[] {
    const result: SimComplexSensor[] = [];
    this._sensors.forEach((sensor) => {
      result.push(sensor);
    });

    return result;
  }

  addSensor(
    sensorSpec: ComplexSensorSpec,
    robotSpec: IRobotSpec,
    robotGuid: string
  ): void {
    let sensor: SimComplexSensor;
    // TODO move this to a factory
    if (sensorSpec.type === "color-sensor") {
      sensor = new SimColorSensor(sensorSpec, robotGuid, robotSpec);
    }

    if (this._sensors.has(sensor.identifier)) {
      throw new Error(
        `Sensor with identifier "${sensor.identifier}" already exists`
      );
    }
    this._sensors.set(sensor.identifier, sensor);
  }

  /**
   * Query a sensor for its current state.
   *
   * @param channel
   * @returns `true` if the sensor is active, `false` if inactive or unregistered
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getSensorInput(channel: number, type: string): any {
    const ident = `${type}-${channel}`;
    if (!this._sensors.has(ident)) {
      return {};
    }

    return this._sensors.get(ident).getValue().value;
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
