import { Sim3D } from "../engine/Sim3D";
import { SimWall } from "../engine/objects/SimWall";
import { SimDemoBlock } from "../engine/objects/SimDemoBlock";

let simulator: Sim3D;

window.onload = main;
window.onresize = () => {
  if (simulator) {
    simulator.onresize();
  }
};

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("demo1");

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

  // DEMO - Add an angled wall to the scene
  const angleWall = new SimWall(this.scene, this.world, {
    start: { x: -5, y: 6 },
    end: { x: 5, y: 8 },
  });

  this.addObject(angleWall);

  // DEMO - Add a demo block to the screen
  this.demoBlock = new SimDemoBlock(this.scene, this.world);
  this.addObject(this.demoBlock);

  simulator.onresize();
  simulator.beginRendering();
}
