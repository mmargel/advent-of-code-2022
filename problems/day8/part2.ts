import { runTest } from "../utils/runTest.js";
import { parseTreeMap, Tree } from "./common.js";

const findSolution = (values: string[]): number => {
  const scores = parseTreeMap(values)
    .flat()
    .map((t: Tree) => t.scenicScore!)
    .sort((a, b) => a - b)
    .reverse();

  return scores[0];
};

// 474606
export const solvePart = () =>
  runTest({ day: 8, part: 2, testMethod: findSolution, test: false });
