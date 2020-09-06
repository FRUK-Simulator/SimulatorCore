import { World, Contact, Fixture } from "planck-js";
import { ISimSensorDescriptor } from "./specs/RobotSpecs";
import {
  SimUserData,
  ISensorFixtureUserData,
  IBaseFixtureUserData,
  IZoneFixtureUserData,
} from "./specs/UserDataSpecs";
import { SimBasicSensor } from "./objects/robot/sensors/SimBasicSensor";
import { SimComplexSensor } from "./objects/robot/sensors/SimComplexSensor";
import { EventEmitter } from "events";

type BasicSensorRegisty = Map<string, SimBasicSensor>;
type ComplexSensorRegisty = Map<string, SimComplexSensor>;
type ObjectPartCount = Map<string, number>; // Object GUID -> number of instances in zone

function isSensorUserData(
  userData: SimUserData
): userData is ISensorFixtureUserData {
  return userData.type === "sensor";
}

function isZoneUserData(
  userData: SimUserData
): userData is IZoneFixtureUserData {
  return userData.type === "zone";
}

function getSensorDescriptors(a: Fixture, b: Fixture): ISimSensorDescriptor[] {
  const aUserData: SimUserData | null = a.getUserData() as SimUserData;
  const bUserData: SimUserData | null = b.getUserData() as SimUserData;

  const result: ISimSensorDescriptor[] = [];

  if (aUserData && isSensorUserData(aUserData)) {
    result.push(aUserData.sensor);
  }

  if (bUserData && isSensorUserData(bUserData)) {
    result.push(bUserData.sensor);
  }

  return result;
}

function isSameObject(a: Fixture, b: Fixture): boolean {
  const userDataA: SimUserData | null = a.getUserData() as SimUserData;
  const userDataB: SimUserData | null = b.getUserData() as SimUserData;

  // Ignore any collisions that are between elements in the
  if (userDataA && userDataB) {
    if (!userDataA.rootGuid) {
      if (userDataB.rootGuid === userDataA.selfGuid) {
        return true;
      }
    } else if (userDataA.rootGuid) {
      if (
        userDataA.rootGuid === userDataB.rootGuid ||
        userDataA.rootGuid === userDataB.selfGuid
      ) {
        return true;
      }
    }

    if (!userDataB.rootGuid) {
      if (userDataA.rootGuid === userDataB.selfGuid) {
        return true;
      }
    } else if (userDataB.rootGuid) {
      if (
        userDataA.rootGuid === userDataB.rootGuid ||
        userDataB.rootGuid === userDataA.selfGuid
      ) {
        return true;
      }
    }
  }

  return false;
}

