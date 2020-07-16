import { IRobotHandle } from "../../../interface/IRobotHandle";
import { IRobotSpec } from "./../../../specs/RobotSpecs";
import * as BABYLON from "babylonjs";

export class Robot implements IRobotHandle {
  body: BABYLON.Mesh;

  frontLeftWheel: BABYLON.Mesh;
  frontRightWheel: BABYLON.Mesh;
  rearLeftWheel: BABYLON.Mesh;
  rearRightWheel: BABYLON.Mesh;

  frontLeftWheelJoint: BABYLON.HingeJoint;
  frontRightWheelJoint: BABYLON.HingeJoint;
  rearLeftWheelJoint: BABYLON.HingeJoint;
  rearRightWheelJoint: BABYLON.HingeJoint;

  static readonly frontLeftWheelPosition = new BABYLON.Vector3(3, -0.5, 3);
  static readonly frontRightWheelPosition = new BABYLON.Vector3(3, -0.5, -3);
  static readonly rearLeftWheelPosition = new BABYLON.Vector3(-3, -0.5, 3);
  static readonly rearRightWheelPosition = new BABYLON.Vector3(-3, -0.5, -3);

  constructor(scene: BABYLON.Scene, startPosition: BABYLON.Vector3) {
    this.body = this.createBody(scene);

    this.frontLeftWheel = this.createWheel(
      Robot.frontLeftWheelPosition,
      scene,
      1000
    );
    this.frontLeftWheelJoint = this.createHingeJoint(
      Robot.frontLeftWheelPosition
    );
    this.body.physicsImpostor.addJoint(
      this.frontLeftWheel.physicsImpostor,
      this.frontLeftWheelJoint
    );
    this.body.addChild(this.frontLeftWheel);

    this.frontRightWheel = this.createWheel(
      Robot.frontRightWheelPosition,
      scene,
      1000
    );
    this.frontRightWheelJoint = this.createHingeJoint(
      Robot.frontRightWheelPosition
    );
    this.body.physicsImpostor.addJoint(
      this.frontRightWheel.physicsImpostor,
      this.frontRightWheelJoint
    );
    this.body.addChild(this.frontRightWheel);

    this.rearLeftWheel = this.createWheel(
      Robot.rearLeftWheelPosition,
      scene,
      0
    );
    this.rearLeftWheelJoint = this.createHingeJoint(
      Robot.rearLeftWheelPosition
    );
    this.body.physicsImpostor.addJoint(
      this.rearLeftWheel.physicsImpostor,
      this.rearLeftWheelJoint
    );
    this.body.addChild(this.rearLeftWheel);

    this.rearRightWheel = this.createWheel(
      Robot.rearRightWheelPosition,
      scene,
      0
    );
    this.rearRightWheelJoint = this.createHingeJoint(
      Robot.rearRightWheelPosition
    );
    this.body.physicsImpostor.addJoint(
      this.rearRightWheel.physicsImpostor,
      this.rearRightWheelJoint
    );
    this.body.addChild(this.rearRightWheel);

    this.body.position = startPosition;
  }

  setMotorPower(channel: number, value: number): void {
    if (channel == 0) {
      this.frontLeftWheelJoint.setMotor(value, 100);
    } else {
      this.frontRightWheelJoint.setMotor(value, 100);
    }
  }

  getAnalogInput(channel: number): number {
    // TODO
    return 0;
  }

  createBody(scene: BABYLON.Scene): BABYLON.Mesh {
    var bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
    bodyMaterial.diffuseColor = BABYLON.Color3.Red();
    var body = BABYLON.MeshBuilder.CreateBox(
      "robotBody",
      { width: 6, depth: 6, height: 1 },
      scene
    );
    body.material = bodyMaterial;
    body.physicsImpostor = new BABYLON.PhysicsImpostor(
      body,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 100, restitution: 0 },
      scene
    );

    var head = BABYLON.MeshBuilder.CreateSphere("head", { diameter: 4 }, scene);
    head.position = new BABYLON.Vector3(0, 2, 0);
    body.addChild(head);

    var nose = BABYLON.MeshBuilder.CreateCylinder(
      "head",
      { height: 3, diameterTop: 3, diameterBottom: 0 },
      scene
    );
    nose.position = new BABYLON.Vector3(2, 2, 0);
    nose.rotation = new BABYLON.Vector3(0, 0, Math.PI / 2);
    body.addChild(nose);

    return body;
  }

  createWheel(
    position: BABYLON.Vector3,
    scene: BABYLON.Scene,
    friction: number
  ): BABYLON.Mesh {
    var wheelMaterial = new BABYLON.StandardMaterial("wheel", scene);
    wheelMaterial.diffuseTexture = new BABYLON.Texture(
      "images/amiga.png",
      scene
    );
    var wheel = BABYLON.MeshBuilder.CreateSphere(
      "wheel",
      { diameter: 2 },
      scene
    );
    wheel.position = position;
    wheel.material = wheelMaterial;
    wheel.physicsImpostor = new BABYLON.PhysicsImpostor(
      wheel,
      BABYLON.PhysicsImpostor.SphereImpostor,
      { mass: 5, restitution: 0, friction: friction },
      scene
    );

    return wheel;
  }

  createHingeJoint(position: BABYLON.Vector3): BABYLON.HingeJoint {
    var joint = new BABYLON.HingeJoint({
      mainPivot: position, // wheel rotates around this point
      connectedPivot: new BABYLON.Vector3(0, 0, 0), // vector center of wheel -> mainPivot
      mainAxis: new BABYLON.Vector3(0, 0, 1),
      connectedAxis: new BABYLON.Vector3(0, 0, 1),
    });

    return joint;
  }
}
