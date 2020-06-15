import { Body, FixtureDef } from "planck-js";
import { v4 as uuid } from "uuid";
import * as THREE from "three";

/**
 * Base class representing an object that can be rendered in a scene
 * and take part in physics simulation.
 */
export abstract class SimObject {
  protected _mesh: THREE.Mesh;
  protected _body: Body;
  protected _children: SimObject[] = [];

  protected _type = "SimObject";

  private _guid: string;

  constructor(type: string) {
    this._guid = uuid();
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

  get children(): SimObject[] {
    return this._children;
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

  public setBody(body: Body): void {
    this._body = body;
  }

  /**
   * Update the object based on physics calculations
   * @param ms Time delta between now and the last time this function was run
   */
  public abstract update(ms: number): void;

  /**
   * returns the specification for the world's body
   */
  public abstract getBodySpecs(): {};
  public abstract getFixtureDef(): FixtureDef;
}
