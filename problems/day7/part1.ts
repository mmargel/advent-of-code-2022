import { runTest } from "../utils/runTest.js";
import { initializeFileTree } from "./common.js";

const findSolution = (values: string[]): number => {
  return initializeFileTree(values)
    .getSizeTree()
    .filter((size) => size <= 100_000)
    .reduce((acc, val) => acc + val, 0);
};

// 1501149
export const solvePart = () =>
  runTest({ day: 7, part: 1, testMethod: findSolution, test: false });
