export type Unit = LengthUnit | AngleUnit;

/**
 * @unit Meter
 */
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

/**
 * @unit Degree
 */
export class AngleUnit {
  public static readonly DEGREE = new AngleUnit(1);
  public static readonly RADIAN = new AngleUnit(180.0 / Math.PI);

  public static readonly type = "angle";
  private constructor(
    public readonly value: number,
    public readonly type: string = "angle"
  ) {}
}

export interface IDefaultUnits {
  length: LengthUnit;
  angle: AngleUnit;
}

export const DefaultUnits = {
  length: LengthUnit.METER,
  angle: AngleUnit.DEGREE,
};
