import * as THREE from "three";
import { CameraMode } from "./../../specs/CameraSpecs";
import { SimObject } from "./objects/SimObject";
import { Vector3d } from "./../../SimTypes";

/**
 * Camera Manager - A manager of cameras
 *
 * This class manages the position of the arena camera
 */
export class CameraManager {
  private _camera: THREE.Camera | undefined;
  private _currentMode: CameraMode = CameraMode.POSITION;

  // Third Person and Orbit tracked object
  private _trackedObject: SimObject | undefined;
  private _trackedGoal: THREE.Object3D | undefined;

  // Orbit Specific
  private _orbitOmega = 0; // angular velocity
  private _orbitAngle = 0;
  private _orbitRadius = 0;
  private _orbitHeight = 0;

  /**
   * Create a new CameraManager
   * @param camera
   */
  constructor(camera?: THREE.Camera) {
    if (camera) {
      this._camera = camera;
    }
  }

  /**
   * Set the camera to be managed
   * @param camera
   */
  setCamera(camera: THREE.Camera): void {
    this._camera = camera;
  }

  /**
   * Set this camera into position mode
   * @param pos Position to place the camera
   * @param lookAt Optional point to point the camera to
   */
  setPositionMode(pos: Vector3d, lookAt?: Vector3d): void {
    if (!this._camera) {
      return;
    }

    this.resetMode();

    this._currentMode = CameraMode.POSITION;

    this._camera.position.x = pos.x;
    this._camera.position.y = pos.y;
    this._camera.position.z = pos.z;

    if (lookAt) {
      this._camera.lookAt(new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z));
    }
  }

  /**
   * Set this camera into third-person (chase) mode
   * @param trackedObj Object to track
   * @param offset Offset of the camera relative to the tracked object
   */
  setThirdPersonMode(trackedObj: SimObject, offset?: Vector3d): void {
    if (!this._camera) {
      return;
    }

    this.resetMode();

    this._currentMode = CameraMode.THIRD_PERSON;

    let trackedOffset: Vector3d = {
      x: 1,
      y: 1,
      z: 1,
    };

    if (offset) {
      trackedOffset = offset;
    }

    // Set up a camera position that is the required offset away
    this._trackedObject = trackedObj;
    this._trackedGoal = new THREE.Object3D();
    this._trackedObject.mesh.add(this._trackedGoal);
    this._trackedGoal.position.set(
      trackedOffset.x,
      trackedOffset.y,
      trackedOffset.z
    );
  }

  /**
   * Set the camera into orbit mode. This will orbit the camera around the
   * tracked object at a particular speed, radius and height
   * @param trackedObj Object to orbit around
   * @param radius Distance away from object the camera is placed
   * @param height Height above ground the camera is placed
   * @param angularVelocity Optional angular velocity (in radians)
   */
  setOrbitMode(
    trackedObj: SimObject,
    radius: number,
    height: number,
    angularVelocity?: number
  ): void {
    if (!this._camera) {
      return;
    }

    this.resetMode();

    this._currentMode = CameraMode.ORBIT;

    this._trackedObject = trackedObj;

    this._orbitRadius = radius;
    this._orbitHeight = height;
    this._orbitOmega = angularVelocity || (Math.PI / 180) * 10;

    // Set the initial position
    const trackedOffset: Vector3d = {
      x: this._trackedObject.mesh.position.x,
      y: height,
      z: this._trackedObject.mesh.position.z + radius,
    };

    // No need for a goal, we can just directly manipulate the camera

    this._camera.position.x = trackedOffset.x;
    this._camera.position.y = trackedOffset.y;
    this._camera.position.z = trackedOffset.z;

    this._camera.lookAt(this._trackedObject.mesh.position);
  }

  update(time: number): boolean {
    switch (this._currentMode) {
      case CameraMode.POSITION:
        return false;
      case CameraMode.THIRD_PERSON:
        return this.handleThirdPerson();
      case CameraMode.ORBIT:
        return this.handleOrbit(time);
    }
  }

  private handleThirdPerson(): boolean {
    if (this._trackedGoal === undefined) {
      return false;
    }

    const temp = new THREE.Vector3(0, 0, 0);
    temp.setFromMatrixPosition(this._trackedGoal.matrixWorld);

    // Linear interpolate for smoothness
    this._camera.position.lerp(temp, 1);
    this._camera.lookAt(this._trackedObject.mesh.position);
    return true;
  }

  private handleOrbit(time: number): boolean {
    if (this._trackedObject === undefined) {
      return false;
    }

    // Update the angle
    this._orbitAngle += time * this._orbitOmega;

    // Calculate the new position
    this._camera.position.x =
      this._trackedObject.mesh.position.x +
      Math.sin(this._orbitAngle) * this._orbitRadius;
    this._camera.position.y = this._orbitHeight;
    this._camera.position.z =
      this._trackedObject.mesh.position.z +
      Math.cos(this._orbitAngle) * this._orbitRadius;

    this._camera.lookAt(this._trackedObject.mesh.position);
    return true;
  }

  private resetMode(): void {
    if (this._trackedObject && this._trackedGoal) {
      this._trackedObject.mesh.remove(this._trackedGoal);
    }
    this._trackedObject = undefined;
    this._trackedGoal = undefined;

    this._orbitAngle = 0;
    this._orbitOmega = 0;
  }
}
