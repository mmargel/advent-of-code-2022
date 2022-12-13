import { runTest } from "../utils/runTest.js";
import { monkeyAround } from "./common.js";

const findSolution = (values: string[]): number => {
  const monkeys = monkeyAround(values, 10_000, false);

  const bananaCounts = monkeys
    .map((monkey) => monkey.bananasEaten())
    .sort((a, b) => b - a);

  return bananaCounts[0] * bananaCounts[1];
};

// Solution: 15117269860
export const solvePart = () =>
  runTest({ day: 11, part: 2, testMethod: findSolution, test: false });
