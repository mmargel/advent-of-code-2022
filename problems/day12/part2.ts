import { runTest } from "../utils/runTest.js";
import { findRoute, getHeightMap } from "./common.js";

const findSolution = (values: string[]): number => {
  const { map, goal } = getHeightMap(values);
  const distanceMap = findRoute(map, goal);

  const startingPoints = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 0) {
        startingPoints.push([i, j]);
      }
    }
  }

  return startingPoints
    .map(([x, y]) => distanceMap[x][y])
    .sort((a, b) => a - b)[0];
};

// Solution: 414
export const solvePart = () =>
  runTest({ day: 12, part: 2, testMethod: findSolution, test: false });
