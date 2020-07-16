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
import { makeSimBall } from "./objects/Ball";
import { makeSimBox } from "./objects/Box";
import { makeSimWall } from "./objects/Wall";
import { Robot } from "./objects/Robot";
import * as BABYLON from "babylonjs";
import * as CANNON from "cannon";

window.CANNON = CANNON;

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
  private canvas: HTMLCanvasElement;
  private config: SimulatorConfig;
  private handleRegistry: HandleRegistry;

  constructor(private htmlCanvas: HTMLCanvasElement, config?: SimulatorConfig) {
    if (!config) {
      config = DEFAULT_CONFIG;
    }

    this.config = config;
    this.canvas = htmlCanvas;
    this.engine = new BABYLON.Engine(this.canvas, true);

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
    this.scene = new BABYLON.Scene(this.engine);
    let gravityVector = new BABYLON.Vector3(0, -10, 0);
    let physicsPlugin = new BABYLON.CannonJSPlugin();

    this.scene.enablePhysics(gravityVector, physicsPlugin);

    let camera = new BABYLON.ArcRotateCamera(
      "Camera",
      (3 * Math.PI) / 2,
      Math.PI / 3,
      50,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    camera.attachControl(this.canvas, true);

    let light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );
    light.intensity = 0.7;

    let ground = BABYLON.Mesh.CreateGround(
      "ground1",
      this.config.defaultWorld.xLength,
      this.config.defaultWorld.zLength,
      2,
      this.scene
    );
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(
      ground,
      BABYLON.PhysicsImpostor.BoxImpostor,
      { mass: 0, friction: 0.2, restitution: 0 },
      this.scene
    );

    this.buildWalls();
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

  addBox(spec: IBoxSpec): void {
    makeSimBox(spec, this.scene);
  }

  addBall(spec: IBallSpec): void {
    makeSimBall(spec, this.scene);
  }

  /**
   * Add a new, controllable robot to the simulation
   * @param spec Specification for a robot
   */
  addRobot(spec: IRobotSpec): Robot {
    const robot = new Robot(this.scene, new BABYLON.Vector3(-10, 8, 6));
    return robot;
  }

  /**
   * Build walls using the `defaultWorld` in config
   */
  private buildWalls(): void {
    const worldConfig = this.config.defaultWorld;

    makeSimWall(
      {
        type: "wall",
        start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        end: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        baseColor: 0x00ff00,
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      },
      this.scene
    );
    makeSimWall(
      {
        type: "wall",
        start: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        baseColor: 0xff0000,
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      },
      this.scene
    );
    makeSimWall(
      {
        type: "wall",
        start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        end: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      },
      this.scene
    );
    makeSimWall(
      {
        type: "wall",
        start: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
        end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
        height: worldConfig.perimeter.height,
        thickness: worldConfig.perimeter.thickness,
      },
      this.scene
    );
  }
}
