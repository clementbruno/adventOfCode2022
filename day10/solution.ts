import { readFileSync } from "fs";

const file: string = readFileSync("day10/input.txt", "utf8").trim();

// --------------------
// Part 1
// --------------------

const instructions: string[] = file.split("\n");
const cyclesToMonitor = [20, 60, 100, 140, 180, 220];

function partOne() {
  let cycles: number = 1;
  let registerValue = 1;
  const signalStengths: number[] = [];

  function runCycle(val: number) {
    cycles += 1;
    registerValue += val;

    if (cyclesToMonitor.includes(cycles)) {
      signalStengths.push(registerValue);
    }
  }

  for (let i = 0; i < instructions.length; i++) {
    const instruction: string = instructions[i];
    const [_, number] = instruction.split(" ");

    if (instruction === "noop") {
      runCycle(0);
      continue;
    } else {
      runCycle(0);
      runCycle(parseInt(number));
    }
  }

  return signalStengths.reduce(
    (memo, registerValue, idx) => memo + registerValue * cyclesToMonitor[idx],
    0
  );
}

console.log(partOne());

// --------------------
// Part 2
// --------------------

function partTwo() {
  let cycles: number = 0;
  let registerValue = 1;
  const registerValues: number[] = [registerValue];
  let output = "";

  function runCycle(val: number) {
    const spritePosition = [
      registerValues[cycles] - 1,
      registerValues[cycles],
      registerValues[cycles] + 1,
    ];
    if (spritePosition.includes(cycles % 40)) {
      output += "#";
    } else {
      output += ".";
    }
    cycles += 1;
    registerValue += val;

    registerValues.push(registerValue);
  }

  for (let i = 0; i < instructions.length; i++) {
    const instruction: string = instructions[i];
    const [_, number] = instruction.split(" ");

    if (instruction === "noop") {
      runCycle(0);
      continue;
    } else {
      runCycle(0);
      runCycle(parseInt(number));
    }
  }

  return output.match(/.{40}/g);
}

console.log(partTwo());