function isZoneContact(a: Fixture, b: Fixture): boolean {
  if (a.getUserData() !== null) {
    if ((a.getUserData() as IBaseFixtureUserData).type === "zone") {
      return true;
    }
  }

  if (b.getUserData() !== null) {
    if ((b.getUserData() as IBaseFixtureUserData).type === "zone") {
      return true;
    }
  }

  return false;
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
export class EventRegistry extends EventEmitter {
  private _basicSensors: Map<string, BasicSensorRegisty> = new Map<
    string,
    BasicSensorRegisty
  >();

  private _complexSensors: Map<string, ComplexSensorRegisty> = new Map<
    string,
    ComplexSensorRegisty
  >();

  // Maps from Zone ID to ObjectPartCount
  private _zones: Map<string, ObjectPartCount> = new Map<
    string,
    ObjectPartCount
  >();

  private _onDispose: () => void;

  /**
   * Create a new EventRegistry and connect it to the provided world
   * @param world Currently loaded physics world
   */
  constructor(world: World) {
    super();

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
    this.updateColorSensors(contact, true);
    this.updateZones(contact, true);
  }

  /**
   * Event handler when a collisions stops occuring (shapes have stopped overlapping)
   * @private
   * @param contact
   */
  private onEndContact(contact: Contact): void {
    this.updateContactSensors(contact, false);
    this.updateColorSensors(contact, false);
    this.updateZones(contact, false);
  }

  /**
   * Broadcast a zone event to appropriate parties
   * @private
   * @param contact
   * @param hasContact
   */
  private updateZones(contact: Contact, hasContact: boolean): void {
    const fixtureA: Fixture = contact.getFixtureA();
    const fixtureB: Fixture = contact.getFixtureB();

    if (fixtureA.getUserData() === null && fixtureB.getUserData() === null) {
      return;
    }

    if (!isZoneContact(fixtureA, fixtureB)) {
      return;
    }

    const userDataA: SimUserData | null = fixtureA.getUserData() as SimUserData;
    const userDataB: SimUserData | null = fixtureB.getUserData() as SimUserData;

    let zoneId = "";
    let objectGuid = "";

    if (userDataA && isZoneUserData(userDataA)) {
      if (!userDataB) {
        return;
      }
      // A is the zone
      zoneId = userDataA.zone.id;

      if (userDataB.rootGuid !== undefined) {
        objectGuid = userDataB.rootGuid;
      } else {
        objectGuid = userDataB.selfGuid;
      }
    } else if (userDataB && isZoneUserData(userDataB)) {
      if (!userDataA) {
        return;
      }
      // B is the zone
      zoneId = userDataB.zone.id;

      if (userDataA.rootGuid !== undefined) {
        objectGuid = userDataA.rootGuid;
      } else {
        objectGuid = userDataA.selfGuid;
      }
    }

    if (hasContact) {
      // Contact begun
      // Look up the zone ID in the map
      if (!this._zones.has(zoneId)) {
        this._zones.set(zoneId, new Map<string, number>());
      }

      const zoneCollisions = this._zones.get(zoneId);
      let count = 0;
      if (zoneCollisions.has(objectGuid)) {
        count = zoneCollisions.get(objectGuid);
      }

      if (count === 0) {
        // This is the first time we are seeing this object guid
        this.emit("zone-entry", {
          zoneId,
          objectGuid,
        });
      }

      count++;
      zoneCollisions.set(objectGuid, count);
    } else {
      // If we don't have a zone, just bail out
      if (!this._zones.has(zoneId)) {
        return;
      }

      const zoneCollisions = this._zones.get(zoneId);
      if (!zoneCollisions.has(objectGuid)) {
        return;
      }

      let count = zoneCollisions.get(objectGuid);
      if (count === 0) {
        return;
      }

      count--;

      if (count <= 0) {
        this.emit("zone-exit", {
          zoneId,
          objectGuid,
        });
      }

      zoneCollisions.set(objectGuid, count);
    }
  }

  private updateColorSensors(contact: Contact, hasContact: boolean): void {
    if (
      contact.getFixtureA().getUserData() === null &&
      contact.getFixtureB().getUserData() === null
    ) {
      return;
    }

    const fixtureA: Fixture = contact.getFixtureA();
    const fixtureB: Fixture = contact.getFixtureB();
    const userDataA: SimUserData | null = fixtureA.getUserData() as SimUserData;
    const userDataB: SimUserData | null = fixtureB.getUserData() as SimUserData;

    if (isSameObject(fixtureA, fixtureB)) {
      return;
    }

    // Make sure one of these is a zone
    if (!isZoneContact(fixtureA, fixtureB)) {
      return;
    }

    const sensorDescriptors = getSensorDescriptors(fixtureA, fixtureB);

    // Bail out if none of these are sensors
    if (sensorDescriptors.length === 0) {
      return;
    }

    const colorSensorDescriptor: ISimSensorDescriptor = sensorDescriptors[0];
    if (colorSensorDescriptor.sensorType !== "ColorSensor") {
      return;
    }

    let zoneUserData: IZoneFixtureUserData;
    if (isZoneUserData(userDataA)) {
      zoneUserData = userDataA;
    } else if (isZoneUserData(userDataB)) {
      zoneUserData = userDataB;
    }

    // Zone color
    let zoneColor: number;
    if (hasContact) {
      zoneColor =
        zoneUserData.zone.color !== undefined
          ? zoneUserData.zone.color
          : 0xffffff;
    } else {
      zoneColor = 0xffffff; // Default to white
    }
    this.broadcastColor(colorSensorDescriptor, zoneColor);
  }

  /**
   * Inform {@link SimColorSensor}s of an update in their state
   * @private
   * @param sensor
   * @param color
   */
  private broadcastColor(sensor: ISimSensorDescriptor, color: number): void {
    const robotSensors = this._complexSensors.get(sensor.robotGuid);

    if (robotSensors === undefined) {
      return;
    }

    if (!robotSensors.has(sensor.sensorIdent)) {
      return;
    }

    robotSensors.get(sensor.sensorIdent).onSensorEvent({ value: { color } });
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

    // Bail out if both fixtures belong to the same root object
    if (isSameObject(fixtureA, fixtureB)) {
      return;
    }

    // Ensure that none of these are zones
    if (isZoneContact(fixtureA, fixtureB)) {
      return;
    }

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
    const robotSensors = this._basicSensors.get(sensor.robotGuid);

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
  registerBasicSensor(robotGuid: string, sensor: SimBasicSensor): void {
    if (!this._basicSensors.has(robotGuid)) {
      this._basicSensors.set(robotGuid, new Map<string, SimBasicSensor>());
    }

    const robotSensors: BasicSensorRegisty = this._basicSensors.get(robotGuid);

    if (!robotSensors.has(sensor.identifier)) {
      robotSensors.set(sensor.identifier, sensor);
    }
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
  registerComplexSensor(robotGuid: string, sensor: SimComplexSensor): void {
    if (!this._complexSensors.has(robotGuid)) {
      this._complexSensors.set(robotGuid, new Map<string, SimComplexSensor>());
    }

    const robotSensors: ComplexSensorRegisty = this._complexSensors.get(
      robotGuid
    );

    if (!robotSensors.has(sensor.identifier)) {
      robotSensors.set(sensor.identifier, sensor);
    }
  }
}
