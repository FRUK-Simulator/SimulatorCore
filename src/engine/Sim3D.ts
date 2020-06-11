import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SimulatorConfig, WorldConfig } from "./SimulatorConfig";
import { makeGrid, GridPlane } from "./utils/GridUtil";
import { SimWall } from "./objects/SimWall";
import { World, Vec2 } from "planck-js";
import { SimRobot } from "./objects/SimRobot";

const DEFAULT_CONFIG: SimulatorConfig = {
    defaultWorld: {
        zLength: 10,
        xLength: 10,
        walls: [],

        camera: {
            position: {
                x: 0,
                y: 4,
                z: 5
            }
        }
    }
};

export class Sim3D {
    private scene: THREE.Scene;
    private renderer: THREE.Renderer;

    private camera: THREE.PerspectiveCamera;
    private cameraControls: OrbitControls;

    private isRendering: boolean = false;

    private config: SimulatorConfig;

    // Physics!
    private world: World;

    // DEMO
    private robot: SimRobot;

    private lastAnimateTime: number = 0;

    constructor(private canvas: HTMLCanvasElement, config?: SimulatorConfig) {
        if (!config) {
            config = DEFAULT_CONFIG;
        }

        this.config = config;

        // Physics Setup
        const gravity = new Vec2(0, 0);
        this.world = new World(gravity);

        // Scene
        const scene = (this.scene = new THREE.Scene());
        scene.background = new THREE.Color(0xeeeeee);

        // Renderer
        const renderer = (this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvas
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
        while(this.scene.children.length > 0) {
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
    configureWorld(worldConfig: WorldConfig) {
        this.resetScene(worldConfig);

        // Grid - By default, draw grid lines every 1 unit (metre)
        const grid = makeGrid(GridPlane.XZ, worldConfig.xLength / 2, worldConfig.zLength / 2, worldConfig.xLength, worldConfig.zLength);
        this.scene.add(grid);

        let walls: SimWall[] = [];
        if (worldConfig.walls) {
            // We want walls
            if (worldConfig.walls.length === 0) {
                // Empty array, generate the default set of walls (perimeter)
                walls = [
                    new SimWall(this.scene, this.world, {
                        start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2},
                        end: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2},
                        color: 0x00ff00
                    }),
                    new SimWall(this.scene, this.world, {
                        start: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2},
                        end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2},
                        color: 0xff0000
                    }),
                    new SimWall(this.scene, this.world, {
                        start: { x: -worldConfig.xLength / 2, y: -worldConfig.zLength / 2},
                        end: { x: -worldConfig.xLength / 2, y: worldConfig.zLength / 2},
                    }),
                    new SimWall(this.scene, this.world, {
                        start: { x: worldConfig.xLength / 2, y: -worldConfig.zLength / 2},
                        end: { x: worldConfig.xLength / 2, y: worldConfig.zLength / 2},
                    }),
                ]
            }
            else {
                worldConfig.walls.forEach(wallSpec => {
                    walls.push(new SimWall(this.scene, this.world, wallSpec));
                });
            }
        }

        walls.forEach(wall => {
            wall.addToScene();
        });

        const angleWall = new SimWall(this.scene, this.world, {
            start: { x: -5, y: 6},
            end: { x: 5, y: 8 }
        });

        angleWall.addToScene();

        this.robot = new SimRobot(this.scene, this.world);
        this.robot.addToScene();
    }

    onresize() {
        this.camera.aspect = this.canvas.width / this.canvas.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    render() {
        this.cameraControls.update();
        this.renderer.render(this.scene, this.camera);
    }

    updatePhysics(time: number) {
        this.robot.update(time);
        this.world.step(time, 10, 8);
        this.world.clearForces();
    }

    beginRendering() {
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

    stopRendering() {
        this.isRendering = false;
    }
}
