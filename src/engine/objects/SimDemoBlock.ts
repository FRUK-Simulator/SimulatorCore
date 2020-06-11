import * as THREE from "three";
import { SimObject } from "./SimObject";
import { World, Vec2, Box } from "planck-js";
import { Scene } from "three";

/**
 * Example of a dynamic SimObject that participates in the physics simulation
 */
export class SimDemoBlock extends SimObject {
    constructor(scene: Scene, world: World) {
        super(scene, world);

        // DEMO - Simple Red Box
        const meshGeom = new THREE.BoxGeometry(1, 1, 1);
        const blockMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const blockMesh = new THREE.Mesh(meshGeom, blockMaterial);

        blockMesh.position.y = 0.5;

        this._mesh = blockMesh;

        // Physics
        this._body = world.createBody({
            type: "dynamic",
            position: new Vec2(0, 0),
            angle: 0,
            linearDamping: 0.5,
            bullet: true,
            angularDamping: 0.3
        });

        this._body.createFixture({
            shape: new Box(0.5, 0.5),
            density: 1,
            isSensor: false,
            friction: 0.3,
            restitution: 0.4
        });
    }

    update(ms: number) {
        const force = this._body.getWorldVector(new Vec2(0, 1));
        force.mul(5);

        const bodyCenter = this._body.getWorldCenter();

        this._body.applyForce(force, bodyCenter);
        this._mesh.position.x = bodyCenter.x
        this._mesh.position.z = bodyCenter.y;

        this._mesh.rotation.y = -this._body.getAngle();
    }
}
