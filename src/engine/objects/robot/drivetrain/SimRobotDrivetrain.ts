import * as THREE from "three";
import {
  IRobotSpec,
  WheelMountingPoint,
  IRobotWheelAndMount,
} from "../../../specs/RobotSpecs";
import { SimRobotWheel } from "./SimRobotWheel";
import { SimMotor } from "./SimMotor";
import { Vector3d, Vector2d } from "../../../SimTypes";
import { Vector3dUtil } from "../../../utils/VectorUtil";
import { World, Body, PrismaticJoint, Vec2 } from "planck-js";
import { clamp } from "../../../utils/MathUtil";

function getMountPointPosition(
  robotSpec: IRobotSpec,
  mountPoint: WheelMountingPoint
): Vector3d {
  const initialPosition: Vector2d =
    robotSpec.initialPosition !== undefined
      ? robotSpec.initialPosition
      : { x: 0, y: 0 };
  const result: Vector3d = {
    x: initialPosition.x,
    y: 0,
    z: initialPosition.y,
  };

  switch (mountPoint) {
    case WheelMountingPoint.LEFT_CENTER:
      result.x -= robotSpec.dimensions.x / 2;
      break;
    case WheelMountingPoint.LEFT_FRONT:
      result.x -= robotSpec.dimensions.x / 2;
      result.z -= robotSpec.dimensions.z / 2;
      break;
    case WheelMountingPoint.LEFT_REAR:
      result.x -= robotSpec.dimensions.x / 2;
      result.z += robotSpec.dimensions.z / 2;
      break;
    case WheelMountingPoint.RIGHT_CENTER:
      result.x += robotSpec.dimensions.x / 2;
      break;
    case WheelMountingPoint.RIGHT_FRONT:
      result.x += robotSpec.dimensions.x / 2;
      result.z -= robotSpec.dimensions.z / 2;
      break;
    case WheelMountingPoint.RIGHT_REAR:
      result.x += robotSpec.dimensions.x / 2;
      result.z += robotSpec.dimensions.z / 2;
      break;
  }

  return result;
}

function getWheelPosition(
  robotSpec: IRobotSpec,
  wheelMount: IRobotWheelAndMount
): Vector3d {
  const baseMountPosition = getMountPointPosition(
    robotSpec,
    wheelMount.mountPoint
  );
  const offset =
    wheelMount.offset !== undefined ? wheelMount.offset : { x: 0, y: 0, z: 0 };
  return Vector3dUtil.add(baseMountPosition, offset);
}

/**
 * Class representing a robot drivetrain made up of wheelgroups and motorgroups
 */
export class SimRobotDrivetrain {
  private _wheelGroups: Map<string, SimRobotWheel[]> = new Map<
    string,
    SimRobotWheel[]
  >();
  private _motors: Map<number, SimMotor> = new Map<number, SimMotor>();
  private _wheelGroupToMotorChannels: Map<string, number[]> = new Map<
    string,
    number[]
  >();

  private _yOffset = 0;

  private _scene: THREE.Scene;
  private _world: World;
  private _baseBody: Body;

  constructor(
    scene: THREE.Scene,
    world: World,
    spec: IRobotSpec,
    baseBody: Body
  ) {
    // Set the low point to the chassis base to start
    this._yOffset = -spec.dimensions.y / 2;
    this._scene = scene;
    this._world = world;
    this._baseBody = baseBody;

    this.configureWheels(spec);
    this.configureMotors(spec);
    this.adjustWheelPositions();
  }

  private configureWheels(robotSpec: IRobotSpec): void {
    robotSpec.drivetrain.wheelGroups.forEach((wheelGroup) => {
      if (this._wheelGroups.has(wheelGroup.id)) {
        throw new Error(`Wheel Group "${wheelGroup.id}" already exists`);
      }

      const wheels: SimRobotWheel[] = [];
      this._wheelGroups.set(wheelGroup.id, wheels);

      wheelGroup.wheels.forEach((wheelAndMountSpec) => {
        const wheelPosition = getWheelPosition(robotSpec, wheelAndMountSpec);
        const lowPoint = wheelPosition.y - wheelAndMountSpec.wheel.radius;
        if (lowPoint < this._yOffset) {
          this._yOffset = lowPoint;
        }

        // Create the wheel
        const simWheel = new SimRobotWheel(
          this._scene,
          this._world,
          wheelAndMountSpec.wheel,
          wheelPosition
        );
        // Don't add child yet. We'll do this up in SimRobot

        wheels.push(simWheel);

        // Create the joint
        this._world.createJoint(
          new PrismaticJoint(
            {
              enableLimit: true,
              lowerTranslation: 0,
              upperTranslation: 0,
            },
            this._baseBody,
            simWheel.body,
            simWheel.body.getWorldCenter(),
            new Vec2(1, 0)
          )
        );
      });
    });
  }

  private configureMotors(robotSpec: IRobotSpec): void {
    robotSpec.drivetrain.motorGroups.forEach((motorGroup) => {
      if (!this._wheelGroups.has(motorGroup.wheelGroup)) {
        throw new Error(
          `Wheel Group "${motorGroup.wheelGroup}" does not exist`
        );
      }

      if (!this._wheelGroupToMotorChannels.has(motorGroup.wheelGroup)) {
        this._wheelGroupToMotorChannels.set(motorGroup.wheelGroup, []);
      }

      const channelsForGroup = this._wheelGroupToMotorChannels.get(
        motorGroup.wheelGroup
      );

      // A MotorGroup is a set of motors driving a wheel group
      motorGroup.motors.forEach((motor) => {
        if (this._motors.has(motor.channel)) {
          throw new Error(`Motor Channel ${motor.channel} already exists`);
        }
        this._motors.set(motor.channel, new SimMotor(motor));
        channelsForGroup.push(motor.channel);
      });
    });
  }

  private adjustWheelPositions() {
    this.wheelObjects.forEach((wheel) => {
      // We rotated the plane, so the X axis now points up
      wheel.mesh.translateX(-this.yOffset);
    });
  }

  get wheelObjects(): SimRobotWheel[] {
    const result: SimRobotWheel[] = [];
    this._wheelGroups.forEach((wheels) => {
      wheels.forEach((wheel) => {
        result.push(wheel);
      });
    });

    return result;
  }

  get yOffset(): number {
    return this._yOffset;
  }

  setMotorPower(channel: number, value: number): void {
    if (!this._motors.has(channel)) {
      return;
    }

    const motor = this._motors.get(channel);
    value = clamp(value, -1.0, 1.0);
    motor.inputSignal = value;
  }

  update(): void {
    // Run through the list of wheel groups, get the power for each
    // wheel and assign it to the SimWheel
    this._wheelGroups.forEach((wheels, id) => {
      // Get the average power for the motors assigned to this group
      const motorChannels = this._wheelGroupToMotorChannels.get(id);
      if (motorChannels === undefined) {
        return;
      }

      // Calculate average wheelgroup power
      let wheelGroupPower = 0;
      if (motorChannels.length > 0) {
        motorChannels.forEach((channel) => {
          wheelGroupPower += this._motors.get(channel).outputForce;
        });
        wheelGroupPower / -motorChannels.length;
      }

      // Divide up the force among the wheels in the group
      if (wheels.length > 0) {
        const forcePerWheel = wheelGroupPower / wheels.length;
        wheels.forEach((wheel) => {
          wheel.setForce(forcePerWheel);
        });
      }
    });
  }
}
