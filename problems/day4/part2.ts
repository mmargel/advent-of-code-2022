import { runTest } from "../utils/runTest.js";
import { filterAssignments, Tuple } from "./common.js";

const rangesOverlap = ([first, second]: Tuple): boolean => {
  return first.max >= second.min && first.min <= second.max;
};

const findSolution = (assignments: string[]): number => {
  return filterAssignments(assignments, rangesOverlap).length;
};

// 798
export const solvePart = () =>
  runTest({ day: 4, part: 2, testMethod: findSolution, test: false });
