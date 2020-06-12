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

  private _guid: string;

  constructor(scene: Scene, world: World) {
    this._guid = uuid();
    this._world = world;
    this._scene = scene;
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

  protected addChild(child: SimObject) {
    this._children.push(child);
  }

  protected removeChild(child: SimObject | string) {
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
   * Safely accesses the children that is contained within this object.
   *
   * @param cb callback that is called once per object contained in this object
   */
  public forEachChild(cb: (obj: SimObject) => void) {
    this._children.forEach(cb);
  }

  /**
   * Update the object based on physics calculations
   * @param ms Time delta between now and the last time this function was run
   */
  public abstract update(ms: number): void;
}
