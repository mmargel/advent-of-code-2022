import { runTest } from "../utils/runTest.js";
import { getCommonElement, getPriority } from "./common.js";

const findSolution = (rudsacks: string[]): number => {
  let totalPriority = 0;
  for (let batchIndex = 0; batchIndex < rudsacks.length; batchIndex += 3) {
    const batch = rudsacks.slice(batchIndex, batchIndex);
    const commonElement = getCommonElement(...batch);
    totalPriority += getPriority(commonElement);
  }
  return totalPriority;
};

// 2633
export const solvePart = () =>
  runTest({ day: 3, part: 2, testMethod: findSolution, test: false });
