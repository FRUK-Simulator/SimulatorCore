import { SimBasicSensor } from "./SimBasicSensor";
import { IRobotSpec } from "../../../specs/RobotSpecs";
import { SimContactSensor } from "./SimContactSensor";

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
      let sensor: SimBasicSensor;
      // TODO move this to a factory
      if (sensorSpec.type === "contact-sensor") {
        sensor = new SimContactSensor(
          sensorSpec,
          robotGuid,
          robotSpec,
          sensorSpec.render
        );
      }

      if (this._sensors.has(sensor.identifier)) {
        throw new Error(
          `Sensor with identifier "${sensor.identifier}" already exists`
        );
      }
      this._sensors.set(sensor.identifier, sensor);
    });
  }

  get sensors(): SimBasicSensor[] {
    const result: SimBasicSensor[] = [];
    this._sensors.forEach((sensor) => {
      result.push(sensor);
    });

    return result;
  }
}
