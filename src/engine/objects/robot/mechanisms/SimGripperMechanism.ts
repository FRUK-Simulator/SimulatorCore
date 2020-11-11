import {
  Box,
  PrismaticJoint,
  Vec2,
  World,
  WeldJoint,
  WeldJointDef,
  PrismaticJointDef,
} from "planck-js";
import { getSensorMountPosition } from "../../../utils/RobotUtils";
import {
  IMechanismIOConfig,
  IMechanismSpec,
  IRobotSpec,
  SensorMountingFace,
  SensorSpec,
} from "../../../specs/RobotSpecs";
import { SimMechanism } from "./SimMechanism";
import * as THREE from "three";
import { SimGripperJaw } from "./SimGripperJaw";
import { EntityCategory, EntityMask } from "../RobotCollisionConstants";

enum GripperState {
  OPEN,
  CLOSING,
  OPENING,
  CLOSED_EMPTY,
  CLOSED_FULL,
}

const IO_TYPE_HELD = "held"; // held == 1 -> grabbed something, held == 0 nothing grabbed
const IO_TYPE_GRAB = "grab"; // set to 1 to start grabbing, set to 0 to open grabber

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
 * The mechanism has one input chanel and one output channel.
 *
 * The input channel IO_TYPE_GRAB informs the mechanism to either open the jaws:
 *    ...||...  ->  |.....|
 * or close the jaws
 *    |......|  ->  ...|...
 * the time it takes the jaws to close or open is fixed
 *
 * The output chanel IO_TYPE_HELD allows the operator to check if the grabbers are holding an item or not.
 * A value of 1.0 indicates that the grabber has hold of an object and 0.0 indicates the grabber is empty.
 */
export class SimGripperMechanism extends SimMechanism {
  private _state: GripperState = GripperState.OPEN;
  private _heldSensorChanel: number;
  private _mountFace: SensorMountingFace;
  private _jaws: SimGripperJaw[];
  private _slideJoint: PrismaticJoint;
  private _closeSpeed: number;
  private _openSpeed: number;

  constructor(robotGuid: string, spec: IMechanismSpec, robotSpec: IRobotSpec) {
    super("Gripper", robotGuid, spec);

    this._heldSensorChanel = spec.ioMap.find(
      (io) => io.id == IO_TYPE_HELD
    )?.channel;
    this._mountFace = spec.mountFace;

    if (!this._heldSensorChanel) {
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

    let range = 0.1;
    let backboard = 0.01;
    let jawThickness = 0.02;
    let width = robotSpec.dimensions.x;

    this._closeSpeed = 0.1;
    this._openSpeed = -0.1;

    switch (spec.mountFace) {
      case SensorMountingFace.LEFT:
      case SensorMountingFace.RIGHT:
        backboardDimensionX = backboard;
        backboardDimensionZ = width;
        break;
      case SensorMountingFace.FRONT:
      case SensorMountingFace.REAR:
        backboardDimensionX = width;
        backboardDimensionZ = backboard;
        break;
    }

    this._bodySpecs = {
      type: "dynamic", // sensors are always dynamic
      position: new Vec2(sensorPosition.x, sensorPosition.z),
      angle: 0,
      bullet: true,
    };
    this._fixtureSpecs = {
      shape: new Box(backboardDimensionX / 2, backboardDimensionZ / 2),
      density: 1,
      friction: 1,
      restitution: 0,
      isSensor: false,
      filterCategoryBits: EntityCategory.ROBOT_PART,
      filterMaskBits: EntityMask.ROBOT_PART,
    };
    let backboardGeom = new THREE.BoxGeometry(
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
        range,
        -robotSpec.dimensions.x / 2,
        spec,
        robotSpec
      ),
      new SimGripperJaw(
        jawThickness,
        range,
        robotSpec.dimensions.x / 2,
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

    let action = value >= 0.5 ? Action.CLOSE : Action.OPEN;

    console.log("Gripper setValue", value, action);
    switch (action) {
      case Action.OPEN:
        this._slideJoint.setMotorSpeed(this._closeSpeed);
        break;
      case Action.CLOSE:
        this._slideJoint.setMotorSpeed(this._openSpeed);
        break;
    }
  }

  public configureFixtureLinks(world: World) {
    // link jaw bodies to backboard
    let fixedJaw = this._jaws[0];
    let slideJaw = this._jaws[1];

    let jawAnchorFixed = fixedJaw.getInitialPosition();
    let jawAnchorSlide = slideJaw.getInitialPosition();

    let spec: WeldJointDef = {
      bodyA: this._body,
      bodyB: fixedJaw.body,
      localAnchorA: new Vec2(jawAnchorFixed.x, jawAnchorFixed.z),
      localAnchorB: new Vec2(0, -fixedJaw.getFrontOffset()),
    };

    console.log(spec);

    world.createJoint(new WeldJoint(spec));

    let slideSpec: PrismaticJointDef = {
      bodyA: this._body,
      bodyB: slideJaw.body,
      referenceAngle: 0,
      localAnchorA: new Vec2(0, jawAnchorSlide.z),
      localAnchorB: new Vec2(0, -fixedJaw.getFrontOffset()),
      localAxisA: new Vec2(1, 0),
      enableLimit: true,
      lowerTranslation: jawAnchorFixed.x + 0.1,
      upperTranslation: jawAnchorSlide.x,
      enableMotor: true,
      maxMotorForce: 500,
      motorSpeed: this._openSpeed,
    };

    console.log(slideSpec);

    this._slideJoint = new PrismaticJoint(slideSpec);
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
    //TODO(jp) implement
    // If grabber opening:
    //    if grabber is holding object, drop object.
    // if grabber is closing:
    //    check if there is anything between the grippers.
    //    grab item
  }

  public getProxySensors(): SensorSpec[] {
    return [
      {
        type: "mechanism-sensor",
        channel: this._heldSensorChanel,
        mountFace: this._mountFace,
        getValueCallback: this.getValue.bind(this, "held"),
      },
    ];
  }
}
