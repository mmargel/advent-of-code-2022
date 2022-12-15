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

const initializeMap = (values: string[]): Map => {
  const lines = values.map((line) => parseEndpoints(line));
  const mapHeight = lines.flat().reduce((acc, [, y]) => Math.max(acc, y), 0);

  const map = Array(mapHeight + 1 + 1)
    .fill(null)
    .map((_) => new Array<string>().fill("."));

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length - 1; j++) {
      let [x, y] = lines[i][j];
      const [xf, yf] = lines[i][j + 1];

      while (x < xf) map[y][x++] = "#";
      while (x > xf) map[y][x--] = "#";
      while (y < yf) map[y++][x] = "#";
      while (y >= yf) map[y--][x] = "#";
    }
  }

  map[ORIGIN[1]][ORIGIN[0]] = "+"; // for drawing
  return map;
};

export const runSimulation = (
  values: string[],
  dropSand: (map: Map, point: Point) => boolean,
  visual: boolean = false
) => {
  // verbose to support printing
  const map = initializeMap(values);
  if (visual) printMap(map);
  while (dropSand(map, ORIGIN));
  if (visual) printMap(map);
  return map.flat().filter((c) => c == "o").length;
};
