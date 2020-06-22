import faker from "faker";
import UnitConverter from "../UnitConverter";
import { LengthUnit } from "../UnitConverter/units";
import { UnknownUnitError } from "../UnitConverter/errors";

describe("Unit converter", () => {
  const unitConverter: UnitConverter = new UnitConverter({
    length: { type: "length", value: 1 },
    angle: { type: "angle", value: 1 },
  });

  describe("To simulator units method", () => {
    describe("From unknown unit", () => {
      it("It should throw an error", (done) => {
        const number: number = faker.random.number();

        expect(() => {
          unitConverter.toSimulatorUnits(number, {
            type: "testType",
            value: 1,
          });
        }).toThrow(UnknownUnitError);

        done();
      });
    });

    describe("From millimeters", () => {
      it("It should return correct converted number", (done) => {
        const number: number = faker.random.number();
        const convertedNumber: number = unitConverter.toSimulatorUnits(
          number,
          LengthUnit.MILLIMETER
        );

        expect(convertedNumber).toEqual(number * 0.001);
        done();
      });
    });

    describe("From centimeters", () => {
      it("It should return correct converted number", (done) => {
        const number: number = faker.random.number();
        const convertedNumber: number = unitConverter.toSimulatorUnits(
          number,
          LengthUnit.CENTIMETER
        );

        expect(convertedNumber).toEqual(number * 0.01);
        done();
      });
    });

    describe("From inches", () => {
      it("It should return correct converted number", (done) => {
        const number: number = faker.random.number();
        const convertedNumber: number = unitConverter.toSimulatorUnits(
          number,
          LengthUnit.INCH
        );

        expect(convertedNumber).toEqual(number * 0.0254);
        done();
      });
    });

    describe("From foot", () => {
      it("It should return correct converted number", (done) => {
        const number: number = faker.random.number();
        const convertedNumber: number = unitConverter.toSimulatorUnits(
          number,
          LengthUnit.FEET
        );

        expect(convertedNumber).toEqual(number * 0.3048);
        done();
      });
    });

    describe("From meters", () => {
      it("It should return correct converted number", (done) => {
        const number: number = faker.random.number();
        const convertedNumber: number = unitConverter.toSimulatorUnits(
          number,
          LengthUnit.METER
        );

        expect(convertedNumber).toEqual(number);
        done();
      });
    });
  });
});
