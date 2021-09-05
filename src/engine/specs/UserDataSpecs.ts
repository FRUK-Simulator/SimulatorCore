import { ISimSensorDescriptor } from "./RobotSpecs";

/**
 * Interface describing the bare minimum data that a Fixture has
 */
export interface IBaseFixtureUserData {
  selfGuid: string; // The GUID of the SimObject this fixture belongs to
  rootGuid?: string; // (optional) GUID of the top-level SimObject
  type: string;
  id?: string; // (optional) user defined identifier for object
}

export interface ISensorFixtureUserData extends IBaseFixtureUserData {
  type: "sensor";
  sensor: ISimSensorDescriptor;
}

export interface IZoneFixtureUserData extends IBaseFixtureUserData {
  type: "zone";
  zone: {
    color?: number;
  };
}

export type SimUserData =
  | IBaseFixtureUserData
  | ISensorFixtureUserData
  | IZoneFixtureUserData;
