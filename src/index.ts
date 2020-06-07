import { Sim3D } from "./engine/Sim3D";

let simulator: Sim3D;

window.onload = main;
window.onresize = () => {
    if (simulator) {
        simulator.onresize();
    }
}

function main() {
    const canvas = <HTMLCanvasElement>document.getElementById("render-area");

    simulator = new Sim3D(canvas, {
        world: {
            xLength: 10,
            zLength: 20,
            includeWalls: true
        }
    });
    simulator.onresize();
    simulator.beginRendering();
}
