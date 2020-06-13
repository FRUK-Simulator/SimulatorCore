import { Body, World } from "planck-js";
import { v4 as uuid } from "uuid";
import * as THREE from "three";
import { Vector3d, Extents3d } from "../SimTypes";
import { Scene } from "three";

/**
 * Basic interface defining an object (right now it assumes a box)
 * Basic positional + sizing data
 */
export interface ISimObjectSpec {
  position: Vector3d;
  rotation: Vector3d;
  extents: Extents3d;
}

/**
 * Base class representing an object that can be rendered in a scene
 * and take part in physics simulation.
 */
export abstract class SimObject {
  protected _mesh: THREE.Mesh;
  protected _body: Body;
  protected _children: SimObject[] = [];

  protected _world: World;
  protected _scene: Scene;

  protected _type = "SimObject";

  private _guid: string;

  constructor(type: string, scene: Scene, world: World) {
    this._guid = uuid();
    this._world = world;
    this._scene = scene;
    this._type = type;
  }

  get type(): string {
    return this._type;
  }

  get guid(): string {
    return this._guid;
  }

  get mesh(): THREE.Mesh {
    return this._mesh;
  }

  get body(): Body {
    return this._body;
  }

  protected addChild(child: SimObject): void {
    this._children.push(child);
  }

  protected removeChild(child: SimObject | string): void {
    let childId: string;
    if (child instanceof SimObject) {
      childId = child.guid;
    } else {
      childId = child;
    }

    const childIdx = this._children.findIndex((obj) => obj.guid === childId);
    if (childIdx !== -1) {
      this._children.splice(childIdx, 1);
    }
  }

  /**
   * Add this object (and any children) to the scene
   */
  public addToScene(): void {
    this._scene.add(this._mesh);
    this._children.forEach((simObj) => {
      simObj.addToScene();
    });
  }

  /**
   * Update the object based on physics calculations
   * @param ms Time delta between now and the last time this function was run
   */
  public abstract update(ms: number): void;
}
