interface Message {
  contents: number;
  receiver: number;
}

type Operation = (old: number) => number;
type Test = (value: number) => number;

class Monkey {
  private itemsProcessed: number = 0;

  constructor(
    readonly id: number,
    readonly items: number[],
    readonly operation: Operation,
    readonly pickRecipient: Test,
    readonly trusted: boolean
  ) {}

  hasMonkeyBusiness(): boolean {
    return this.items.length > 0;
  }

  doMonkeyBusiness(): Message {
    let currentWorry = this.items.shift()!;
    // currentWorry = this.operation(currentWorry) % 96577;
    // 9699690 = 2*3*5*7*11*13*17*19, 96577 = 13*17*19*23
    currentWorry = this.operation(currentWorry) % 9699690;

    if (this.trusted) {
      currentWorry = Math.floor(currentWorry / 3);
    }

    this.itemsProcessed++;

    const receiver = this.pickRecipient(currentWorry);

    return {
      contents: currentWorry,
      receiver,
    };
  }

  eatBanana(item: number): void {
    this.items.push(item);
  }

  bananasEaten(): number {
    return this.itemsProcessed;
  }
}

const parseId = (line: string): number => +line.match(/\d+/)!;
const parseItems = (line: string): number[] =>
  line.match(/\d+/g)!.map((s) => +s);
const parseOperation = (line: string): Operation => {
  const operationText = line.match(/= (.*)+/)![1].split(" ");

  const left = (old: number) => old;
  const right =
    operationText[2] === "old"
      ? (old: number) => old
      : (_old: number) => +operationText[2];
  const operand = operationText[1];

  switch (operand) {
    case "+":
      return (old: number) => left(old) + right(old);
    case "*":
      return (old: number) => left(old) * right(old);
    default:
      return (old: number) => old;
  }
};

const parseTest = (lines: string[]): Test => {
  const divisor: number = +lines[0].match(/\d+/)!;
  const trueTarget: number = +lines[1].match(/\d+/)!;
  const falseTarget: number = +lines[2].match(/\d+/)!;

  return (value: number) => (value % divisor === 0 ? trueTarget : falseTarget);
};

const initializeMonkeys = (
  values: string[],
  trustMonkeys: boolean
): Monkey[] => {
  const monkeys: Monkey[] = [];
  // 7 to account for the empty line between monkeys
  for (let i = 0; i < values.length; i += 7) {
    const id = parseId(values[i]);
    const items = parseItems(values[i + 1]);
    const operation = parseOperation(values[i + 2]);
    const test = parseTest(values.slice(i + 3, i + 6));

    monkeys.push(new Monkey(id, items, operation, test, trustMonkeys));
  }

  return monkeys;
};

export const monkeyAround = (
  values: string[],
  rounds: number,
  trustMonkeys: boolean
): Monkey[] => {
  const messageQueue: Message[] = [];
  const monkeys = initializeMonkeys(values, trustMonkeys);

  for (let round = 1; round <= rounds; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      while (monkeys[i].hasMonkeyBusiness()) {
        messageQueue.push(monkeys[i].doMonkeyBusiness());
        while (messageQueue.length > 0) {
          const message = messageQueue.shift()!;
          monkeys[message.receiver].eatBanana(message.contents);
        }
      }
    }
  }

  return monkeys;
};
