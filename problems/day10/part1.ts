import { runTest } from "../utils/runTest.js";

const renderPixel = (buffer: string[], cycle: number, x: number): void => {
  const modCycle = (cycle - 1) % 40;
  buffer[cycle - 1] = Math.abs(x - modCycle) <= 1 ? "#" : ".";
};

const drawBuffer = (buffer: string[]): void => {
  const step = 40;
  console.log();
  for (let i = 0; i < buffer.length; i += step) {
    console.log(buffer.slice(i, i + step).join(""));
  }
};

const findSolution = (instructions: string[]): number => {
  const history: number[] = [];
  const buffer: string[] = [];
  let cycle = 1;
  let x = 1;

  const tick = () => {
    history.push(x * cycle);
    renderPixel(buffer, cycle, x);
    cycle++;
  };

  instructions.forEach((instruction) => {
    const [command, ...args] = instruction.split(" ");
    if (command === "noop") {
      tick();
      // Then, do nothing
    } else if (command === "addx") {
      tick();
      tick();

      // Then add the value
      x += +args[0];
    }
  });
  drawBuffer(buffer);

  let signalSum = 0;
  for (let i = 19; i < history.length; i += 40) {
    signalSum += history[i];
  }

  return signalSum;
};

// Solution: 14820
// Solution: RZEKEFHA
export const solvePart = () =>
  runTest({ day: 10, part: 1, testMethod: findSolution, test: false });
