// Main unit: centimeter
export enum LengthUnit {
  MILLIMETER = 0.1,
  CENTIMETER = 1,
  INCH = 2.54,
  FEET = 30.48,
  METER = 100,
}

// Main unit: degree
export enum AngleUnit {
  DEGREE = 1,
  RADIAN = 57.3,
}

type Unit = LengthUnit | AngleUnit;

/**
 * @param {number} value Number that will be converted
 * @param {Unit} from Type of the given number
 * @param {Unit} to Type of the returned number
 * @return {number} Return converted number
 */
export default (value: number, from: Unit, to: Unit): number => {
  const multiplier: number = from / to;
  return value * multiplier;
};
