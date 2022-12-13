interface Game {
  map: number[][];
  start: [number, number];
  goal: [number, number];
}

const getHeight = (c: string) => c.charCodeAt(0) - 97;

export const getHeightMap = (grid: string[]): Game => {
  let start: [number, number] = [0, 0];
  let goal: [number, number] = [0, 0];
  let map: number[][] = [];

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i].split("");
    map.push([]);
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "S") {
        start = [i, j];
        map[i].push(getHeight("a"));
      } else if (row[j] === "E") {
        goal = [i, j];
        map[i].push(getHeight("z"));
      } else {
        map[i].push(getHeight(row[j]));
      }
    }
  }

  return { map, start, goal };
};

const getDistanceMap = (
  map: number[][],
  goal: [number, number]
): number[][] => {
  const distanceMap: number[][] = Array(map.length)
    .fill(null)
    .map(() => new Array(map[0].length).fill(Infinity));
  distanceMap[goal[0]][goal[1]] = 0;
  return distanceMap;
};

export const findRoute = (
  map: number[][],
  goal: [number, number]
): number[][] => {
  const distanceMap = getDistanceMap(map, goal);
  const queue: [number, number][] = [goal];

  while (queue.length > 0) {
    const [x, y] = queue.pop()!;
    const moves: [number, number][] = [];

    // Move up
    if (x > 0 && (map[x][y] == -1 || map[x - 1][y] >= map[x][y] - 1)) {
      moves.push([-1, 0]);
    }

    // Move down
    if (
      x < distanceMap.length - 1 &&
      (map[x][y] == -1 || map[x + 1][y] >= map[x][y] - 1)
    ) {
      moves.push([1, 0]);
    }

    // Move left
    if (y > 0 && (map[x][y] == -1 || map[x][y - 1] >= map[x][y] - 1)) {
      moves.push([0, -1]);
    }

    // Move right
    if (
      y < map[0].length - 1 &&
      (map[x][y] == -1 || map[x][y + 1] >= map[x][y] - 1)
    ) {
      moves.push([0, 1]);
    }

    moves.forEach(([dx, dy]) => {
      if (distanceMap[x][y] + 1 < distanceMap[x + dx][y + dy]) {
        distanceMap[x + dx][y + dy] = distanceMap[x][y] + 1;
        queue.push([x + dx, y + dy]);
      }
    });
  }

  return distanceMap;
};
