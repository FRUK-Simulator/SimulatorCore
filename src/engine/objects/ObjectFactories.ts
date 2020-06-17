import * as THREE from "three";
import { SimObject } from "./SimObject";
import { World } from "planck-js";
import { makeSimBall } from "./SimBall";
import { makeSimBox } from "./SimBox";
import { SimObjectSpec } from "../specs/CoreSpecs";
import { makeSimWall } from "./SimWall";
import { makeSimPyramid } from "./SimPyramid";

export class ObjectFactories {
  private _factories: Map<string, (spec: SimObjectSpec) => SimObject>;
  private _scene: THREE.Scene;
  private _world: World;

  constructor(scene: THREE.Scene, world: World) {
    this._factories = new Map<string, (spec: SimObjectSpec) => SimObject>();
    this._scene = scene;
    this._world = world;

    // Register all factory methods here
    // The `type` that is registered with the factory should be the same
    // string used as part of its IBaseSimObjectSpec type
    this.registerFactory("ball", makeSimBall);
    this.registerFactory("box", makeSimBox);
    this.registerFactory("wall", makeSimWall);
    this.registerFactory("pyramid", makeSimPyramid);
  }

  private registerFactory(
    type: string,
    factoryFunc: (spec: SimObjectSpec) => SimObject
  ) {
    this._factories.set(type, factoryFunc.bind(undefined));
  }

  public makeObject(spec: SimObjectSpec): SimObject | undefined {
    if (!this._factories.has(spec.type)) {
      return undefined;
    }
    return this._factories.get(spec.type)(spec);
  }
}
