import { runTest } from "../utils/runTest.js";

const findSolution = (values: string[]): number => {
  values.push("[[2]]");
  values.push("[[6]]");

  const stringify = (str: string) => {
    let numericString = str.replace(/\[\]/g, "A");
    let currentNumber = 0;
    // Ideally, we'd repeat until we miss.
    while (currentNumber < 20) {
      numericString = numericString.replace(
        new RegExp(`\\[${String.fromCharCode(65 + currentNumber)}\\]`, "g"),
        `${String.fromCharCode(65 + currentNumber + 1)}`
      );
      currentNumber++;
    }

    return numericString
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((char) => {
        if (char.match(/^[A-Z]+$/)) {
          return String.fromCharCode(char.charCodeAt(0) - 65 + 48);
        } else {
          return String.fromCharCode(+char + 65);
        }
      })
      .join("");
  };

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
