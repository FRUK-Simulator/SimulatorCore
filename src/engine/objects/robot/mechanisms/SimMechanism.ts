import { IMechanismSpec, IMechanismIOConfig } from "../../../specs/RobotSpecs";
import { SimObject } from "../../SimObject";
import { BodyDef, FixtureDef } from "planck-js";
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

  getFixtureDef(): FixtureDef {
    return this._fixtureSpecs;
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
}
