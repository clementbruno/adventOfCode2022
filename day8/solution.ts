import { readFileSync } from "fs";

const file: string = readFileSync("day8/input.txt", "utf8");

// --------------------
// Part 1
// --------------------

const lines: string[][] = file
  .trim()
  .split("\n")
  .map((el) => el.split(""));

// Trees visible from outside
let visibleTreesFromOutside: number = lines[0].length * 2; // first and last line
visibleTreesFromOutside += lines.length * 2 - 4; // first and last column

// Trees visible from inside
let visibleTreesFromInside = 0;

for (let row: number = 1; row < lines.length - 1; row++) {
  for (let col: number = 1; col < lines[row].length - 1; col++) {
    const visibility = visibilityFromInside(row, col);
    if (visibility.some((visible) => visible)) {
      visibleTreesFromInside += 1;
    }
  }
}

function visibilityFromInside(row: number, col: number) {
  const height = lines[row][col];
  let [left, top, right, bottom] = [true, true, true, true];

  // Check left
  let currentRow = row;
  let currentCol = col - 1;
  while (currentCol >= 0) {
    const currentHeight = lines[currentRow][currentCol];
    if (currentHeight < height) {
      currentCol -= 1;
    } else {
      left = false;
      break;
    }
  }

  // Check top
  currentRow = row - 1;
  currentCol = col;
  while (currentRow >= 0) {
    const currentHeight = lines[currentRow][currentCol];
    if (currentHeight < height) {
      currentRow -= 1;
    } else {
      top = false;
      break;
    }
  }

  // Check right
  currentRow = row;
  currentCol = col + 1;
  while (currentCol <= lines[row].length - 1) {
    const currentHeight = lines[currentRow][currentCol];
    if (currentHeight < height) {
      currentCol += 1;
    } else {
      right = false;
      break;
    }
  }

  // Check bottom
  currentRow = row + 1;
  currentCol = col;
  while (currentRow <= lines.length - 1) {
    const currentHeight = lines[currentRow][currentCol];
    if (currentHeight < height) {
      currentRow += 1;
    } else {
      bottom = false;
      break;
    }
  }

  return [left, top, right, bottom];
}

const visibleTrees = visibleTreesFromOutside + visibleTreesFromInside;

console.log(visibleTrees);

// --------------------
// Part 2
// --------------------

const scenicScores: number[] = [];

for (let row: number = 1; row < lines.length - 1; row++) {
  for (let col: number = 1; col < lines[row].length - 1; col++) {
    const score = computeScenicScore(row, col);
    scenicScores.push(score);
  }
}

function computeScenicScore(row: number, col: number): number {
  const height = lines[row][col];
  let [leftScore, topScore, rightScore, bottomScore] = [0, 0, 0, 0];

  // Check left
  let currentRow = row;
  let currentCol = col - 1;
  while (currentCol >= 0) {
    const currentHeight = lines[currentRow][currentCol];
    leftScore += 1;
    if (currentHeight < height) {
      currentCol -= 1;
    } else {
      break;
    }
  }

  // Check top
  currentRow = row - 1;
  currentCol = col;
  while (currentRow >= 0) {
    const currentHeight = lines[currentRow][currentCol];
    topScore += 1;
    if (currentHeight < height) {
      currentRow -= 1;
    } else {
      break;
    }
  }

  // Check right
  currentRow = row;
  currentCol = col + 1;
  while (currentCol <= lines[row].length - 1) {
    const currentHeight = lines[currentRow][currentCol];
    rightScore += 1;
    if (currentHeight < height) {
      currentCol += 1;
    } else {
      break;
    }
  }

  // Check bottom
  currentRow = row + 1;
  currentCol = col;
  while (currentRow <= lines.length - 1) {
    const currentHeight = lines[currentRow][currentCol];
    bottomScore += 1;
    if (currentHeight < height) {
      currentRow += 1;
    } else {
      break;
    }
  }

  return leftScore * topScore * rightScore * bottomScore;
}

const maxScenicScore = Math.max(...scenicScores);
console.log(maxScenicScore);
