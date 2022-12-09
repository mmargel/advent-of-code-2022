import { runTest } from "../utils/runTest.js";
import { parseTreeMap } from "./common.js";

const findSolution = (values: string[]): number => {
  const trees = parseTreeMap(values);

  return trees.flat().filter((tree) => tree.visible).length;
};

// 1782
export const solvePart = () =>
  runTest({ day: 8, part: 1, testMethod: findSolution, test: false });
