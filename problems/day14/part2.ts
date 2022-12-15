import { runTest } from "../utils/runTest.js";
import { isOpen, Map, Point, runSimulation } from "./common.js";

const dropSand = (map: Map, [x, y]: Point): boolean => {
  while (map[y][x] != "o") {
    if (!map[y + 1]) {
      map[y][x] = "o";
      return true;
    } else if (isOpen(map, [x, y + 1])) {
      // fall
    } else if (isOpen(map, [x - 1, y + 1])) {
      x -= 1;
    } else if (isOpen(map, [x + 1, y + 1])) {
      x += 1;
    } else {
      map[y][x] = "o";
      return true;
    }
    y++;
  }

  return false;
};

const findSolution = (values: string[]): number =>
  runSimulation(values, dropSand);

// Solution: 28821
export const solvePart = () =>
  runTest({ day: 14, part: 2, testMethod: findSolution, test: false });
