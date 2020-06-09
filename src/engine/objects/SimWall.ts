import * as THREE from "three";
import { SimObject, ISimObjectSpec } from "./SimObject";

export interface ISimWallSpec extends ISimObjectSpec {
    wallColor?: number;
}
export class SimWall extends SimObject {
    constructor(spec: ISimWallSpec) {
        super();

        const meshGeom = new THREE.BoxGeometry(spec.extents.xh * 2, spec.extents.yh * 2, spec.extents.zh * 2);
        const color = spec.wallColor !== undefined ? spec.wallColor : 0x226622;
        const wallMaterial = new THREE.MeshStandardMaterial({ color });

        const wallMesh = new THREE.Mesh(meshGeom, wallMaterial);
        wallMesh.position.x = spec.position.x;
        wallMesh.position.y = spec.position.y;
        wallMesh.position.z = spec.position.z;

        wallMesh.rotation.x = spec.rotation.x;
        wallMesh.rotation.y = spec.rotation.y;
        wallMesh.rotation.z = spec.rotation.z;

        this._mesh = wallMesh;

        // TODO create the physics body
    }
}