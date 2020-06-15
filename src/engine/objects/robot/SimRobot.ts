import * as THREE from "three";
import { SimObject } from "../SimObject";
import { SimRobotDrivetrain } from "./drivetrain/SimRobotDrivetrain";
import { World, Vec2, Box, PrismaticJoint } from "planck-js";
import { IRobotSpec } from "../../specs/RobotSpecs";

const ROBOT_DEFAULT_COLOR = 0x00ff00;

export class SimRobot extends SimObject {
  private _drivetrain: SimRobotDrivetrain;

  constructor(scene: THREE.Scene, world: World, spec: IRobotSpec) {
    super("SimRobot", scene, world);

    const color =
      spec.baseColor !== undefined ? spec.baseColor : ROBOT_DEFAULT_COLOR;
    const bodyGeom = new THREE.BoxGeometry(
      spec.dimensions.x,
      spec.dimensions.y,
      spec.dimensions.z
    );
    const bodyMaterial = new THREE.MeshStandardMaterial({ color });
    const bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);

    this._mesh = bodyMesh;

    const bodyPos: Vec2 = new Vec2(0, 0);
    if (spec.initialPosition) {
      bodyPos.x = spec.initialPosition.x;
      bodyPos.y = spec.initialPosition.y;
    }

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

    // Experimental
    const frontSensor = world.createBody({
      type: "dynamic",
      position: new Vec2(bodyPos.x, bodyPos.y + spec.dimensions.z / 2),
      angle: 0,
    });

    const frontSensorFixture = frontSensor.createFixture({
      shape: new Box(spec.dimensions.x / 2, 0.01),
      density: 1,
      isSensor: true,
      userData: {
        type: "front-sensor",
      },
    });

    const rearSensor = world.createBody({
      type: "dynamic",
      position: new Vec2(bodyPos.x, bodyPos.y - spec.dimensions.z / 2),
      angle: 0,
    });

    const rearSensorFixture = rearSensor.createFixture({
      shape: new Box(spec.dimensions.x / 2, 0.01),
      density: 1,
      isSensor: true,
      userData: {
        type: "rear-sensor",
      },
    });

    // Connect:
    this._world.createJoint(
      new PrismaticJoint(
        {
          enableLimit: true,
          lowerTranslation: 0,
          upperTranslation: 0,
        },
        this._body,
        frontSensor,
        frontSensor.getWorldCenter(),
        new Vec2(1, 0)
      )
    );

    this._world.createJoint(
      new PrismaticJoint(
        {
          enableLimit: true,
          lowerTranslation: 0,
          upperTranslation: 0,
        },
        this._body,
        rearSensor,
        rearSensor.getWorldCenter(),
        new Vec2(1, 0)
      )
    );

    // Configure the drivetrain
    this._drivetrain = new SimRobotDrivetrain(scene, world, spec, this._body);

    // Add the created wheels as children
    this._drivetrain.wheelObjects.forEach((wheel) => {
      this.addChild(wheel);
    });

    // Adjust our base mesh up
    this._mesh.translateY(-this._drivetrain.yOffset);
  }

  update(ms: number): void {
    // This will let the drivetrain update motor forces
    this._drivetrain.update();

    this._children.forEach((childObj) => {
      childObj.update(ms);
    });

    // Update the mesh
    const bodyCenter = this._body.getWorldCenter();
    this._mesh.position.x = bodyCenter.x;
    this._mesh.position.z = bodyCenter.y;

    this._mesh.rotation.y = -this._body.getAngle();
  }

  // External facing API
  setMotorPower(channel: number, value: number): void {
    this._drivetrain.setMotorPower(channel, value);
  }
}
