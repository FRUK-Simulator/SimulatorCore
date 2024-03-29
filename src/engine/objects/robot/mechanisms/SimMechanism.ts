import {
  IMechanismSpec,
  IMechanismIOConfig,
  SensorSpec,
} from "../../../specs/RobotSpecs";
import { SimObject } from "../../SimObject";
import { BodyDef, FixtureDef, World } from "planck-js";
import { EventRegistry } from "../../../EventRegistry";

/**
 * Abstract base class representing a Mechanism
 *
 * A Mechanism represents a physical mechanism
 */
export abstract class SimMechanism extends SimObject {
  protected _configs: IMechanismIOConfig[];

  protected _bodySpecs: BodyDef;
  protected _fixtureSpecs: FixtureDef;

  /**
   * GUID of the robot that this mechanism is attached to
   */
  protected _robotGuid: string;

  constructor(type: string, robotGuid: string, spec: IMechanismSpec) {
    super("Mechanism-" + type);
    this._robotGuid = robotGuid;
    this._configs = spec.ioMap;
  }

  public abstract getValue(ioIdentifier: string): number | boolean;
  public abstract setValue(ioIdentifier: string, value: number | boolean): void;

  getBodySpecs(): BodyDef {
    return this._bodySpecs;
  }

  getFixtureDefs(): FixtureDef[] {
    return [this._fixtureSpecs];
  }

  // returns the proxy sensors to be added to the robots sensor manager
  getProxySensors(): SensorSpec[] {
    return [];
  }

  /**
   * Robot-specific mechanism identifier
   */
  get identifier(): string {
    return `${this._type}`;
  }

  /**
   * Register this mechanism with the simulator wide {@link EventRegistry}
   * @param robotGuid
   * @param eventRegistry
   */
  registerWithEventSystem(
    robotGuid: string,
    eventRegistry: EventRegistry
  ): void {
    eventRegistry.registerMechanism(robotGuid, this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configureFixtureLinks(world: World): void {
    // empty default implementation
  }
}
