import faker from "faker";
import UnitConverter from "../UnitConverter";
import {
  UnknownUnitError,
  IncompatibleUnitsError,
} from "../UnitConverter/errors";
import { LengthUnit, AngleUnit } from "../UnitConverter/units";

describe("Unit converter", () => {
  const unitConverter: UnitConverter = new UnitConverter({
    length: { type: "length", value: 1 },
    angle: { type: "angle", value: 1 },
  });

  const lengthUnits = {
    millimeter: { type: "length", value: 0.001 },
    centimeter: { type: "length", value: 0.01 },
    inch: { type: "length", value: 0.0254 },
    feet: { type: "length", value: 0.3048 },
    meter: { type: "length", value: 1 },
  };

  const angleUnits = {
    degree: { type: "angle", value: 1 },
    radian: { type: "angle", value: 57.2958 },
  };

  const units = { ...lengthUnits, ...angleUnits };

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

    for (const key in units) {
      describe(`From ${key}`, () => {
        it("It should return correct converted number", (done) => {
          const number: number = faker.random.number();
          const convertedNumber: number = unitConverter.toSimulatorUnits(
            number,
            units[key]
          );

          expect(convertedNumber).toEqual(number * units[key].value);
          done();
        });
      });
    }
  });

  describe("From simulator units method", () => {
    describe("To unknown unit", () => {
      it("It should throw an error", (done) => {
        const number: number = faker.random.number();

        expect(() => {
          unitConverter.fromSimulatorUnits(number, {
            type: "testType",
            value: 1,
          });
        }).toThrow(UnknownUnitError);

        done();
      });
    });

    for (const key in units) {
      describe(`To ${key}`, () => {
        it("It should return correct converted number", (done) => {
          const number: number = faker.random.number();
          const convertedNumber: number = unitConverter.fromSimulatorUnits(
            number,
            units[key]
          );

          const multiplier: number =
            Math.round((1 / units[key].value) * 10000) / 10000;

          expect(convertedNumber).toEqual(number * multiplier);
          done();
        });
      });
    }
  });

  describe("Convert method", () => {
    describe("When types are incompatible", () => {
      it("It should throw an error", (done) => {
        const number: number = faker.random.number();

        expect(() => {
          unitConverter.convert(
            number,
            {
              type: "testType",
              value: 1,
            },
            {
              type: "testType2",
              value: 1,
            }
          );
        }).toThrow(IncompatibleUnitsError);

        done();
      });
    });

    describe("Millimeter to meter", () => {
      it("Should return correct converted number", (done) => {
        const value: number = faker.random.number();

        expect(
          unitConverter.convert(value, LengthUnit.MILLIMETER, LengthUnit.METER)
        ).toEqual(value * 0.001);
        done();
      });
    });

    describe("Feet to centimeter", () => {
      it("Should return correct converted number", (done) => {
        const value: number = faker.random.number();

        expect(
          unitConverter.convert(value, LengthUnit.FEET, LengthUnit.CENTIMETER)
        ).toEqual(value * 30.48);
        done();
      });
    });

    describe("Meter to inch", () => {
      it("Should return correct converted number", (done) => {
        const value: number = faker.random.number();

        expect(
          unitConverter.convert(value, LengthUnit.METER, LengthUnit.INCH)
        ).toEqual(value * 39.3701);
        done();
      });
    });

    describe("Inch to feet", () => {
      it("Should return correct converted number", (done) => {
        const value: number = faker.random.number();

        expect(
          unitConverter.convert(value, LengthUnit.INCH, LengthUnit.FEET)
        ).toEqual(value * 0.0833);
        done();
      });
    });

    describe("Degree to radian", () => {
      it("Should return correct converted number", (done) => {
        const value: number = faker.random.number();

        expect(
          unitConverter.convert(value, AngleUnit.DEGREE, AngleUnit.RADIAN)
        ).toEqual(value * 0.0175);
        done();
      });
    });

    describe("Radian to degree", () => {
      it("Should return correct converted number", (done) => {
        const value: number = faker.random.number();

        expect(
          unitConverter.convert(value, AngleUnit.RADIAN, AngleUnit.DEGREE)
        ).toEqual(value * 57.2958);
        done();
      });
    });
  });
});
