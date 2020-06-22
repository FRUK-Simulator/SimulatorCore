type Unit = LengthUnit | AngleUnit;

export class LengthUnit {
  public static readonly MILLIMETER = new LengthUnit(0.001);
  public static readonly CENTIMETER = new LengthUnit(0.01);
  public static readonly INCH = new LengthUnit(0.0254);
  public static readonly FEET = new LengthUnit(0.3048);
  public static readonly METER = new LengthUnit(1);

  public static readonly type = "length";
  private constructor(
    public readonly value: number,
    public readonly type: string = "length"
  ) {}
}

export class AngleUnit {
  public static readonly DEGREE = new AngleUnit(1);
  public static readonly RADIAN = new AngleUnit(180.0 / Math.PI);

  public static readonly type = "angle";
  private constructor(
    public readonly value: number,
    public readonly type: string = "angle"
  ) {}
}

interface IDefaultUnits {
  length: LengthUnit;
  angle: AngleUnit;
}

const DefaultUnits = {
  length: LengthUnit.METER,
  angle: AngleUnit.DEGREE,
};

class IncompatibleUnitsError extends Error {
  public message: string = "Provided units are incompatible!";

  constructor() {
    super();
  }
}

class UnknownUnitError extends Error {
  public message: string = "Provided unit type is incorrect!";

  constructor() {
    super();
  }
}

//TODO: Split into more files
//TODO: Move defaults to the config file
//TODO: Create documentation
//TODO: Create tests
export class UnitConverter {
  private readonly _defaultUnits: IDefaultUnits;

  constructor(defaultUnits: IDefaultUnits = DefaultUnits) {
    this._defaultUnits = defaultUnits;
  }

  /**
   * @param {number} value Number that will be converted
   * @param {Unit} from Type of the given number
   * @param {Unit} to Type of the returned number
   * @return {number} Return converted number
   */
  public toSimulatorUnits(value: number, from: Unit): number | never {
    if (!DefaultUnits[from.type]) {
      throw new UnknownUnitError();
    }

    const multiplier: number =
      Math.round((from.value / DefaultUnits[from.type].value) * 1000) / 1000;

    return value * multiplier;
  }

  public fromSimulatorUnits(value: number, to: Unit): number | never {
    if (!DefaultUnits[to.type]) {
      throw new UnknownUnitError();
    }

    const multiplier: number =
      Math.round((DefaultUnits[to.type].value / to.value) * 1000) / 1000;

    return value * multiplier;
  }
}
