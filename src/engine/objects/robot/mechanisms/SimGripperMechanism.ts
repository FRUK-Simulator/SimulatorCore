import { Box, DistanceJoint, PrismaticJoint, Vec2, World } from "planck-js";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import {
  IGripperMechanismSpec,
  IRobotSpec,
  SensorMountingFace,
  SensorSpec,
} from "../../../specs/RobotSpecs";
import { SimMechanism } from "./SimMechanism";
import * as THREE from "three";
import { SimGripperJaw } from "./SimGripperJaw";
import { EntityCategory, EntityMask } from "../RobotCollisionConstants";
import { SimRobot } from "../SimRobot";
import { getObjectsBetween } from "../../../utils/PhysicsUtil";

enum GripperState {
  CLOSING,
  OPENING,
  CLOSED_EMPTY,
  CLOSED_FULL,
}

const IO_TYPE_HELD = "held"; // held == 1 -> grabbed something, held == 0 nothing grabbed
const IO_TYPE_GRAB = "grab"; // set to 1 to start grabbing, set to 0 to open grabber

const GRABBER_SENSOR_CHANNEL = -1; // TODO(jp) each instance needs its own channel. this sensor is not exposed outside the robot

const GRABBER_EMPTY_THRESH = 0.02;
/**
 * This mechanism enables the robot to grab objects in the scene.
 *
 * The physical model for this mechanism looks like this (top down):
 *
 *     |      |
 *     |......|
 *     ********
 *     *      *
 *     *      *
 *     ********
 *
 * Where *'s are the robots body, and the |'s are the jaws of the grabber and the .'s are the 'backboard'
 *
 * The mechanism has one input channel and one output channel.
 *
 * The input channel IO_TYPE_GRAB informs the mechanism to either open the jaws:
 *    ...||...  ->  |.....|
 * or close the jaws
 *    |......|  ->  ...|...
 * the time it takes the jaws to close or open is fixed
 *
 * The output channel IO_TYPE_HELD allows the operator to check if the grabbers are holding an item or not.
 * A value of 1.0 indicates that the grabber has hold of an object and 0.0 indicates the grabber is empty.
 */
export class SimGripperMechanism extends SimMechanism {
  private _state: GripperState;
  private _heldSensorChannel: number;
  private _mountFace: SensorMountingFace;
  private _jaws: SimGripperJaw[];
  private _slideJoint: PrismaticJoint;
  private _closeSpeed: number;
  private _openSpeed: number;
  private _width: number;
  private _spec: IGripperMechanismSpec;
  private _range: number;
  private _robot: SimRobot;
  private _grabbed: DistanceJoint;

  constructor(
    robotGuid: string,
    spec: IGripperMechanismSpec,
    robotSpec: IRobotSpec,
    robot: SimRobot
  ) {
    super("Gripper", robotGuid, spec);

    this._heldSensorChannel = spec.ioMap.find(
      (io) => io.id == IO_TYPE_HELD
    )?.channel;
    this._mountFace = spec.mountFace;

    if (!this._heldSensorChannel) {
      throw new Error(
        `Gripper Mechanism is missing '${IO_TYPE_HELD}' iomap entry`
      );
    }

    // Get mount positions
    const sensorPosition = getSensorMountPosition(
      robotSpec,
      spec.mountFace,
      spec.mountOffset
    );

    // Backboard object
    let backboardDimensionX = 0;
    let backboardDimensionZ = 0;

    const backboard = spec.jawStop || 0.02;
    const jawThickness = spec.jawThickness || 0.01;

    this._spec = spec;
    this._range = spec.depth;
    this._width = spec.maxWidth;
    this._closeSpeed = spec.closeSpeed || 0.1;
    this._openSpeed = -this._closeSpeed;
    this._robot = robot;
    this._state = GripperState.OPENING;

    switch (spec.mountFace) {
      case SensorMountingFace.LEFT:
      case SensorMountingFace.RIGHT:
        backboardDimensionX = backboard;
        backboardDimensionZ = spec.maxWidth;
        break;
      case SensorMountingFace.FRONT:
      case SensorMountingFace.REAR:
        backboardDimensionX = spec.maxWidth;
        backboardDimensionZ = backboard;
        break;
    }

    this._bodySpecs = {
      type: "dynamic", // sensors are always dynamic
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle: 0,
    };
    this._fixtureSpecs = {
      shape: new Box(backboardDimensionX / 2, backboardDimensionZ / 2),
      isSensor: false,
      density: 1,
      filterCategoryBits: EntityCategory.ROBOT_PART,
      filterMaskBits: EntityMask.ROBOT_PART,
    };
    const backboardGeom = new THREE.BoxGeometry(
      backboardDimensionX,
      robotSpec.dimensions.y,
      backboardDimensionZ
    );
    // Create meshes
    this._mesh = new THREE.Mesh(
      backboardGeom,
      new THREE.MeshStandardMaterial({ color: 0x003377 })
    );

    // Create jaws
    this._jaws = [
      new SimGripperJaw(
        jawThickness,
        spec.depth,
        -spec.maxWidth / 2,
        spec,
        robotSpec
      ),
      new SimGripperJaw(
        jawThickness,
        spec.depth,
        spec.maxWidth / 2,
        spec,
        robotSpec
      ),
    ];

    this._jaws.forEach(this.addChild.bind(this));
  }

