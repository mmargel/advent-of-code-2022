import { runTest } from "../utils/runTest.js";
import { findFirstMarker } from "./common.js";

const findSolution = (inputStream: string[]): number => {
  return findFirstMarker(inputStream[0].split(""), 4);
};

// 1155
export const solvePart = () =>
  runTest({ day: 6, part: 1, testMethod: findSolution, test: false });
