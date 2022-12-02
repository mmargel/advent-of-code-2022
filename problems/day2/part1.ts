import { runTest } from "../utils/runTest.js";
import { opponentShapeMap, playRound, Shape } from "./common.js";

const playerShapeMap = {
  X: Shape.Rock,
  Y: Shape.Paper,
  Z: Shape.Scissors,
};

const strategy = (instruction: string): [Shape, Shape] => {
  const [opponent, player] = instruction.split(" ");

  const opponentShape =
    opponentShapeMap[opponent as keyof typeof opponentShapeMap];
  const playerShape = playerShapeMap[player as keyof typeof playerShapeMap];

  return [opponentShape, playerShape];
};

const findSolution = (instructions: string[]): number => {
  return instructions.reduce(
    (acc, instruction) => acc + playRound(instruction, strategy),
    0
  );
};

// 15523
export const solvePart = () =>
  runTest({ day: 2, part: 1, testMethod: findSolution, test: false });
