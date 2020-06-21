import faker from "faker";
import convertUnit, { LengthUnit, AngleUnit } from "../convertUnit";

describe("Convert unit function", () => {
  describe("Millimeter to meter", () => {
    it("Should return converted number", (done) => {
      const value: number = faker.random.number();

      expect(
        convertUnit(value, LengthUnit.MILLIMETER, LengthUnit.METER)
      ).toEqual(value * 0.001);
      done();
    });
  });

  describe("Feet to centimeter", () => {
    it("Should return converted number", (done) => {
      const value: number = faker.random.number();

      expect(
        convertUnit(value, LengthUnit.FEET, LengthUnit.CENTIMETER)
      ).toEqual(value * 30.48);
      done();
    });
  });

  describe("Meter to inch", () => {
    it("Should return converted number", (done) => {
      const value: number = faker.random.number();

      expect(convertUnit(value, LengthUnit.METER, LengthUnit.INCH)).toEqual(
        value * 39.37
      );
      done();
    });
  });

  describe("Inch to feet", () => {
    it("Should return converted number", (done) => {
      const value: number = faker.random.number();

      expect(convertUnit(value, LengthUnit.INCH, LengthUnit.FEET)).toEqual(
        value * 0.083
      );
      done();
    });
  });

  describe("Degree to radian", () => {
    it("Should return converted number", (done) => {
      const value: number = faker.random.number();

      expect(convertUnit(value, AngleUnit.DEGREE, AngleUnit.RADIAN)).toEqual(
        value * 0.017
      );
      done();
    });
  });

  describe("Radian to degree", () => {
    it("Should return converted number", (done) => {
      const value: number = faker.random.number();

      expect(convertUnit(value, AngleUnit.RADIAN, AngleUnit.DEGREE)).toEqual(
        value * 57.3
      );

      done();
    });
  });
});
