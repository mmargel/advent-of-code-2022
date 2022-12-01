import { runTest } from "../utils/runTest.js";
import { countCalories, getSumOfNMax } from "./common.js";

const findSolution = (calories: string[]): number => {
  const calorieCounts = countCalories(calories);
  return getSumOfNMax(calorieCounts, 3);
};

// 204639
export const solvePart = () =>
  runTest({ day: 1, part: 2, testMethod: findSolution, test: false });
