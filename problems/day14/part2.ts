import { runTest } from "../utils/runTest.js";
import { initializeMap, isOpen, Map, Point, runSimulation } from "./common.js";

const dropSand = (map: Map, origin: Point): boolean => {
  let [x, y] = origin;

  while (map[y][x] != "o") {
    if (!map[y + 1]) {
      map[y][x] = "o";
      return true;
    } else if (isOpen(map, [x, y + 1])) {
      y++;
    } else if (isOpen(map, [x - 1, y + 1])) {
      x -= 1;
      y++;
    } else if (isOpen(map, [x + 1, y + 1])) {
      x += 1;
      y++;
    } else {
      map[y][x] = "o";
      return true;
    }
  }

  return false;
};

const findSolution = (values: string[]): number => {
  const map = initializeMap(values);
  const sandDropped = runSimulation(map, dropSand);
  return sandDropped;
};

// Solution: 28821
export const solvePart = () =>
  runTest({ day: 14, part: 2, testMethod: findSolution, test: false });
