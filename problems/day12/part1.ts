import { runTest } from "../utils/runTest.js";
import { findRoute, getHeightMap } from "./common.js";

const findSolution = (values: string[]): number => {
  const { map, start, goal } = getHeightMap(values);
  const distanceMap = findRoute(map, goal);

  return distanceMap[start[0]][start[1]];
};

// Solution: 420
export const solvePart = () =>
  runTest({ day: 12, part: 1, testMethod: findSolution, test: false });
