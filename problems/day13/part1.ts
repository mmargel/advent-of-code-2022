import { runTest } from "../utils/runTest.js";
import { parseList, inOrder, List } from "./common.js";

const findSolution = (values: string[]): number => {
  let score = 0;
  for (let i = 0; i < values.length; i += 3) {
    const left = parseList(values[i]) as List;
    const right = parseList(values[i + 1]) as List;
    score += inOrder(left, right) ? 1 + i / 3 : 0;
  }

  return score;
};

// Solution: 5825
export const solvePart = () =>
  runTest({ day: 13, part: 1, testMethod: findSolution, test: false });
