import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SimulatorConfig from "./SimulatorConfig";
import { makeGrid, GridPlane } from "./utils/GridUtil";

const DEFAULT_CONFIG: SimulatorConfig = {
    world: {
        zLength: 10,
        xLength: 10,
        includeWalls: true
    }
};

export class Sim3D {
    private scene: THREE.Scene;
    private renderer: THREE.Renderer;

    private camera: THREE.PerspectiveCamera;
    private cameraControls: OrbitControls;

    private isRendering: boolean = false;

    constructor(private canvas: HTMLCanvasElement, config?: SimulatorConfig) {
        if (!config) {
            config = DEFAULT_CONFIG;
        }

        // Scene
        const scene = (this.scene = new THREE.Scene());
        scene.background = new THREE.Color(0xeeeeee);

        // Renderer
        const renderer = (this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvas
        }));
        renderer.setSize(canvas.width, canvas.height);

        // Camera
        const fov = 80;
        const aspect = canvas.width / canvas.height;
        const near = 0.01;
        const far = 100;
        const camera = (this.camera = new THREE.PerspectiveCamera(
            fov,
            aspect,
            near,
            far
        ));
        camera.position.z += 3;
        camera.position.y += 2;
        this.cameraControls = new OrbitControls(camera, renderer.domElement);

        // Lighting
        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.x = 3;
        pointLight.position.y = 10;
        pointLight.position.z = 3;
        scene.add(pointLight);

        scene.add(new THREE.AmbientLight(0x333333));

        // Grid - By default, draw grid lines every 1 unit (metre)
        const grid = makeGrid(GridPlane.XZ, config.world.xLength, config.world.zLength, config.world.xLength, config.world.zLength);
        scene.add(grid);

        // Axes
        const axesHelper = new THREE.AxesHelper(1);
        scene.add(axesHelper);

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

    beginRendering() {
        const r = () => {
            if (!this.isRendering) {
                return;
            }

            window.requestAnimationFrame(r);
            this.render();
        };

        this.isRendering = true;
        r();
    }

    stopRendering() {
        this.isRendering = false;
    }
}
