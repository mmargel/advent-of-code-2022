import { runTest } from "../utils/runTest.js";
import { filterAssignments, Tuple } from "./common.js";

const rangesFullyOverlap = ([first, second]: Tuple): boolean => {
  const overlap =
    (first.min >= second.min && first.max <= second.max) ||
    (first.min <= second.min && first.max >= second.max);
  return overlap;
};

const findSolution = (assignments: string[]): number => {
  return filterAssignments(assignments, rangesFullyOverlap).length;
};

// 524
export const solvePart = () =>
  runTest({ day: 4, part: 1, testMethod: findSolution, test: false });
