import { IDefaultUnits, DefaultUnits, Unit } from "./units";
import { UnknownUnitError, IncompatibleUnitsError } from "./errors";

export class UnitConverter {
  private readonly _defaultUnits: IDefaultUnits;

  /**
   * @param {IDefaultUnits} defaultUnits Default simulator units
   */
  constructor(defaultUnits: IDefaultUnits = DefaultUnits) {
    this._defaultUnits = defaultUnits;
  }

  /**
   * @param {number} value Number that will be converted
   * @param {Unit} from Type of the given unit
   * @return {number} Return converted number
   */
  public toSimulatorUnits(value: number, from: Unit): number | never {
    if (!this._defaultUnits[from.type]) {
      throw new UnknownUnitError();
    }

    const multiplier: number =
      Math.round((from.value / this._defaultUnits[from.type].value) * 1000) /
      1000;

    return value * multiplier;
  }

  /**
   * @param {number} value Number that will be converted
   * @param {Unit} to Type of the given unit
   * @return {number} Return converted number
   */
  public fromSimulatorUnits(value: number, to: Unit): number | never {
    if (!this._defaultUnits[to.type]) {
      throw new UnknownUnitError();
    }

    const multiplier: number =
      Math.round((this._defaultUnits[to.type].value / to.value) * 1000) / 1000;

    return value * multiplier;
  }

  /**
   * @param {number} value Number that will be converted
   * @param {Unit} from Type of the given unit
   * @param {Unit} to Type of the returned unit
   * @return {number} Return converted number
   */
  public convert(value: number, from: Unit, to: Unit): number | never {
    if (from.type !== to.type) {
      throw new IncompatibleUnitsError();
    }

    const multiplier: number =
      Math.round((from.value / to.value) * 1000) / 1000;

    return value * multiplier;
  }
}
