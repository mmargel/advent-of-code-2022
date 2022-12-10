import { runTest } from "../utils/runTest.js";
import { contortRope, createRope } from "./common.js";

const findSolution = (instructions: string[]): number => {
  const rope = createRope(2);
  contortRope(rope, instructions);

  let tail = rope;
  while (tail.child) {
    tail = tail.child;
  }

  return new Set(tail.history.map((p) => `${p.x},${p.y}`)).size;
};

// Solution: 6090
export const solvePart = () =>
  runTest({ day: 9, part: 1, testMethod: findSolution, test: false });
