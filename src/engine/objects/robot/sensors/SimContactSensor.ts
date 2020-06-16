import { SimBasicSensor } from "./SimBasicSensor";
import {
  IContactSensorSpec,
  SensorOutputChannelType,
  IRobotSpec,
  SensorMountingFace,
} from "../../../specs/RobotSpecs";
import { World, Body, Vec2, Box, PrismaticJoint } from "planck-js";
import { Vector2d } from "../../../SimTypes";

function getMountFacePosition(
  robotSpec: IRobotSpec,
  mountFace: SensorMountingFace
): Vector2d {
  const initialPosition: Vector2d =
    robotSpec.initialPosition !== undefined
      ? robotSpec.initialPosition
      : { x: 0, y: 0 };
  const result: Vector2d = {
    x: initialPosition.x,
    y: initialPosition.y,
  };

  switch (mountFace) {
    case SensorMountingFace.FRONT:
      result.y += robotSpec.dimensions.z / 2;
      break;
    case SensorMountingFace.LEFT:
      result.x -= robotSpec.dimensions.x / 2;
      break;
    case SensorMountingFace.RIGHT:
      result.x += robotSpec.dimensions.x / 2;
      break;
    case SensorMountingFace.REAR:
      result.y -= robotSpec.dimensions.z / 2;
      break;
  }

  return result;
}

export class SimContactSensor extends SimBasicSensor {
  constructor(
    world: World,
    baseBody: Body,
    robotSpec: IRobotSpec,
    spec: IContactSensorSpec
  ) {
    super("ContactSensor", SensorOutputChannelType.DIGITAL, spec);

    const sensorPos = getMountFacePosition(robotSpec, spec.mountFace);

    // Create the body and fixture
    const sensorBody = world.createBody({
      type: "dynamic",
      position: new Vec2(sensorPos.x, sensorPos.y),
      angle: 0,
    });

    let fixtureX = 0;
    let fixtureY = 0;

    switch (spec.mountFace) {
      case SensorMountingFace.LEFT:
      case SensorMountingFace.RIGHT:
        fixtureX = spec.range;
        fixtureY = spec.width;
        break;
      case SensorMountingFace.FRONT:
      case SensorMountingFace.REAR:
        fixtureX = spec.width;
        fixtureY = spec.range;
        break;
    }

    sensorBody.createFixture({
      shape: new Box(fixtureX, fixtureY),
      density: 1,
      isSensor: true,
      userData: {
        sensor: {
          identifier: this.identifier,
        },
      },
    });

    world.createJoint(
      new PrismaticJoint(
        {
          enableLimit: true,
          lowerTranslation: 0,
          upperTranslation: 0,
        },
        baseBody,
        sensorBody,
        sensorBody.getWorldCenter(),
        new Vec2(1, 0)
      )
    );
  }

  get isActive(): boolean {
    return this._value > 0.0;
  }

  setActive(val: boolean): void {
    this._value = val ? 1.0 : 0.0;
  }
}
