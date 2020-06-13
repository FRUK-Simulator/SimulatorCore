import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SimulatorConfig, WorldConfig } from "./SimulatorConfig";
import { makeGrid, GridPlane } from "./utils/GridUtil";
import { SimWall } from "./objects/SimWall";
import { World, Vec2 } from "planck-js";
import { SimDemoBlock } from "./objects/SimDemoBlock";
import { ISimObjectRef } from "./SimTypes";
import { SimObject } from "./objects/SimObject";
import { IBaseSimObjectSpec, isBallSpec, isBoxSpec } from "./specs/CoreSpecs";
import { SimBall } from "./objects/SimBall";
import { SimRobot, ISimRobotSpec } from "./objects/SimRobot";

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

interface ISimObjectContainer {
  type: string;
  object: SimObject;
}

export class Sim3D {
  private scene: THREE.Scene;
  private renderer: THREE.Renderer;

  private camera: THREE.PerspectiveCamera;
  private cameraControls: OrbitControls;

  private isRendering = false;

  private config: SimulatorConfig;

  private objects: Map<string, ISimObjectContainer>;

  // Physics!
  private world: World;
  private lastAnimateTime = 0;

  constructor(private canvas: HTMLCanvasElement, config?: SimulatorConfig) {
    if (!config) {
      config = DEFAULT_CONFIG;
    }

    this.config = config;

    this.objects = new Map<string, ISimObjectContainer>();

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

    let walls: SimWall[] = [];
    if (worldConfig.walls) {
      // We want walls
      if (worldConfig.walls.length === 0) {
        // Empty array, generate the default set of walls (perimeter)
        walls = [
          new SimWall(this.scene, this.world, {
            start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
            end: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
            color: 0x00ff00,
          }),
          new SimWall(this.scene, this.world, {
            start: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
            end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
            color: 0xff0000,
          }),
          new SimWall(this.scene, this.world, {
            start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
            end: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
          }),
          new SimWall(this.scene, this.world, {
            start: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2 },
            end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2 },
          }),
        ];
      } else {
        worldConfig.walls.forEach((wallSpec) => {
          walls.push(new SimWall(this.scene, this.world, wallSpec));
        });
      }
    }

    walls.forEach((wall) => {
      wall.addToScene();
    });
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
    this.objects.forEach((container) => {
      const obj = container.object;
      obj.update(time);
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

  getSimObject(ref: ISimObjectRef): SimObject | undefined {
    if (!this.objects.has(ref.guid)) {
      return undefined;
    }

    const obj = this.objects.get(ref.guid);
    if (obj.type !== ref.type) {
      return undefined;
    }

    return obj.object;
  }

  addGameObject(spec: IBaseSimObjectSpec): ISimObjectRef | undefined {
    let obj: SimObject;

    if (isBallSpec(spec)) {
      obj = new SimBall(this.scene, this.world, {
        static: spec.isStatic,
        radius: spec.ballSpec.radius,
        startingPosition: spec.startingPosition,
        color: spec.color,
      });
    } else if (isBoxSpec(spec)) {
      obj = new SimDemoBlock(this.scene, this.world, {
        startingPosition: spec.startingPosition,
        dimensions: spec.boxSpec.dimensions,
        color: spec.color,
      });
    }

    if (obj === undefined) {
      return obj;
    }

    obj.addToScene();
    this.objects.set(obj.guid, {
      type: obj.type,
      object: obj,
    });

    return {
      guid: obj.guid,
      type: obj.type,
    };
  }

  // addObject(objSpec: any): ISimObjectRef | undefined {
  //   // Factory method to generate a object
  //   return undefined;
  // }

  addRobot(spec: ISimRobotSpec): ISimObjectRef {
    const robot = new SimRobot(this.scene, this.world, spec);
    robot.addToScene();

    this.objects.set(robot.guid, {
      type: robot.type,
      object: robot,
    });

    return {
      guid: robot.guid,
      type: robot.type,
    };
  }
}
