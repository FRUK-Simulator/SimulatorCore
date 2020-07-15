import { SimulatorConfig, WorldConfig } from "../../interface/SimulatorConfig";
import {
  SimObjectSpec,
  IBallSpec,
  IBoxSpec,
  IPyramidSpec,
  IWallSpec,
  IConeSpec,
  ICylinderSpec,
  IZoneSpec,
} from "./../../specs/CoreSpecs";
import { HandleRegistry } from "./../../HandleRegistry";
import { ISim3D } from "../../interface/ISim3D";
import { IRobotHandle } from "../../interface/IRobotHandle";
import { IRobotSpec } from "./../../specs/RobotSpecs";
import * as BABYLON from "babylonjs";
import * as CANNON from "cannon";

window.CANNON = CANNON;

class Robot implements IRobotHandle {
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

function createScene(
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement
): BABYLON.Scene {
  let scene = new BABYLON.Scene(engine);
  let gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  let physicsPlugin = new BABYLON.CannonJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);

  let camera = new BABYLON.ArcRotateCamera(
    "Camera",
    (3 * Math.PI) / 2,
    Math.PI / 3,
    50,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  let light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  let ground = BABYLON.Mesh.CreateGround("ground1", 80, 80, 2, scene);
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, friction: 0.2, restitution: 0 },
    scene
  );

  return scene;
}

const DEFAULT_CONFIG: SimulatorConfig = {
  defaultWorld: {
    zLength: 10,
    xLength: 10,
    perimeter: {
      height: 5,
      thickness: 1,
    },

    camera: {
      position: {
        x: 0,
        y: 4,
        z: 5,
      },
    },
  },
};

export class Sim3D implements ISim3D {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private config: SimulatorConfig;
  private handleRegistry: HandleRegistry;

  constructor(private canvas: HTMLCanvasElement, config?: SimulatorConfig) {
    if (!config) {
      config = DEFAULT_CONFIG;
    }

    this.config = config;

    this.engine = new BABYLON.Engine(canvas, true);
    this.scene = createScene(this.engine, canvas);

    this.resetSimulator();
  }

  // Public API - Core
  /**
   * Configure the world
   *
   * This essentially means reset the simulator environment, and add the playing field (and walls if necessary)
   * @param worldConfig Configuration for the world
   */
  configureWorld(worldConfig: WorldConfig): void {
    this.config.defaultWorld = worldConfig;
    this.resetSimulator();
  }

  /**
   * Reset the entire simulator and reload from configuration
   *
   * This method performs a clean-slate wipe of the simulator, removing all
   * 3D objects from the scene, all physics bodies as well as invalidating
   * any existing object handles. It then recreates the scene as provided
   * either in the initial configuration, or as specified via {@link configureWorld}.
   *
   * Calling this method will result in all previously added objects being removed
   * from the scene, and they will need to be re-added.
   */
  resetSimulator(): void {
    this.resetSceneAndWorld();
    this.initSceneAndWorld();
  }

  /**
   * Trigger a recalculation of the scene when resized
   */
  onresize(): void {}

  /**
   * Start the simulation
   */
  beginRendering(): void {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  /**
   * Stop the simulation
   */
  stopRendering(): void {
    this.engine.stopRenderLoop();
  }

  addBox(): void {
    let box = BABYLON.MeshBuilder.CreateBox(
      "box",
      { width: 3, depth: 3, height: 5 },
      this.scene
    );
    box.position.y = 10;
    let boxMaterial = new BABYLON.StandardMaterial("boxMaterial", this.scene);
    boxMaterial.diffuseColor = BABYLON.Color3.Magenta();
    box.material = boxMaterial;
    box.physicsImpostor = new BABYLON.PhysicsImpostor(
      box,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 50, restitution: 0.5 },
      this.scene
    );
  }

  /**
   * Add a new, controllable robot to the simulation
   * @param spec Specification for a robot
   */
  addRobot(spec: IRobotSpec): Robot {
    const robot = new Robot(this.scene, new BABYLON.Vector3(-10, 8, 6));

    // Register with the event system (for the sensors) and handle registry
    //robot.registerWithEventSystem(this.eventRegistry);
    //const handle = new RobotHandle(robot, robotRoot, this.handleRegistry);
    return robot;
  }

  /**
   * Destroy and recreate the 3D scene and physics world
   */
  private resetSceneAndWorld(): void {}

  /**
   * Initializes the basic scene using the `defaultWorld` in config
   */
  private initSceneAndWorld(): void {
    const worldConfig = this.config.defaultWorld;

    /*if (worldConfig.perimeter) {
      // Make a perimeter with the given height and thickness
      this.addWall({
        type: "wall",
        start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        end: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        baseColor: 0x00ff00,
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      });
      this.addWall({
        type: "wall",
        start: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        baseColor: 0xff0000,
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      });
      this.addWall({
        type: "wall",
        start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        end: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      });
      this.addWall({
        type: "wall",
        start: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      });
    } else if (worldConfig.walls) {
      console.warn(
        "Using worldConfig.walls will be deprecated in favor of the worldConfig.perimeter field"
      );
      if (worldConfig.walls.length === 0) {
        this.addWall({
          type: "wall",
          start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
          end: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
          baseColor: 0x00ff00,
        });
        this.addWall({
          type: "wall",
          start: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
          end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
          baseColor: 0xff0000,
        });
        this.addWall({
          type: "wall",
          start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
          end: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        });
        this.addWall({
          type: "wall",
          start: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
          end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        });
      } else {
        worldConfig.walls.forEach((wallSpec) => {
          this.addWall(wallSpec);
        });
      }
    }*/
  }
}
