import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SimulatorConfig, WorldConfig } from "./SimulatorConfig";
import { makeGrid, GridPlane } from "./utils/GridUtil";
import { World, Vec2 } from "planck-js";
import { ISimObjectRef } from "./SimTypes";
import { SimObject } from "./objects/SimObject";
import {
  SimObjectSpec,
  IBallSpec,
  IBoxSpec,
  IWallSpec,
} from "./specs/CoreSpecs";
import { ObjectFactories } from "./objects/ObjectFactories";
import { BallHandle } from "./handles/BallHandle";
import { BoxHandle } from "./handles/BoxHandle";
import { WallHandle } from "./handles/WallHandle";
import { IRobotSpec } from "./specs/RobotSpecs";
import { SimRobot } from "./objects/robot/SimRobot";
import { RobotHandle } from "./handles/RobotHandle";

interface ISimObjectContainer {
  type: string;
  object: SimObject;
}

const DEFAULT_CONFIG: SimulatorConfig = {
  defaultWorld: {
    zLength: 10,
    xLength: 10,
    walls: [],

    camera: {
      position: {
        x: 0,
        y: 4,
        z: 5,
      },
    },
  },
};

export class Sim3D {
  private scene: THREE.Scene;
  private renderer: THREE.Renderer;

  private camera: THREE.PerspectiveCamera;
  private cameraControls: OrbitControls;

  private isRendering = false;

  private config: SimulatorConfig;

  private simObjects: Map<string, ISimObjectContainer>;
  private objectFactories: ObjectFactories;

  // Physics!
  private world: World;

  private lastAnimateTime = 0;

  constructor(private canvas: HTMLCanvasElement, config?: SimulatorConfig) {
    if (!config) {
      config = DEFAULT_CONFIG;
    }

    this.config = config;

    // SimObject registry
    this.simObjects = new Map<string, ISimObjectContainer>();

    // Physics Setup
    const gravity = new Vec2(0, 0);
    this.world = new World(gravity);

    // Scene
    const scene = (this.scene = new THREE.Scene());
    scene.background = new THREE.Color(0xeeeeee);

    // Renderer
    const renderer = (this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
    }));
    renderer.setSize(canvas.width, canvas.height);

    // Set up our object factories
    this.objectFactories = new ObjectFactories(this.scene, this.world);

    // If a default world is specified, configure it now
    // The reset method runs when configureWorld is called
    this.configureWorld(config.defaultWorld);

    // Axes
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);
  }

  private resetScene(config: WorldConfig) {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    // Camera
    const fov = 80;
    const aspect = this.canvas.width / this.canvas.height;
    const near = 0.01;
    const far = 100;
    const camera = (this.camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      near,
      far
    ));

    camera.position.z += config.camera ? config.camera.position.z : 0;
    camera.position.y += config.camera ? config.camera.position.y : 0;
    this.cameraControls = new OrbitControls(camera, this.renderer.domElement);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.x = 3;
    pointLight.position.y = 10;
    pointLight.position.z = 3;
    this.scene.add(pointLight);

    this.scene.add(new THREE.AmbientLight(0x333333));
  }

  /**
   * Configure the world
   *
   * This essentially means reset the simulator environment, and add the playing field (and walls if necessary)
   * @param worldConfig Configuration for the world
   */
  configureWorld(worldConfig: WorldConfig): void {
    this.resetScene(worldConfig);

    // Grid - By default, draw grid lines every 1 unit (metre)
    const grid = makeGrid(
      GridPlane.XZ,
      worldConfig.xLength / 2,
      worldConfig.zLength / 2,
      worldConfig.xLength,
      worldConfig.zLength
    );
    this.scene.add(grid);

    if (worldConfig.walls) {
      // We want walls
      if (worldConfig.walls.length === 0) {
        // // Empty array, generate the default set of walls (perimeter)
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
    }
  }

  onresize(): void {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.width, this.canvas.height);
  }

  render(): void {
    this.cameraControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  updatePhysics(time: number): void {
    this.simObjects.forEach((simObject) => {
      simObject.object.update(time);
    });
    this.world.step(time, 10, 8);
    this.world.clearForces();
  }

  beginRendering(): void {
    const r = (time: number) => {
      if (!this.isRendering) {
        return;
      }

      const dt = (time - this.lastAnimateTime) / 1000;
      this.lastAnimateTime = time;

      window.requestAnimationFrame(r);
      this.updatePhysics(dt);
      this.render();
    };

    this.isRendering = true;
    window.requestAnimationFrame(r);
  }

  stopRendering(): void {
    this.isRendering = false;
  }

  // Sim Object methods
  getSimObject(ref: ISimObjectRef): SimObject | undefined {
    if (!this.simObjects.has(ref.guid)) {
      return undefined;
    }

    const obj = this.simObjects.get(ref.guid);
    if (obj.type !== ref.type) {
      return undefined;
    }

    return obj.object;
  }

  private addGameObject<T1>(
    spec: SimObjectSpec,
    typeT: { new (simObject: SimObject, rootObject: SimObject): T1 }
  ): T1 | undefined {
    const obj = this.objectFactories.makeObject(spec);
    if (obj === undefined) {
      return undefined;
    }
    const body = this.world.createBody(obj.getBodySpecs());
    obj.setBody(body);
    body.createFixture(obj.getFixtureDef());

    this.addToScene(obj);
    this.simObjects.set(obj.guid, {
      type: obj.type,
      object: obj,
    });

    const simObjectRef = {
      guid: obj.guid,
      type: obj.type,
    };

    const rootObject = (this.getSimObject(
      simObjectRef
    ) as unknown) as SimObject;
    if (!rootObject) {
      throw new Error(
        `Unable to get SimObject with guid "${simObjectRef.guid}"`
      );
    }

    const handle = new typeT(obj, rootObject);
    return handle;
  }

  addBall(spec: IBallSpec): BallHandle | undefined {
    return this.addGameObject<BallHandle>(spec, BallHandle);
  }

  addBox(spec: IBoxSpec): BoxHandle | undefined {
    return this.addGameObject<BoxHandle>(spec, BoxHandle);
  }

  addWall(spec: IWallSpec): WallHandle | undefined {
    return this.addGameObject<WallHandle>(spec, WallHandle);
  }

  /**
   * Add this object (and any children) to the scene
   */
  private addToScene(simObject: SimObject): void {
    this.scene.add(simObject.mesh);
    simObject.children.forEach((simObj) => {
      this.addToScene(simObj);
    });
  }

  addRobot(spec: IRobotSpec): RobotHandle | undefined {
    const robot = new SimRobot(spec);

    const robotBody = this.world.createBody(robot.getBodySpecs());
    robot.setBody(robotBody);
    robotBody.createFixture(robot.getFixtureDef());

    // Create bodies and fixtures for the children
    robot.children.forEach((child) => {
      const childBody = this.world.createBody(child.getBodySpecs());
      child.setBody(childBody);
      childBody.createFixture(child.getFixtureDef());
    });

    // Tell the robot to configure the joints appropriately
    robot.configureFixtureLinks(this.world);

    this.addToScene(robot);
    this.simObjects.set(robot.guid, {
      type: robot.type,
      object: robot,
    });

    const simObjectRef = {
      guid: robot.guid,
      type: robot.type,
    };

    const robotRoot = (this.getSimObject(simObjectRef) as unknown) as SimRobot;
    if (!robotRoot) {
      throw new Error(
        `Unable to get SimObject with guid "${simObjectRef.guid}"`
      );
    }

    const handle = new RobotHandle(robot, robotRoot);
    return handle;
  }
}
