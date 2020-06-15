import { Sim3D } from "../engine/Sim3D";
import { IBallSpec, IBoxSpec } from "../engine/specs/CoreSpecs";
import { SimulatorConfig } from "../engine/SimulatorConfig";
import { BallHandle } from "../engine/handles/BallHandle";
import { BoxHandle } from "../engine/handles/BoxHandle";

let simulator: Sim3D;

const simConfig: SimulatorConfig = {
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
};

window.onload = main;
window.onresize = () => {
  if (simulator) {
    simulator.onresize();
  }
};

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("demo1");

  simulator = new Sim3D(canvas, simConfig);
  simulator.onresize();
  simulator.beginRendering();

  const ballSpec: IBallSpec = {
    type: "ball",
    radius: 1,
    initialPosition: { x: 2, y: 2 },
  };
  simulator.addGameObject(ballSpec, BallHandle);

  const box1Spec: IBoxSpec = {
    type: "box",
    dimensions: {
      x: 1,
      y: 1,
      z: 1,
    },
    initialPosition: {
      x: 0,
      y: 5,
    },
  };
  const box1 = simulator.addGameObject(box1Spec, BoxHandle);

  let switchColor = false;
  setInterval(() => {
    switchColor = !switchColor;
    if (switchColor) {
      box1.setBaseColor(0xff0000);
    } else {
      box1.setBaseColor(0xff00ff);
    }
  }, 2000);
}
