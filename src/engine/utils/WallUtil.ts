import { IWallSpec } from "../specs/CoreSpecs";
import { WorldConfig } from "../SimulatorConfig";

export function wallSpecs(config: WorldConfig): IWallSpec[] {
  if (config.perimeter) {
    return perimeterWallSpecs(
      config.xLength,
      config.zLength,
      config.perimeter.height,
      config.perimeter.thickness
    );
  }

  if (config.walls) {
    console.warn(
      "Using worldConfig.walls will be deprecated in favor of the worldConfig.perimeter field"
    );

    if (config.walls.length > 0) {
      return config.walls;
    }
  }

  return perimeterWallSpecs(config.xLength, config.zLength);
}

export function perimeterWallSpecs(
  xLength: number,
  zLength: number,
  height = 1,
  thickness = 0.5
): IWallSpec[] {
  const specs: IWallSpec[] = [];
  // Make a perimeter with the given height and thickness
  const ht = thickness / 2;
  const hx = xLength / 2;
  const hz = zLength / 2;

  specs.push({
    // top
    type: "wall",
    start: { x: -hx, y: -hz - ht },
    end: { x: hx + thickness, y: -hz - ht },
    baseColor: 0x007c9b,
    height: height,
    thickness: thickness,
  });
  specs.push({
    // bottom
    type: "wall",
    start: { x: -hx - thickness, y: hz + ht },
    end: { x: hx, y: hz + ht },
    baseColor: 0x007c9b,
    height: height,
    thickness: thickness,
  });
  specs.push({
    // left
    type: "wall",
    start: { x: -hx - ht, y: -hz - thickness },
    end: { x: -hx - ht, y: hz },
    baseColor: 0x157efb,
    height: height,
    thickness: thickness,
  });
  specs.push({
    // right
    type: "wall",
    start: { x: hx + ht, y: -hz },
    end: { x: hx + ht, y: hz + thickness },
    baseColor: 0x157efb,
    height: height,
    thickness: thickness,
  });

  return specs;
}
