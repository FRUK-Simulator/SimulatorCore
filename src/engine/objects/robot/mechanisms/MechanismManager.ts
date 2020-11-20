import { SimMechanism } from "./SimMechanism";
import { IRobotSpec, SensorSpec } from "../../../specs/RobotSpecs";
//import { SimGripperMechanism } from "./SimGripperMechanism";
import { EventRegistry } from "../../../EventRegistry";
import { SimGripperMechanism } from "./SimGripperMechanism";
import { SimRobot } from "../SimRobot";

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

  constructor(robotSpec: IRobotSpec, robotGuid: string, robot: SimRobot) {
    this._iomap = new Map();
    this.configureMechanisms(robotSpec, robotGuid, robot);
  }

  private configureMechanisms(
    robotSpec: IRobotSpec,
    robotGuid: string,
    robot: SimRobot
  ): void {
    if (!robotSpec.mechanisms) {
      return;
    }

    robotSpec.mechanisms.forEach((mechanismSpec) => {
      let mechanism: SimMechanism;

      if (mechanismSpec.type === "gripper-mechanism") {
        mechanism = new SimGripperMechanism(
          robotGuid,
          mechanismSpec,
          robotSpec,
          robot
        );
      }

      if (this._mechanisms.has(mechanism.identifier)) {
        throw new Error(
          `Mechanism with identifier "${mechanism.identifier}" already exists`
        );
      }
      this._mechanisms.set(mechanism.identifier, mechanism);

      for (let iomapping of mechanismSpec.ioMap) {
        this._iomap.set(iomapping.channel, {
          mechanismId: mechanism.identifier,
          ioIdentifier: iomapping.id,
        });
      }
    });
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
    let specs: SensorSpec[] = [];
    this._mechanisms.forEach((value: SimMechanism, key: string) => {
      let mechProxySensors = value.getProxySensors();

      specs.push(...mechProxySensors);
    });
    return specs;
  }
}
