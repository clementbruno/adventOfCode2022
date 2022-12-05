import { readFileSync } from "fs";

const file: string = readFileSync("day5/input.txt", "utf8");

const [stackRaw, operationsRaw] = file.split("\n\n");

const numColumns: number = parseInt(stackRaw[stackRaw.length - 1]);

interface Stacks {
  [key: string]: string[];
}
const stacks: Stacks = {};
for (let i = 1; i <= numColumns; i++) {
  stacks[i] = stackRaw
    .split("\n")
    .slice(0, -1)
    .map((el) => el[1 + 4 * (i - 1)])
    .filter((el) => ![undefined, " "].includes(el))
    .reverse();
}

const operations = operationsRaw
  .trim()
  .split("\n")
  .map((operation) => operation.split(" "))
  .map((operation) => {
    return operation.filter((_, idx) => {
      return [1, 3, 5].includes(idx);
    });
  });

// --------------------
// Part 1
// --------------------

function partOne(stacks: Stacks) {
  operations.forEach((operation) => {
    const [howMany, from, to] = operation;

    for (let i = 0; i < parseInt(howMany); i++) {
      stacks[to].push(stacks[from].pop() as string);
    }
  });

  const result: string[] = [];
  for (let i = 1; i <= numColumns; i++) {
    result.push(stacks[i][stacks[i].length - 1]);
  }

  console.log(result.join(""));
}

partOne(stacks); // FJSRQCFTN

// --------------------
// Part 2
// --------------------

// Reinitialize stacks
for (let i = 1; i <= numColumns; i++) {
  stacks[i] = stackRaw
    .split("\n")
    .slice(0, -1)
    .map((el) => el[1 + 4 * (i - 1)])
    .filter((el) => ![undefined, " "].includes(el))
    .reverse();
}

function partTwo(stacks: Stacks) {
  operations.forEach((operation) => {
    const [howMany, from, to] = operation;

    stacks[to].push(...stacks[from].splice(-howMany));
  });

  const result: string[] = [];
  for (let i = 1; i <= numColumns; i++) {
    result.push(stacks[i][stacks[i].length - 1]);
  }

  console.log(result.join(""));
}

partTwo(stacks); // CJVLJQPHS
