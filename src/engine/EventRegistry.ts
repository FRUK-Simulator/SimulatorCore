import { World, Contact, Fixture, Vec2 } from "planck-js";
import { ISimUserData, ISimSensorDescriptor } from "./specs/RobotSpecs";
import { SimBasicSensor } from "./objects/robot/sensors/SimBasicSensor";
import { SimDistanceSensor } from "./objects/robot/sensors/SimDistanceSensor";

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

const RAYCAST_UPDATE_INTERVAL_MS = 50;

/**
 * Simulator-wide Event Registry
 *
 * This class hooks into the currently loaded simulated world and listens
 * out for collision events. When events of interest are detected, the
 * registry will notify the appropriately subscribed {@link SimBasicSensor}
 * instance.
 */
export class EventRegistry {
  private _sensors: Map<string, SensorRegisty> = new Map<
    string,
    SensorRegisty
  >();

  private _world: World;

  private _timeSinceLastUpdate = 0;

  /**
   * Create a new EventRegistry and connect it to the provided world
   * @param world Currently loaded physics world
   */
  constructor(world: World) {
    // Hook up the event listeners for the physics engine
    // This is for collisions
    world.on("begin-contact", this.onBeginContact.bind(this));
    world.on("end-contact", this.onEndContact.bind(this));

    this._world = world;
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

  update(dtS: number): void {
    dtS *= 1000;
    this._timeSinceLastUpdate += dtS;
    if (this._timeSinceLastUpdate < RAYCAST_UPDATE_INTERVAL_MS) {
      return;
    }

    this._timeSinceLastUpdate = 0;

    // TODO we might want to throttle this...
    // Go through every current distance sensor
    this._sensors.forEach((sensorRegistry, robotGuid) => {
      sensorRegistry.forEach((sensor) => {
        // For each sensor...
        if (sensor.sensorType === "DistanceSensor") {
          const distSensor = <SimDistanceSensor>sensor;

          // NOTE!!! We subtract Pi here because we are 180 degrees rotated
          const angle = -distSensor.body.getAngle() - Math.PI;
          const bodyCenter = distSensor.body.getWorldCenter();

          const p1 = new Vec2(
            bodyCenter.x + Math.sin(angle) * distSensor.minRange,
            bodyCenter.y + Math.cos(angle) * distSensor.minRange
          );

          // TODO this should do a sweep
          const p2 = new Vec2(
            bodyCenter.x + Math.sin(angle) * distSensor.maxRange,
            bodyCenter.y + Math.cos(angle) * distSensor.maxRange
          );

          const detectionRange = distSensor.maxRange - distSensor.minRange;

          this._world.rayCast(
            p1,
            p2,
            (
              fixture: Fixture,
              p: Vec2,
              normal: Vec2,
              fraction: number
            ): number => {
              // Ignore everything that is part of the robot that this sensor is
              // attached to
              if (fixture.getUserData()) {
                const userData = fixture.getUserData() as ISimUserData;
                if (userData.robotGuid === robotGuid) {
                  return -1;
                }
              }

              sensor.onSensorEvent({
                value: fraction * detectionRange,
              });
              return fraction;
            }
          );
        }
      });
    });
  }
}
