import { SimBasicSensor } from "./SimBasicSensor";
import { World, Body, Contact } from "planck-js";
import {
  IRobotSpec,
  BasicSensor,
  SensorOutputChannelType,
} from "../../../specs/RobotSpecs";
import { SimContactSensor } from "./SimContactSensor";

export class BasicSensorRegistry {
  private _sensors: Map<string, SimBasicSensor>;
  private _world: World;
  private _baseBody: Body;
  private _robotSpec: IRobotSpec;

  constructor(world: World, baseBody: Body, robotSpec: IRobotSpec) {
    this._sensors = new Map<string, SimBasicSensor>();
    this._world = world;
    this._baseBody = baseBody;
    this._robotSpec = robotSpec;

    world.on("begin-contact", this.onContactBegin.bind(this));
    world.on("end-contact", this.onContactEnd.bind(this));
  }

  getDigitalInput(channel: number): boolean {
    const ident = `${SensorOutputChannelType.DIGITAL}-${channel}`;
    if (!this._sensors.has(ident)) {
      return false;
    }

    return this._sensors.get(ident).value > 0.0;
  }

  addSensor(spec: BasicSensor): void {
    let sensor: SimBasicSensor;
    switch (spec.type) {
      case "contact-sensor":
        sensor = new SimContactSensor(
          this._world,
          this._baseBody,
          this._robotSpec,
          spec
        );
        break;
    }

    if (this._sensors.has(sensor.identifier)) {
      throw new Error(
        `Sensor identifier "${sensor.identifier}" already exists`
      );
    }

    this._sensors.set(sensor.identifier, sensor);
  }

  onContactBegin(contact: Contact): void {
    let sensorIdentifier = "";
    const userdataA: any = contact.getFixtureA().getUserData() as any;
    const userdataB: any = contact.getFixtureB().getUserData() as any;

    if (userdataA && userdataA.sensor) {
      sensorIdentifier = userdataA.sensor.identifier;
    } else if (userdataB && userdataB.sensor) {
      sensorIdentifier = userdataB.sensor.identifier;
    }

    if (sensorIdentifier !== "") {
      console.log("ContactBegin: " + sensorIdentifier);
      const sensor = this._sensors.get(sensorIdentifier);
      if (sensor.channelType === SensorOutputChannelType.DIGITAL) {
        sensor.value = 1.0;
      }
    }
  }

  onContactEnd(contact: Contact): void {
    let sensorIdentifier = "";
    const userdataA: any = contact.getFixtureA().getUserData() as any;
    const userdataB: any = contact.getFixtureB().getUserData() as any;

    if (userdataA && userdataA.sensor) {
      sensorIdentifier = userdataA.sensor.identifier;
    } else if (userdataB && userdataB.sensor) {
      sensorIdentifier = userdataB.sensor.identifier;
    }

    if (sensorIdentifier !== "") {
      console.log("ContactEnd: " + sensorIdentifier);
      const sensor = this._sensors.get(sensorIdentifier);
      if (sensor.channelType === SensorOutputChannelType.DIGITAL) {
        sensor.value = 0.0;
      }
    }
  }
}
