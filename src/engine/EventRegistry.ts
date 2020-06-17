import { World, Contact, Fixture } from "planck-js";
import {
  IBasicSensorValue,
  ISimUserData,
  ISimSensorDescriptor,
} from "./specs/RobotSpecs";

type SensorCallback = (val: IBasicSensorValue) => void;
type SensorRegisty = Map<string, SensorCallback[]>;

function getSensorDescriptors(a: Fixture, b: Fixture): ISimSensorDescriptor[] {
  const aUserData: ISimUserData | null = a.getUserData() as ISimUserData;
  const bUserData: ISimUserData | null = a.getUserData() as ISimUserData;

  const result: ISimSensorDescriptor[] = [];

  if (aUserData && aUserData.sensor) {
    result.push(aUserData.sensor);
  }

  if (bUserData && bUserData.sensor) {
    result.push(bUserData.sensor);
  }

  return result;
}

export class EventRegistry {
  private _sensors: Map<string, SensorRegisty> = new Map<
    string,
    SensorRegisty
  >();

  constructor(world: World) {
    // Hook up the event listeners for the physics engine
    // This is for collisions
    world.on("begin-contact", this.onBeginContact.bind(this));
    world.on("end-contact", this.onEndContact.bind(this));
  }

  // World event handlers
  private onBeginContact(contact: Contact): void {
    this.updateContactSensors(contact, true);
  }

  private onEndContact(contact: Contact): void {
    this.updateContactSensors(contact, false);
  }

  private updateContactSensors(contact: Contact, hasContact: boolean): void {
    // Ensure that at least one of the fixtures has a ISimFixtureUserData
    if (
      contact.getFixtureA().getUserData() === null &&
      contact.getFixtureB().getUserData() === null
    ) {
      return;
    }

    const fixtureA: Fixture = contact.getFixtureA();
    const fixtureB: Fixture = contact.getFixtureB();

    const sensorDescriptors = getSensorDescriptors(fixtureA, fixtureB);

    // Bail out if none of these are sensors
    if (sensorDescriptors.length === 0) {
      return;
    }

    sensorDescriptors.forEach((sensor) => {
      this.broadcastContact(sensor, hasContact);
    });
  }

  private broadcastContact(
    sensor: ISimSensorDescriptor,
    hasContact: boolean
  ): void {
    const robotSensors = this._sensors.get(sensor.robotGuid);

    if (robotSensors === undefined) {
      return;
    }

    if (!robotSensors.has(sensor.sensorIdent)) {
      return;
    }

    robotSensors.get(sensor.sensorIdent).forEach((cb) => {
      cb({ value: hasContact ? 1.0 : 0.0 });
    });
  }

  registerSensor(
    robotGuid: string,
    sensorIdent: string,
    callback: SensorCallback
  ): void {
    if (!this._sensors.has(robotGuid)) {
      this._sensors.set(robotGuid, new Map<string, SensorCallback[]>());
    }

    const robotSensors: SensorRegisty = this._sensors.get(robotGuid);

    if (!robotSensors.has(sensorIdent)) {
      robotSensors.set(sensorIdent, []);
    }

    const callbackList = robotSensors.get(sensorIdent);
    callbackList.push(callback);
  }
}
