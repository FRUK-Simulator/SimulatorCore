export class IncompatibleUnitsError extends Error {
  public message: string = "Provided units are incompatible!";

  constructor() {
    super();
  }
}

export class UnknownUnitError extends Error {
  public message: string = "Provided unit type is incorrect!";

  constructor() {
    super();
  }
}