  public getValue(ioIdentifier: string): number {
    if (ioIdentifier !== IO_TYPE_HELD) {
      throw new Error("Unsupported operation");
    }

    return this._state == GripperState.CLOSED_FULL ? 1.0 : 0.0;
  }

  public setValue(ioIdentifier: string, value: number | boolean): void {
    if (ioIdentifier !== IO_TYPE_GRAB) {
      throw new Error("Unsupported operation");
    }

    enum Action {
      CLOSE,
      OPEN,
    }

    const action = value >= 0.5 ? Action.CLOSE : Action.OPEN;

    console.log("Gripper setValue", value, action);
    switch (action) {
      case Action.OPEN:
        this._state = GripperState.OPENING;
        this._slideJoint.setMotorSpeed(this._openSpeed);
        break;
      case Action.CLOSE:
        this._state = GripperState.CLOSING;
        this._slideJoint.setMotorSpeed(this._closeSpeed);
        break;
    }
  }

  public configureFixtureLinks(world: World): void {
    // link jaw bodies to backboard
    const fixedJaw = this._jaws[0];
    const slideJaw = this._jaws[1];

    world.createJoint(
      new PrismaticJoint(
        {
          enableLimit: true,
          lowerTranslation: 0,
          upperTranslation: 0,
        },
        this._body,
        fixedJaw.body,
        fixedJaw.body.getWorldCenter(),
        new Vec2(1, 0)
      )
    );

    const slideSpec = {
      enableLimit: true,
      upperTranslation: this._width,
      lowerTranslation: 0,
      enableMotor: true,
      maxMotorForce: 1,
      motorSpeed: this._openSpeed,
    };

    this._slideJoint = new PrismaticJoint(
      slideSpec,
      this._body,
      slideJaw.body,
      slideJaw.body.getWorldCenter(),
      new Vec2(-1, 0)
    );

    world.createJoint(this._slideJoint);
  }

  public update(ms: number): void {
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();

    this._children.forEach((child) => {
      child.update(ms);
    });

    switch (this._state) {
      case GripperState.CLOSED_EMPTY:
        break;
      case GripperState.CLOSED_FULL:
        break;
      case GripperState.CLOSING:
        if (this.getGrabberWidth() < GRABBER_EMPTY_THRESH) {
          // grabbers are empty
          this._state = GripperState.CLOSED_EMPTY;
          break;
        }

        // check if there is anything between the grippers
        if (!this._robot.getDigitalInput(GRABBER_SENSOR_CHANNEL)) {
          // continue closing
          break;
        }

        this.grabObject();
        break;
      case GripperState.OPENING:
        // drop object
        this.releaseObject();
        break;
    }
  }
  releaseObject(): void {
    if (!this._grabbed) {
      return; // no object grabbed
    }

    // release object
    this._body.getWorld().destroyJoint(this._grabbed);

    this._grabbed = null;
  }
  grabObject(): void {
    if (this._grabbed) {
      return; // already grabbed object
    }

    const objects = getObjectsBetween(this._jaws[0].body, this._jaws[1].body);

    if (objects.length == 0) {
      return; // no object to grab
    }

    const object = objects[0];
    this._state = GripperState.CLOSED_FULL;

    // grab object
    const world = this._body.getWorld();

    this._grabbed = world.createJoint(
      new DistanceJoint(
        {
          collideConnected: false,
        },
        this._body,
        object,
        this._body.getWorldCenter(),
        object.getWorldCenter()
      )
    );
  }
  getGrabberWidth(): number {
    const pointA = this._jaws[0].body.getWorldCenter();
    const pointB = this._jaws[1].body.getWorldCenter();

    return pointA.clone().sub(pointB).length();
  }

  public getProxySensors(): SensorSpec[] {
    return [
      {
        type: "mechanism-sensor",
        channel: this._heldSensorChannel,
        mountFace: this._mountFace,
        getValueCallback: this.getValue.bind(this, "held"),
      },
      {
        type: "contact-sensor",
        mountFace: this._spec.mountFace,
        mountOffset: {
          x: this._spec.mountOffset.x,
          y: this._spec.mountOffset.y,
          z: this._spec.mountOffset.z - this._range / 2,
        },
        width: (this._width * 3) / 4,
        range: this._range / 3,
        channel: GRABBER_SENSOR_CHANNEL,
        render: false,
      },
    ];
  }
}
