import { readFileSync } from "fs";

const file: string = readFileSync("./day1/input.txt", "utf-8");

// -----------------------------
// Part 1
// -----------------------------

const elvesCalories: number[][] = file
  .split("\n\n")
  .map((elfCalories: string) =>
    elfCalories.split("\n").map((calories: string) => Number(calories))
  );

const totalCalories: number[] = elvesCalories.map(
  (elfCalories: number[]) =>
    elfCalories.reduce((total: number, calories: number) => total + calories),
  0
);

const partOne: number = Math.max(...totalCalories);

console.log(partOne); // 73211

// ----------------------------
// Part 2
// -----------------------------

const sortedCalories: number[] = totalCalories.sort(
  (a: number, b: number) => b - a
);

const partTwo: number = sortedCalories
  .slice(0, 3)
  .reduce((total: number, calories: number) => total + calories, 0);

console.log(partTwo); // 213958
