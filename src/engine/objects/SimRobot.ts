import * as THREE from "three";
import { Vector3d } from "../SimTypes";
import { SimObject } from "./SimObject";
import { ISimWheelSpec, SimWheel } from "./SimWheel";
import { World, Vec2, Box, PrismaticJoint } from "planck-js";
import { WheelMountingPoint } from "./MountPoints";
import { clamp } from "../utils/MathUtil";

export interface IRobotWheelGroup {
  id: string;
  wheelSpecs: ISimWheelSpec[];
}

export interface IMotorSpec {
  channel: number;
  maxPower: number;
}

export interface IMotorGroup {
  wheelGroupId: string;
  motors: IMotorSpec[];
}

export interface ISimRobotSpec {
  dimensions: Vector3d;
  startingPosition: Vector3d;
  wheelGroups: IRobotWheelGroup[];
  motorGroups: IMotorGroup[];
}

function getMountPointPosition(
  robotSpec: ISimRobotSpec,
  mountPoint: WheelMountingPoint
): Vector3d {
  const result: Vector3d = {
    x: robotSpec.startingPosition.x,
    y: robotSpec.startingPosition.y,
    z: robotSpec.startingPosition.z,
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

function vector3dAdd(a: Vector3d, b: Vector3d): Vector3d {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z,
  };
}

function getWheelPosition(
  robotSpec: ISimRobotSpec,
  wheelSpec: ISimWheelSpec
): Vector3d {
  const baseMountPosition: Vector3d = getMountPointPosition(
    robotSpec,
    wheelSpec.mountPosition.mountPoint
  );
  const offset =
    wheelSpec.mountPosition.offset !== undefined
      ? wheelSpec.mountPosition.offset
      : { x: 0, y: 0, z: 0 };
  return vector3dAdd(baseMountPosition, offset);
}

class SimMotor {
  private _maxPower: number;
  private _inputSignal: number; // [-1.0, 1.0]

  constructor(maxPower: number) {
    this._maxPower = maxPower;
    this._inputSignal = 0;
  }

  get currentPower(): number {
    return this._maxPower * this._inputSignal;
  }

  get inputSignal(): number {
    return this._inputSignal;
  }

  set inputSignal(val: number) {
    this._inputSignal = clamp(val, -1.0, 1.0);
  }
}

export class SimRobot extends SimObject {
  private _wheelGroups: Map<string, SimWheel[]> = new Map<string, SimWheel[]>();
  private _motors: Map<number, SimMotor> = new Map<number, SimMotor>();
  private _wheelGroupToMotorChannels: Map<string, number[]> = new Map<
    string,
    number[]
  >();

  private _yOffset: number;

  constructor(scene: THREE.Scene, world: World, spec: ISimRobotSpec) {
    super("SimRobot", scene, world);

    // Assuming that the box is created with center at (0,0,0)
    this._yOffset = -spec.dimensions.y / 2;

    const color = 0x00ff00;
    const bodyGeom = new THREE.BoxGeometry(
      spec.dimensions.x,
      spec.dimensions.y,
      spec.dimensions.z
    );
    const bodyMaterial = new THREE.MeshStandardMaterial({ color });
    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);

    this._mesh = bodyMesh;

    const bodyPos: Vec2 = new Vec2(0, 0);
    bodyPos.x = spec.startingPosition.x;
    bodyPos.y = spec.startingPosition.z;

    this._body = world.createBody({
      type: "dynamic",
      position: bodyPos,
      angle: 0,
      linearDamping: 0.5,
      bullet: true,
      angularDamping: 0.3,
    });

    this._body.createFixture({
      shape: new Box(spec.dimensions.x / 2, spec.dimensions.z / 2),
      density: 1,
      isSensor: false,
      friction: 0.3,
      restitution: 0.4,
    });

    this.configureWheels(spec);
    this.configureMotors(spec);

    // Translate all the bodies up
    // TODO, we can probably pre-compute this
    this._mesh.translateY(-this._yOffset);
    this._children.forEach((obj) => {
      if (obj instanceof SimWheel) {
        obj.mesh.translateX(-this._yOffset);
      }
    });
  }

  configureWheels(robotSpec: ISimRobotSpec): void {
    robotSpec.wheelGroups.forEach((wheelGroup) => {
      if (this._wheelGroups.has(wheelGroup.id)) {
        throw new Error(`Wheel Group "${wheelGroup.id}" already exists`);
      }

      const wheels: SimWheel[] = [];
      this._wheelGroups.set(wheelGroup.id, wheels);

      wheelGroup.wheelSpecs.forEach((wheelSpec) => {
        const wheelPosition = getWheelPosition(robotSpec, wheelSpec);
        const lowPoint = wheelPosition.y - wheelSpec.radius;

        // While we're adding wheels, calcualte the lowest point of the robot
        if (lowPoint < this._yOffset) {
          this._yOffset = lowPoint;
        }

        const simWheel = new SimWheel(
          this._scene,
          this._world,
          wheelSpec,
          wheelPosition
        );
        this.addChild(simWheel);

        // Add to our wheel group collection
        wheels.push(simWheel);

        // Add the fixtures
        this._world.createJoint(
          new PrismaticJoint(
            {
              enableLimit: true,
              lowerTranslation: 0,
              upperTranslation: 0,
            },
            this._body,
            simWheel.body,
            simWheel.body.getWorldCenter(),
            new Vec2(1, 0)
          )
        );
      });
    });
  }

  configureMotors(robotSpec: ISimRobotSpec): void {
    robotSpec.motorGroups.forEach((motorGroup) => {
      if (!this._wheelGroups.has(motorGroup.wheelGroupId)) {
        throw new Error(
          `Wheel Group "${motorGroup.wheelGroupId}" does not exist`
        );
      }

      if (!this._wheelGroupToMotorChannels.has(motorGroup.wheelGroupId)) {
        this._wheelGroupToMotorChannels.set(motorGroup.wheelGroupId, []);
      }

      const channelsForGroup = this._wheelGroupToMotorChannels.get(
        motorGroup.wheelGroupId
      );

      // A Motor group is a set of motors driving a wheel group
      motorGroup.motors.forEach((motor) => {
        if (this._motors.has(motor.channel)) {
          throw new Error(`Motor Channel ${motor.channel} already exists`);
        }
        this._motors.set(motor.channel, new SimMotor(motor.maxPower));
        channelsForGroup.push(motor.channel);
      });
    });
  }

  update(ms: number): void {
    // Run through the list of wheel groups, get the power for each wheel
    // and assign it to the SimWheel
    this._wheelGroups.forEach((wheels, id) => {
      // Get the average power for the motors assigned to this group
      const motorChannels = this._wheelGroupToMotorChannels.get(id);
      if (motorChannels === undefined) {
        return;
      }

      let wheelGroupPower = 0;
      if (motorChannels.length > 0) {
        motorChannels.forEach((channel) => {
          wheelGroupPower += this._motors.get(channel).currentPower;
        });
        wheelGroupPower /= motorChannels.length;
      }

      // divide up the wheelGroupPower by the number of wheels in the group
      if (wheels.length > 0) {
        const forcePerWheel = wheelGroupPower / wheels.length;
        wheels.forEach((wheel) => {
          wheel.setForce(forcePerWheel);
        });
      }
    });

    this._children.forEach((childObj) => {
      childObj.update(ms);
    });

    // Update the mesh
    const bodyCenter = this._body.getWorldCenter();

    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  setMotorPower(channel: number, value: number): void {
    if (!this._motors.has(channel)) {
      return;
    }

    const motor = this._motors.get(channel);
    value = clamp(value, -1.0, 1.0);
    motor.inputSignal = value;
  }
}
