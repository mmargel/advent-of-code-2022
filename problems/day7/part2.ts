import { runTest } from "../utils/runTest.js";
import { initializeFileTree } from "./common.js";

const findSolution = (values: string[]): number => {
  const dirSizes = initializeFileTree(values).getSizeTree();
  const spaceNeeded = dirSizes[0] - 40_000_000;
  return dirSizes.sort().find((val) => val > spaceNeeded)!;
};

// 10096985
export const solvePart = () =>
  runTest({ day: 7, part: 2, testMethod: findSolution, test: false });
