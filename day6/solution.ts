import { readFileSync } from "fs";

const file: string = readFileSync("day6/input.txt", "utf8");

// --------------------
// Part 1
// --------------------

function partOne(bufferStream: string) {
  let i = 0;

  while (i < bufferStream.length - 3) {
    if (new Set(bufferStream.slice(i, i + 4)).size === 4) {
      return i + 4;
    } else {
      i += 1;
    }
  }
}

console.log(partOne(file));

// --------------------
// Part 2
// --------------------

function partTwo(bufferStream: string) {
  let i = 0;

  while (i < bufferStream.length - 13) {
    if (new Set(bufferStream.slice(i, i + 14)).size === 14) {
      return i + 14;
    } else {
      i += 1;
    }
  }
}

console.log(partTwo(file));
