import { runTest } from "../utils/runTest.js";
import { contortRope, createRope } from "./common.js";

const findSolution = (instructions: string[]): number => {
  const rope = createRope(10);
  contortRope(rope, instructions);

  let tail = rope;
  while (tail.child) {
    tail = tail.child;
  }

  return new Set(tail.history.map((p) => `${p.x},${p.y}`)).size;
};

// Solution: 2566
export const solvePart = () =>
  runTest({ day: 9, part: 2, testMethod: findSolution, test: false });
