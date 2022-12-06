import { runTest } from "../utils/runTest.js";
import { findFirstMarker } from "./common.js";

const findSolution = (inputStream: string[]): number => {
  return findFirstMarker(inputStream[0].split(""), 14);
};

// 2789
export const solvePart = () =>
  runTest({ day: 6, part: 2, testMethod: findSolution, test: false });
