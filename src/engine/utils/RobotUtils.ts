import { IRobotSpec, SensorMountingFace } from "../specs/RobotSpecs";
import { Vector3d, Vector2d } from "../SimTypes";
import { Vector3dUtil } from "./VectorUtil";

export function getSensorMountPosition(
  robotSpec: IRobotSpec,
  mountFace: SensorMountingFace,
  offset?: Vector3d
): Vector3d {
  const initialPosition: Vector2d =
    robotSpec.initialPosition !== undefined
      ? robotSpec.initialPosition
      : { x: 0, y: 0 };

  let result: Vector3d = {
    x: initialPosition.x,
    y: 0,
    z: initialPosition.y,
  };

  if (offset) {
    result = Vector3dUtil.add(result, offset);
  }

  switch (mountFace) {
    case SensorMountingFace.FRONT:
      result.z -= robotSpec.dimensions.z / 2;
      break;
    case SensorMountingFace.LEFT:
      result.x -= robotSpec.dimensions.x / 2;
      break;
    case SensorMountingFace.RIGHT:
      result.x += robotSpec.dimensions.x / 2;
      break;
    case SensorMountingFace.REAR:
      result.z += robotSpec.dimensions.z / 2;
      break;
  }

  return result;
}
