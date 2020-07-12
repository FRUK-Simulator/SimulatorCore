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
  IPyramidSpec,
  IWallSpec,
  IConeSpec,
  ICylinderSpec,
  IZoneSpec,
} from "./specs/CoreSpecs";
import { ObjectFactories } from "./objects/ObjectFactories";
import { BallHandle } from "./handles/BallHandle";
import { BoxHandle } from "./handles/BoxHandle";
import { PyramidHandle } from "./handles/PyramidHandle";
import { ConeHandle } from "./handles/ConeHandle";
import { CylinderHandle } from "./handles/CylinderHandle";
import { WallHandle } from "./handles/WallHandle";
import { IRobotSpec } from "./specs/RobotSpecs";
import { SimRobot } from "./objects/robot/SimRobot";
import { RobotHandle } from "./handles/RobotHandle";
import { EventRegistry } from "./EventRegistry";
import { generateDebugGeometry } from "./utils/PhysicsDebug";
import { HandleRegistry } from "./HandleRegistry";
import { DEFAULT_WALL_THICKNESS, DEFAULT_WALL_HEIGHT } from "./objects/SimWall";
import { ObjectHandle } from "./handles/ObjectHandle";
import { CameraModeSpec, CameraMode } from "./specs/CameraSpecs";
import { CameraManager } from "./CameraManager";
import { ZoneHandle } from "./handles/ZoneHandle";

interface ISimObjectContainer {
  type: string;
  object: SimObject;
}

