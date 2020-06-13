import { Vector2d, Vector3d } from "../SimTypes";

export interface IPhysicsProperties {
  linearDamping?: number;
  angularDamping?: number;
  density?: number;
  friction?: number;
  restitution?: number;
}

export interface IBaseSimObjectSpec {
  isStatic: boolean;
  startingPosition: Vector2d;
  physicsProperties?: IPhysicsProperties;
  color?: number;
}

export interface IBallSpec extends IBaseSimObjectSpec {
  ballSpec: {
    radius: number;
  };
}

export function isBallSpec(spec: IBaseSimObjectSpec): spec is IBallSpec {
  return (spec as IBallSpec).ballSpec !== undefined;
}

export interface IBoxSpec extends IBaseSimObjectSpec {
  boxSpec: {
    dimensions: Vector3d;
  };
}

export function isBoxSpec(spec: IBaseSimObjectSpec): spec is IBoxSpec {
  return (spec as IBoxSpec).boxSpec !== undefined;
}
