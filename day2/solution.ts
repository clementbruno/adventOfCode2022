import { readFileSync } from "fs";

const file: string = readFileSync("day2/input.txt", "utf8");

const matches: string[][] = file
  .trim() // Get rid of newline at the end of input text file
  .split("\n")
  .map((match) => match.split(" "));

// --------------------
// Part 1
// --------------------

interface handMap {
  readonly [key: string]: {
    readonly [key: string]: number;
  };
}

const handMap: handMap = {
  A: {
    Y: 6,
    X: 3,
    Z: 0,
  },
  B: {
    Z: 6,
    Y: 3,
    X: 0,
  },
  C: {
    X: 6,
    Z: 3,
    Y: 0,
  },
};

interface elementScore {
  readonly [key: string]: number;
}

const elementScore: elementScore = {
  X: 1,
  Y: 2,
  Z: 3,
};

const totalScore: number = matches.reduce((total, match) => {
  let roundScore: number = handMap[match[0]][match[1]];
  roundScore += elementScore[match[1]];
  return total + roundScore;
}, 0);

console.log(totalScore); // 13 675

// --------------------
// Part 2
// --------------------

interface handMapPartTwo {
  readonly [key: string]: {
    readonly [key: string]: string;
  };
}

const handMapPartTwo: handMapPartTwo = {
  A: {
    X: "Z",
    Y: "X",
    Z: "Y",
  },
  B: {
    X: "X",
    Y: "Y",
    Z: "Z",
  },
  C: {
    X: "Y",
    Y: "Z",
    Z: "X",
  },
};

const elementScorePartTwo: elementScore = {
  X: 0,
  Y: 3,
  Z: 6,
};

const totalScorePartTwo: number = matches.reduce((total, match) => {
  let roundScore: number = elementScorePartTwo[match[1]];
  roundScore += elementScore[handMapPartTwo[match[0]][match[1]]];
  return total + roundScore;
}, 0);

console.log(totalScorePartTwo); // 14184