const DEFAULT_CONFIG: SimulatorConfig = {
  defaultWorld: {
    zLength: 10,
    xLength: 10,
    perimeter: {
      height: DEFAULT_WALL_HEIGHT,
      thickness: DEFAULT_WALL_THICKNESS,
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

export class Sim3D {
  private scene: THREE.Scene;
  private renderer: THREE.Renderer;

  private debugMesh: THREE.Mesh;

  private camera: THREE.PerspectiveCamera;
  private cameraControls: OrbitControls;
  private cameraManager: CameraManager;

  private isRendering = false;

  private config: SimulatorConfig;

  private simObjects: Map<string, ISimObjectContainer>;
  private objectFactories: ObjectFactories;

  // Handle registry
  private handleRegistry: HandleRegistry;

  // Physics!
  private world: World;

  private lastAnimateTime = 0;

  // Events
  private eventRegistry: EventRegistry;

  constructor(private canvas: HTMLCanvasElement, config?: SimulatorConfig) {
    if (!config) {
      config = DEFAULT_CONFIG;
    }

    this.config = config;

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
  onresize(): void {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.width, this.canvas.height);
  }

  /**
   * Start the simulation
   */
  beginRendering(): void {
    const r = (time: number) => {
      if (!this.isRendering) {
        return;
      }

      // dt here is in seconds
      const dt = (time - this.lastAnimateTime) / 1000;
      this.lastAnimateTime = time;

      window.requestAnimationFrame(r);
      this.updatePhysics(dt);
      this.render(dt);
    };

    this.isRendering = true;
    window.requestAnimationFrame(r);
  }

  /**
   * Stop the simulation
   */
  stopRendering(): void {
    this.isRendering = false;
  }

  // Public API - Objects
  /**
   * Add a new Ball object to the simulation
   * @param spec Specification for a Ball
   */
  addBall(spec: IBallSpec): BallHandle | undefined {
    return this.addGameObject<BallHandle>(spec, BallHandle);
  }

  /**
   * Add a new Box object to the simulation
   * @param spec Specification for a Box
   */
  addBox(spec: IBoxSpec): BoxHandle | undefined {
    return this.addGameObject<BoxHandle>(spec, BoxHandle);
  }

  /**
   * Add a new Wall to the simulation
   * @param spec Specification for a Wall
   */
  addWall(spec: IWallSpec): WallHandle | undefined {
    return this.addGameObject<WallHandle>(spec, WallHandle);
  }

  /**
   * Add a new Pyramid to the simulation
   * @param spec Specification for a Pyramid
   */
  addPyramid(spec: IPyramidSpec): PyramidHandle | undefined {
    return this.addGameObject<PyramidHandle>(spec, PyramidHandle);
  }

  /**
   * Add a new Cone to the simulation
   * @param spec Specification for a Cone
   */
  addCone(spec: IConeSpec): ConeHandle | undefined {
    return this.addGameObject<ConeHandle>(spec, ConeHandle);
  }

  /**
   * Add a new Cylinder to the simulation
   * @param spec Specification for a Cylinder
   */
  addCylinder(spec: ICylinderSpec): CylinderHandle | undefined {
    return this.addGameObject<CylinderHandle>(spec, CylinderHandle);
  }

  /**
   * Add a new, controllable robot to the simulation
   * @param spec Specification for a robot
   */
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

    // Register with the event system
    robot.registerWithEventSystem(this.eventRegistry);

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

    const handle = new RobotHandle(robot, robotRoot, this.handleRegistry);
    return handle;
  }

  /**
   * Remove an object from the scene
   * @param handle Handle to the specified object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeObject(handle: ObjectHandle<any>): void {
    const rootObj = this.getSimObject(handle.ref);
    if (!rootObj) {
      return;
    }

    this.removeFromScene(rootObj);

    this.handleRegistry.invalidateHandle(handle.ref.guid);
  }

  addZone(spec: IZoneSpec): ZoneHandle {
    return this.addGameObject<ZoneHandle>(spec, ZoneHandle);
  }

  isDebugMode(): boolean {
    return this.debugMesh.visible;
  }

  setDebugMode(enabled: boolean): void {
    this.debugMesh.visible = enabled;
  }

  setCameraMode(spec: CameraModeSpec): void {
    if (spec.type === CameraMode.POSITION) {
      this.cameraManager.setPositionMode(spec.position);
    } else if (spec.type === CameraMode.THIRD_PERSON) {
      const simObj = this.getSimObject(spec.handle.ref);
      if (simObj) {
        this.cameraManager.setThirdPersonMode(simObj, spec.offset);
      }
    } else if (spec.type === CameraMode.ORBIT) {
      const simObj = this.getSimObject(spec.handle.ref);
      if (simObj) {
        this.cameraManager.setOrbitMode(
          simObj,
          spec.radius,
          spec.height,
          spec.angularVelocity
        );
      }
    }
  }

  /**
   * Destroy and recreate the 3D scene and physics world
   */
  private resetSceneAndWorld(): void {
    if (this.scene) {
      // Delete all items from the scene
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
    } else {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xeeeeee);
    }

    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: this.canvas,
      });
    }

    if (this.handleRegistry) {
      // Invalidate and delete all handles
      this.handleRegistry.deleteAllHandles();
    } else {
      this.handleRegistry = new HandleRegistry();
    }

    if (this.simObjects) {
      this.simObjects.clear();
      this.simObjects = undefined;
    }

    this.simObjects = new Map<string, ISimObjectContainer>();

    // Dispose the event registry
    if (this.eventRegistry) {
      this.eventRegistry.dispose();
      this.eventRegistry = undefined;
    }

    // Recreate the world
    this.world = new World(new Vec2(0, 0));

    // Recreate object factories
    this.objectFactories = new ObjectFactories(this.scene, this.world);

    // Recreate Event registry
    this.eventRegistry = new EventRegistry(this.world);

    // Recreate Camera Manager
    this.cameraManager = new CameraManager();

    // Debug
    const emptyGeometry = new THREE.Geometry();
    const debugMaterial = new THREE.MeshBasicMaterial();
    debugMaterial.color = new THREE.Color("black");
    debugMaterial.wireframe = true;
    this.debugMesh = new THREE.Mesh(emptyGeometry, debugMaterial);
    this.debugMesh.visible = false;
    this.scene.add(this.debugMesh);
  }

  /**
   * Initializes the basic scene using the `defaultWorld` in config
   */
  private initSceneAndWorld(): void {
    const worldConfig = this.config.defaultWorld;

    // Set up the lights and camera
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

    this.cameraManager.setCamera(this.camera);

    camera.position.z += worldConfig.camera ? worldConfig.camera.position.z : 0;
    camera.position.y += worldConfig.camera ? worldConfig.camera.position.y : 0;
    this.cameraControls = new OrbitControls(camera, this.renderer.domElement);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.x = 3;
    pointLight.position.y = 10;
    pointLight.position.z = 3;
    this.scene.add(pointLight);

    this.scene.add(new THREE.AmbientLight(0x333333));

    // Grid - By default, draw grid lines every 1 unit (metre)
    const grid = makeGrid(
      GridPlane.XZ,
      worldConfig.xLength / 2,
      worldConfig.zLength / 2,
      worldConfig.xLength,
      worldConfig.zLength
    );
    this.scene.add(grid);

    if (worldConfig.perimeter) {
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
    }

    // Axes
    const axesHelper = new THREE.AxesHelper(1);
    this.scene.add(axesHelper);
  }

  private render(time: number): void {
    // If the camera manager did NOT handle camera positioning
    // e.g. we are in POSITION mode, then fall back to the camera
    // controls update
    if (!this.cameraManager.update(time)) {
      this.cameraControls.update();
    }

    if (this.debugMesh.visible) {
      this.debugMesh.geometry = new THREE.Geometry();
      generateDebugGeometry(this.debugMesh.geometry, this.world);
    }
    this.renderer.render(this.scene, this.camera);
  }

  private updatePhysics(time: number): void {
    this.simObjects.forEach((simObject) => {
      simObject.object.update(time);
    });
    this.world.step(time, 10, 8);
    this.world.clearForces();
  }

  // Sim Object methods
  private getSimObject(ref: ISimObjectRef): SimObject | undefined {
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
    typeT: {
      new (
        simObject: SimObject,
        rootObject: SimObject,
        handleRegistry: HandleRegistry
      ): T1;
    }
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

    const handle = new typeT(obj, rootObject, this.handleRegistry);
    return handle;
  }

  /**
   * Add this object (and any children) to the scene
   * @private
   * @param simObject
   */
  private addToScene(simObject: SimObject): void {
    this.scene.add(simObject.mesh);
    simObject.children.forEach((simObj) => {
      this.addToScene(simObj);
    });
  }

  /**
   * Remove a SimObject (and all children) from the scene and world
   * @private
   * @param simObject
   */
  private removeFromScene(simObject: SimObject): void {
    this.scene.remove(simObject.mesh);
    this.world.destroyBody(simObject.body);
    simObject.children.forEach((simObj) => {
      this.removeFromScene(simObj);
    });
  }
}
