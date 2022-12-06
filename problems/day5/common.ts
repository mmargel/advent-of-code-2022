export type Stack = string[];
export type Instruction = [amount: number, from: number, to: number];

export const parseInput = (inputs: string[]): [Stack[], Instruction[]] => {
  // const instructions: Instruction[] = [];
  const split = inputs.indexOf("");
  const crateRegex = /\[([A-Z])\]/g;

  const stacks: Stack[] = new Array(inputs[split - 1].match(/\d+/g)!.length)
    .fill(null)
    .map(() => []);

  for (let i = 0; i < split - 1; i++) {
    [...inputs[i].matchAll(crateRegex)].forEach((crate) => {
      stacks[crate.index! / 4].unshift(crate[1]);
    });
  }

  const instructions: Instruction[] = inputs.slice(split + 1).map((input) => {
    const match = input.match(/^move (\d+) from (\d+) to (\d+)$/)!;
    return [+match[1], +match[2] - 1, +match[3] - 1];
  });

  return [stacks, instructions];
};
