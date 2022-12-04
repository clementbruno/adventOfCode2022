import { readFileSync } from "fs";

const file: string = readFileSync("day4/input.txt", "utf8");

const pairs: number[][][] = file
  .trim()
  .split("\n")
  .map((line) =>
    line.split(",").map((pair) => pair.split("-").map((el) => Number(el)))
  );

// --------------------
// Part 1
// --------------------

const fullyContainedPairs: number[][][] = pairs.filter(
  ([firstElement, secondElement]) => {
    return (
      (firstElement[0] <= secondElement[0] &&
        firstElement[1] >= secondElement[1]) ||
      (secondElement[0] <= firstElement[0] &&
        secondElement[1] >= firstElement[1])
    );
  }
);

console.log(fullyContainedPairs.length); // 526

// --------------------
// Part 2
// --------------------

const overlappingPairs: number[][][] = pairs.filter(
  ([firstElement, secondElement]) => {
    return (
      (firstElement[0] <= secondElement[0] &&
        firstElement[1] >= secondElement[0]) ||
      (secondElement[0] <= firstElement[0] &&
        secondElement[1] >= firstElement[0])
    );
  }
);

console.log(overlappingPairs.length); // 886
