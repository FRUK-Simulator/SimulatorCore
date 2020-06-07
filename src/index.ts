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

    simulator = new Sim3D(canvas);
    simulator.onresize();
    simulator.beginRendering();
}
