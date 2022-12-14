export type Point = [number, number];
export type Map = string[][];

const ORIGIN: Point = [500, 0];

export const isOpen = (map: Map, [x, y]: Point): boolean =>
  map[y][x] != "#" && map[y][x] != "o";

const printMap = (map: Map): void => {
  const rowBuffer: string[] = new Array(map.length).fill("");
  map.forEach((row, i) => {
    for (let j = 500 - map.length - 1; j < 500 + map.length + 1; j++) {
      rowBuffer[i] += row[j] || ".";
    }
  });

  process.stdout.write("\n");
  rowBuffer.forEach((row) => process.stdout.write(row + "\n"));
};

const parseEndpoints = (line: string): Point[] =>
  line
    .split("->")
    .map((point) => point.trim().split(",")) as unknown as Point[];

export const initializeMap = (values: string[]): Map => {
  const lines = values.map((line) => parseEndpoints(line));
  const mapHeight = lines.flat().reduce((acc, [, y]) => Math.max(acc, y), 0);

  const map = Array(mapHeight + 1 + 1)
    .fill(null)
    .map((_) => new Array<string>().fill("."));

  for (let i = 0; i < lines.length; i++) {
    const endpoints = lines[i];
    for (let j = 0; j < endpoints.length - 1; j++) {
      let [x, y] = endpoints[j];
      const [xf, yf] = endpoints[j + 1];

      while (x < xf) {
        map[y][x] = "#";
        x++;
      }
      while (x > xf) {
        map[y][x] = "#";
        x--;
      }
      while (y < yf) {
        map[y][x] = "#";
        y++;
      }
      while (y >= yf) {
        map[y][x] = "#";
        y--;
      }
    }
  }

  map[ORIGIN[1]][ORIGIN[0]] = "+";
  return map;
};

export const runSimulation = (
  map: Map,
  dropSand: (map: Map, point: Point) => boolean,
  visual: boolean = false
) => {
  let count = 0;
  if (visual) printMap(map);
  while (dropSand(map, ORIGIN)) count++;
  if (visual) printMap(map);
  return count;
};
