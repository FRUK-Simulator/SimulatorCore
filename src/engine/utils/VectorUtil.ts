import { Vector3d, Vector2d } from "../SimTypes";

export class Vector3dUtil {
  static add(a: Vector3d, b: Vector3d): Vector3d {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z,
    };
  }

  static subtract(a: Vector3d, b: Vector3d): Vector3d {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z,
    };
  }

  static multiplyScalar(a: Vector3d, mag: number): Vector3d {
    return {
      x: a.x * mag,
      y: a.y * mag,
      z: a.z * mag,
    };
  }

  static cross(a: Vector3d, b: Vector3d): Vector3d {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x,
    };
  }

  static dot(a: Vector3d, b: Vector3d): number {
    return a.x * b.x + a.y * b.y + a.z * a.z;
  }
}

export class Vector2dUtil {
  static add(a: Vector2d, b: Vector2d): Vector2d {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    };
  }

  static subtract(a: Vector2d, b: Vector2d): Vector2d {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
    };
  }

  static multiplyScalar(a: Vector2d, mag: number): Vector2d {
    return {
      x: a.x * mag,
      y: a.y * mag,
    };
  }

  static cross(a: Vector2d, b: Vector2d): Vector3d {
    return {
      x: 0,
      y: 0,
      z: a.x * b.y - a.y * b.x,
    };
  }

  static dot(a: Vector2d, b: Vector2d): number {
    return a.x * b.x + a.y * b.y;
  }
}
