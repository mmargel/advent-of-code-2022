import { runTest } from "../utils/runTest.js";
import { Instruction, parseInput, Stack } from "./common.js";

const performInstructions = (
  originalStacks: Stack[],
  instructions: Instruction[]
): Stack[] => {
  const stacks = [...originalStacks];
  instructions.forEach(([amount, from, to]: Instruction) => {
    const crane = stacks[from].slice(stacks[from].length - amount).reverse();
    stacks[from] = stacks[from].slice(0, stacks[from].length - amount);
    stacks[to] = [...stacks[to], ...crane];
  });
  return stacks;
};

const findSolution = (input: string[]): string => {
  const [stacks, instructions] = parseInput(input);
  const updatedStacks = performInstructions(stacks, instructions);

  return updatedStacks.map((stack) => stack[stack.length - 1]).join("");
};

// HBTMTBSDC
export const solvePart = () =>
  runTest({ day: 5, part: 1, testMethod: findSolution, test: false });
