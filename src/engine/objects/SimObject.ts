import { Body } from "planck-js";
import { v4 as uuid } from "uuid";
import * as THREE from "three";
import { Vector3d, Extents3d } from "../SimTypes";

/**
 * Basic interface defining an object (right now it assumes a box)
 * Basic positional + sizing data
 */
export interface ISimObjectSpec {
    position: Vector3d;
    rotation: Vector3d;
    extents: Extents3d;
}

export abstract class SimObject {
    protected _mesh: THREE.Mesh;
    protected _body: Body;
    protected _children: SimObject[] = [];
    protected _parentGuid: string | undefined;

    private _guid: string;

    constructor(parentGuid?: string) {
        this._parentGuid = parentGuid;
        this._guid = uuid();
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
        }
        else {
            childId = child;
        }

        const childIdx = this._children.findIndex(obj => obj.guid === childId);
        if (childIdx !== -1) {
            this._children.splice(childIdx, 1);
        }
    }
}
