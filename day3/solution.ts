import { readFileSync } from "fs";

const file: string = readFileSync("day3/input.txt", "utf8");

function letterScore(letter: string): number {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return alphabet.indexOf(letter) + 1;
}

// --------------------
// Part 1
// --------------------

const bags: string[][] = file
  .trim() // Gets rid of newline at the end of input text file
  .split("\n")
  .map((row) => {
    const middle = row.length / 2;
    return [row.slice(0, middle), row.slice(middle)];
  });

const commonItems: string[] = bags.reduce(
  (memo: string[], [leftCompartment, rightCompartment]) => {
    const uniqueLettersLeft = new Set(leftCompartment);
    const uniqueLettersRight = new Set(rightCompartment);

    uniqueLettersRight.forEach((letter) => {
      if (uniqueLettersLeft.has(letter)) {
        memo.push(letter);
      }
    });
    return memo;
  },
  []
);

const score: number = commonItems.reduce((score: number, letter: string) => {
  return score + letterScore(letter);
}, 0);

console.log(score); // 7872

// --------------------
// Part 2
// --------------------

const rows: string[] = file.trim().split("\n"); // Trim gets rid of automatically inserted newline at the end of input text file
const groups: string[][] = rows.reduce(
  (group: any[], e: string, i: number): string[][] =>
    (i % 3 ? group[group.length - 1].push(e) : group.push([e])) && group,
  []
);

const commonGroupItems: string[] = groups.reduce(
  (memo: string[], group: string[]): string[] => {
    const uniqueLettersFirst = new Set(group[0]);
    const uniqueLettersSecond = new Set(group[1]);
    const uniqueLettersThird = new Set(group[2]);

    uniqueLettersFirst.forEach((letter: string) => {
      if (uniqueLettersSecond.has(letter) && uniqueLettersThird.has(letter)) {
        memo.push(letter);
      }
    });

    return memo;
  },
  []
);

const scorePartTwo: number = commonGroupItems.reduce((score, letter) => {
  return score + letterScore(letter);
}, 0);

console.log(scorePartTwo); // 2497
