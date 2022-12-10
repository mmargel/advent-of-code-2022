import { runTest } from "../utils/runTest.js";

const findSolution = (instructions: string[]): number => {
  const history: number[] = [];
  const rawHistory: number[] = [];
  let cycle = 1;
  let x = 1;
  instructions.forEach((instruction) => {
    const [command, ...args] = instruction.split(" ");
    if (command === "noop") {
      history.push(x * cycle);
      rawHistory.push(x);
      cycle++;
    } else if (command === "addx") {
      history.push(x * cycle, x * (cycle + 1));
      rawHistory.push(x, x);
      x += +args[0];
      cycle += 2;
    }
  });

  let signalSum = 0;
  for (let i = 19; i < history.length; i += 40) {
    signalSum += history[i];
  }

  return signalSum;
};

// Solution: 14820
export const solvePart = () =>
  runTest({ day: 10, part: 1, testMethod: findSolution, test: false });
