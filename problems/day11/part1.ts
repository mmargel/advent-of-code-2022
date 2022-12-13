import { runTest } from "../utils/runTest.js";
import { monkeyAround } from "./common.js";

const findSolution = (values: string[]): number => {
  const monkeys = monkeyAround(values, 20, true);

  const bananaCounts = monkeys
    .map((monkey) => monkey.bananasEaten())
    .sort((a, b) => b - a);

  return bananaCounts[0] * bananaCounts[1];
};

// Solution: 55944
export const solvePart = () =>
  runTest({ day: 11, part: 1, testMethod: findSolution, test: false });
