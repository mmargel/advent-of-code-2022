interface Point {
  x: number;
  y: number;
}

interface Rope {
  pos: Point;
  parent?: Rope;
  child?: Rope;
  history: Point[];
}

const getMovementVector = (direction: string): Point => {
  switch (direction) {
    case "U":
      return { x: 0, y: 1 };
    case "D":
      return { x: 0, y: -1 };
    case "L":
      return { x: -1, y: 0 };
    case "R":
      return { x: 1, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

const moveRequired = (rope: Rope): boolean => {
  return (
    Math.abs(rope.parent!.pos.x - rope.pos.x) > 1 ||
    Math.abs(rope.parent!.pos.y - rope.pos.y) > 1
  );
};

const moveRope = (rope: Rope): void => {
  const deltaX = rope.parent!.pos.x - rope.pos.x;
  const deltaY = rope.parent!.pos.y - rope.pos.y;

  let dx = 0;
  let dy = 0;
  if (deltaX === 2 || deltaX === -2) {
    dx = deltaX / 2;
    dy = Math.min(Math.max(-1, deltaY), 1);
  } else if (deltaY === 2 || deltaY === -2) {
    dx = Math.min(Math.max(-1, deltaX), 1);
    dy = deltaY / 2;
  }

  const newPos = { x: rope.pos.x + dx, y: rope.pos.y + dy };
  rope.pos = newPos;
  rope.history.push(newPos);
};

const moveHead = (head: Rope, direction: string, distance: number): void => {
  const vector = getMovementVector(direction);
  for (let moves = 0; moves < distance; moves++) {
    head.pos = { x: head.pos.x + vector.x, y: head.pos.y + vector.y };
    head.history.push(head.pos);

    let rope: Rope | undefined = head;
    while ((rope = rope.child)) {
      if (moveRequired(rope)) {
        moveRope(rope);
      }
    }
  }
};

export const createRope = (length: number): Rope => {
  const origin: Point = { x: 0, y: 0 };
  const head: Rope = { pos: origin, history: [origin] };
  let tail = head;
  for (let i = 1; i < length; i++) {
    const rope: Rope = { pos: origin, history: [origin], parent: tail };
    tail.child = rope;
    tail = rope;
  }
  return head;
};

export const contortRope = (head: Rope, instructions: string[]): void => {
  instructions
    .map((line) => line.split(" "))
    .forEach(([direction, distance]) => {
      moveHead(head, direction, +distance);
    });
};
