class Unit {
  public static getType(): string {
    if (this instanceof LengthUnit) return "length";
    if (this instanceof AngleUnit) return "angle";
  }
}

class LengthUnit extends Unit {
  public static readonly MILLIMETER = 0.001;
  public static readonly CENTIMETER = 0.01;
  public static readonly INCH = 0.0254;
  public static readonly FEET = 0.3048;
  public static readonly METER = 1;
}

class AngleUnit extends Unit {
  public static readonly DEGREE = 1;
  public static readonly RADIAN = 180.0 / Math.PI;
}

interface IDefaultUnits {
  length: LengthUnit;
  angle: AngleUnit;
}

const DefaultUnits = {
  length: LengthUnit.METER,
  angle: AngleUnit.DEGREE,
};

class UnitConverter {
  private readonly _defaultLengthUnit: LengthUnit;
  private readonly _defaultAngleUnit: AngleUnit;

  constructor(defaultUnits: IDefaultUnits = DefaultUnits) {
    this._defaultLengthUnit = defaultUnits.length;
    this._defaultAngleUnit = defaultUnits.angle;
  }

  // private areUnitsValid(): boolean {

  // };

  // public toSimulatorUnits(value: number, from: Unit, to: Unit): number {

  // };
}
/**
 * @param {number} value Number that will be converted
 * @param {Unit} from Type of the given number
 * @param {Unit} to Type of the returned number
 * @return {number} Return converted number
 */
export default (value: number, from: Unit, to: Unit): number => {
  const multiplier: number =
    Math.round((from / to + Number.EPSILON) * 1000) / 1000;
  return value * multiplier;
};
