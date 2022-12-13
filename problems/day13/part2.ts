import { runTest } from "../utils/runTest.js";

const findSolution = (values: string[]): number => {
  values.push("[[2]]");
  values.push("[[6]]");

  const stringify = (str: string) =>
    str
      .replace(/\[\]/g, "-1")
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((num) => String.fromCharCode(+num + 65))
      .join("");

  const strings = values
    .filter((row) => row != "")
    .map(stringify)
    .sort();

  return (
    (strings.indexOf(stringify("[[2]]")) + 1) *
    (strings.indexOf(stringify("[[6]]")) + 1)
  );
};

// Solution: 123 * 199 = 24477
export const solvePart = () =>
  runTest({ day: 13, part: 2, testMethod: findSolution, test: false });
