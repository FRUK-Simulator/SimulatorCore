// Main unit: meter
export enum LengthUnit {
  MILLIMETER = 0.001,
  CENTIMETER = 0.01,
  INCH = 0.0254,
  FEET = 0.3048,
  METER = 1,
}

// Main unit: degree
export enum AngleUnit {
  DEGREE = 1,
  RADIAN = 180.0 / Math.PI,
}

type Unit = LengthUnit | AngleUnit;

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
