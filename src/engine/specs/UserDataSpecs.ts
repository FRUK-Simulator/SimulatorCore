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

export interface ZoneProperties {
  color?: number;
  order?: number; // counting from starting_render_order to 0, higher values are on top
}

export interface IZoneFixtureUserData extends IBaseFixtureUserData {
  type: "zone";
  zone: ZoneProperties;
}

export interface IFloorFrictionUserData extends IBaseFixtureUserData {
  type: "floorFriction";
}

export type SimUserData =
  | IFloorFrictionUserData
  | ISensorFixtureUserData
  | IZoneFixtureUserData;
