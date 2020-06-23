export class IncompatibleUnitsError extends Error {
  public message = "Provided units are incompatible!";

  constructor() {
    super();
  }
}

export class UnknownUnitError extends Error {
  public message = "Provided unit type is incorrect!";

  constructor() {
    super();
  }
}
