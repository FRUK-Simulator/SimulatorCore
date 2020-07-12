import { IMotorSpec } from "../../../../specs/RobotSpecs";
import { clamp } from "../../../../utils/MathUtil";

/**
 * Class representing a single controllable motor
 *
 * Takes an input signal and generates a force
 */
export class SimMotor {
  private _maxForce: number;
  private _inputSignal: number;
  // TODO Add additional properties as needed

  constructor(spec: IMotorSpec) {
    this._maxForce = spec.maxForce;
    this._inputSignal = 0;
  }

  /**
   * Get the currently generated force given current input signal
   */
  get outputForce(): number {
    return this._maxForce * this._inputSignal;
  }

  /**
   * Get the current input signal
   */
  get inputSignal(): number {
    return this._inputSignal;
  }

  set inputSignal(val: number) {
    this._inputSignal = clamp(val, -1.0, 1.0);
  }
}
