import { SimMechanism } from "./SimMechanism";
import { IRobotSpec, SensorSpec } from "../../../specs/RobotSpecs";
//import { SimGripperMechanism } from "./SimGripperMechanism";
import { EventRegistry } from "../../../EventRegistry";

/**
 * Class representing a collection of robot mechanisms
 *
 * This class is not a SimObject, but instead a "manager" of SimObjects,
 * in this instance, SimMechanism objects.
 */
export class MechanismManager {
  private _mechanisms: Map<string, SimMechanism> = new Map<
    string,
    SimMechanism
  >();

  // map used to link robot channel numbers to a mechanism input
  private _iomap: Map<
    number,
    { mechanismId: string; ioIdentifier: string }
  > = new Map();

  constructor(robotSpec: IRobotSpec, robotGuid: string) {
    this.configureMechanisms(robotSpec, robotGuid);
  }

  private configureMechanisms(robotSpec: IRobotSpec, robotGuid: string): void {
    // TODO(JP): implement
    /*if (!robotSpec.mechanisms) {
      return;
    }

    robotSpec.mechanisms.forEach((mechanismSpec) => {
      let mechanism: SimMechanism;

      if (mechanismSpec.type === "gripper-mechanism") {
        mechanism = new SimGripperMechanism(
          mechanismSpec,
          robotGuid,
          robotSpec
        );
      }

      if (this._mechanisms.has(mechanism.identifier)) {
        throw new Error(
          `Mechanism with identifier "${mechanism.identifier}" already exists`
        );
      }
      this._mechanisms.set(mechanism.identifier, mechanism);
    });  */
  }

  /**
   * List of all currently registered {@link SimMechanism}s
   */
  get mechanisms(): SimMechanism[] {
    const result: SimMechanism[] = [];
    this._mechanisms.forEach((mechanism) => {
      result.push(mechanism);
    });

    return result;
  }

  registerWithEventSystem(
    robotGuid: string,
    eventRegistry: EventRegistry
  ): void {
    this.mechanisms.forEach((mechanism) => {
      mechanism.registerWithEventSystem(robotGuid, eventRegistry);
    });
  }

  setDigitalInput(channel: number, value: boolean): void {
    if (!this._iomap.has(channel)) {
      return;
    }

    let mapping = this._iomap.get(channel);

    if (!this._mechanisms.has(mapping.mechanismId)) {
      return;
    }

    let mechanism = this._mechanisms.get(mapping.mechanismId);
    mechanism.setValue(mapping.ioIdentifier, value);
  }

  getSensorSpecs(): SensorSpec[] {
    // TODO(JP): generate specs for all input sensors
    return [];
  }
}
