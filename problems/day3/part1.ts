import { runTest } from "../utils/runTest.js";
import { getCommonElement, getPriority } from "./common.js";

const splitRudsack = (rudsack: string): [string, string] => [
  rudsack.slice(0, rudsack.length / 2),
  rudsack.slice(rudsack.length / 2),
];

const findSolution = (rudsacks: string[]): number => {
  return rudsacks.reduce((acc, rudsack) => {
    const batch = splitRudsack(rudsack);
    const commonElement = getCommonElement(...batch);
    return acc + getPriority(commonElement);
  }, 0);
};

// 7785
export const solvePart = () =>
  runTest({ day: 3, part: 1, testMethod: findSolution, test: false });
