import { Sim3D } from "../engine/Sim3D";

let simulator: Sim3D;

window.onload = main;
window.onresize = () => {
  if (simulator) {
    simulator.onresize();
  }
};

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("render-area");

  simulator = new Sim3D(canvas, {
    defaultWorld: {
      xLength: 10,
      zLength: 20,
      walls: [],

      camera: {
        position: {
          x: 0,
          y: 4,
          z: 12,
        },
      },
    },
  });
  simulator.onresize();
  simulator.beginRendering();
}
