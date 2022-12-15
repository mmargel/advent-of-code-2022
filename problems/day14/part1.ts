import { runTest } from "../utils/runTest.js";
import { isOpen, Map, Point, runSimulation } from "./common.js";

const dropSand = (map: Map, [x, y]: Point): boolean => {
  for (; y < map.length; y++) {
    if (isOpen(map, [x, y])) {
      // fall
    } else if (isOpen(map, [x - 1, y])) {
      x -= 1;
    } else if (isOpen(map, [x + 1, y])) {
      x += 1;
    } else {
      map[y - 1][x] = "o";
      break;
    }
  }

  return y < map.length;
};

const findSolution = (values: string[]): number =>
  runSimulation(values, dropSand);

// Solution: 683
export const solvePart = () =>
  runTest({ day: 14, part: 1, testMethod: findSolution, test: false });
