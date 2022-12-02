type Strategy = (round: string) => [Shape, Shape];

export enum Shape {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

export enum Result {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

export const opponentShapeMap = {
  A: Shape.Rock,
  B: Shape.Paper,
  C: Shape.Scissors,
};

const getResult = (player: Shape, opponent: Shape): Result => {
  if (player == opponent) return Result.Draw;

  if (
    (player == Shape.Rock && opponent == Shape.Scissors) ||
    (player == Shape.Scissors && opponent == Shape.Paper) ||
    (player == Shape.Paper && opponent == Shape.Rock)
  ) {
    return Result.Win;
  }

  return Result.Lose;
};

export const playRound = (round: string, pickMove: Strategy): number => {
  const [opponentShape, playerShape] = pickMove(round);

  return playerShape + getResult(playerShape, opponentShape);
};
