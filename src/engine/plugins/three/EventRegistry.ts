import { World, Contact, Fixture } from "planck-js";
import { ISimUserData, ISimSensorDescriptor } from "../../specs/RobotSpecs";
import { SimBasicSensor } from "./objects/robot/sensors/SimBasicSensor";

type SensorRegisty = Map<string, SimBasicSensor>;

function getSensorDescriptors(a: Fixture, b: Fixture): ISimSensorDescriptor[] {
  const aUserData: ISimUserData | null = a.getUserData() as ISimUserData;
  const bUserData: ISimUserData | null = b.getUserData() as ISimUserData;

  const result: ISimSensorDescriptor[] = [];

  if (aUserData && aUserData.sensor) {
    result.push(aUserData.sensor);
  }

  if (bUserData && bUserData.sensor) {
    result.push(bUserData.sensor);
  }

  return result;
}

/**
 * Simulator-wide Event Registry
 *
 * This class hooks into the currently loaded simulated world and listens
 * out for collision events. When events of interest are detected, the
 * registry will notify the appropriately subscribed {@link SimBasicSensor}
 * instance.
 *
 * We cluster all the Contact sensor events here since collision detection
 * is a global event, and it seems wasteful for every contact sensor to
 * maintain its own collision event handler.
 *
 * Additionally, this class can be used to listen out for simulator level
 * "collision" events e.g. object entering/exiting a zone, etc that can
 * then be broadcast to clients of the simulator, letting them implement
 * additional game logic.
 */
export class EventRegistry {
  private _sensors: Map<string, SensorRegisty> = new Map<
    string,
    SensorRegisty
  >();

  private _onDispose: () => void;

  /**
   * Create a new EventRegistry and connect it to the provided world
   * @param world Currently loaded physics world
   */
  constructor(world: World) {
    // Hook up the event listeners for the physics engine
    // This is for collisions
    const onBeginContantFunc: (
      contact: Contact
    ) => void = this.onBeginContact.bind(this);
    const onEndContantFunc: (contact: Contact) => void = this.onEndContact.bind(
      this
    );
    world.on("begin-contact", onBeginContantFunc);
    world.on("end-contact", onEndContantFunc);

    this._onDispose = () => {
      world.off("begin-contact", onBeginContantFunc);
      world.off("end-contact", onEndContantFunc);
    };
  }

  dispose(): void {
    this._onDispose();
  }

  // World event handlers
  /**
   * Event handler when a collision begins to occur (shapes overlapping)
   * @private
   * @param contact
   */
  private onBeginContact(contact: Contact): void {
    this.updateContactSensors(contact, true);
  }

  /**
   * Event handler when a collisions stops occuring (shapes have stopped overlapping)
   * @private
   * @param contact
   */
  private onEndContact(contact: Contact): void {
    this.updateContactSensors(contact, false);
  }

  /**
   * Broadcast a collision event to appropriate {@link SimContactSensor} instances
   * @private
   * @param contact
   * @param hasContact
   */
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

  /**
   * Inform {@link SimContactSensor}s of an update in their state
   * @private
   * @param sensor
   * @param hasContact
   */
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

    robotSensors
      .get(sensor.sensorIdent)
      .onSensorEvent({ value: hasContact ? 1.0 : 0.0 });
  }

  /**
   * Register a sensor callback
   *
   * This will end up getting called by a {@link SimRobot} instance as part
   * of its initialization routines
   * @param robotGuid
   * @param sensorIdent
   * @param callback
   */
  registerSensor(robotGuid: string, sensor: SimBasicSensor): void {
    if (!this._sensors.has(robotGuid)) {
      this._sensors.set(robotGuid, new Map<string, SimBasicSensor>());
    }

    const robotSensors: SensorRegisty = this._sensors.get(robotGuid);

    if (!robotSensors.has(sensor.identifier)) {
      robotSensors.set(sensor.identifier, sensor);
    }
  }
}
