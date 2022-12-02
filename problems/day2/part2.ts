import { runTest } from "../utils/runTest.js";
import { opponentShapeMap, playRound, Result, Shape } from "./common.js";

const playerGoalMap = {
  X: Result.Lose,
  Y: Result.Draw,
  Z: Result.Win,
};

// To win against KEY, you play VALUE
const winMap: Record<Shape, Shape> = {
  [Shape.Rock]: Shape.Paper,
  [Shape.Paper]: Shape.Scissors,
  [Shape.Scissors]: Shape.Rock,
};

// To lose against KEY, you play VALUE
const loseMap: Record<Shape, Shape> = {
  [Shape.Rock]: Shape.Scissors,
  [Shape.Paper]: Shape.Rock,
  [Shape.Scissors]: Shape.Paper,
};

const selectShape = (opponent: Shape, goal: Result) => {
  if (goal == Result.Draw) return opponent;
  if (goal == Result.Win) return winMap[opponent];
  return loseMap[opponent];
};

const strategy = (instruction: string): [Shape, Shape] => {
  const [opponent, player] = instruction.split(" ");

  const opponentShape =
    opponentShapeMap[opponent as keyof typeof opponentShapeMap];
  const goal = playerGoalMap[player as keyof typeof playerGoalMap];

  return [opponentShape, selectShape(opponentShape, goal)];
};

const findSolution = (instructions: string[]): number => {
  return instructions.reduce(
    (acc, instruction) => acc + playRound(instruction, strategy),
    0
  );
};

export const solvePart = () =>
  runTest({ day: 2, part: 2, testMethod: findSolution, test: false });
