import { readFile, readFileSync } from "fs";

const file: string = readFileSync("day11/input.txt", "utf8").trim();

// --------------------
// Part 1
// --------------------

class Monkey {
  constructor(
    public id: number,
    public items: number[],
    public operation: Function,
    public divider: number,
    public targetTrue: number,
    public targetFalse: number,
    public inspections: number
  ) {}
}

function getMonkeys() {
  return file.split("\n\n").map((monkeyData) => {
    const [idRaw, itemsRaw, operationRaw, testRaw, targetTrue, targetFalse] =
      monkeyData.split("\n");

    return new Monkey(
      parseInt(
        (idRaw.match(/\d*/g) as string[]).find((v) => v !== "") as string
      ),
      itemsRaw
        .split(": ")[1]
        .split(",")
        .map((stressLevel) => parseInt(stressLevel)),
      new Function("old", `return ${operationRaw.split("= ")[1]}`),
      parseInt(testRaw.split("divisible by ")[1]),
      parseInt(
        (targetTrue.match(/\d*/g) as string[]).find((v) => v !== "") as string
      ),
      parseInt(
        (targetFalse.match(/\d*/g) as string[]).find((v) => v !== "") as string
      ),
      0
    );
  });
}

function partOne(rounds: number = 20) {
  const monkeys: Monkey[] = getMonkeys();
  const largeNumberDivider: number = monkeys.reduce(
    (div, monkey) => div * monkey.divider,
    1
  );

  for (let round = 0; round < rounds; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      monkey.items = monkey.items.map((item) => {
        if (rounds === 20) {
          return Math.floor(monkey.operation(item) / 3);
        }
        return monkey.operation(item % largeNumberDivider);
      });
      monkey.inspections += monkey.items.length;

      while (monkey.items.length > 0) {
        const item = monkey.items[0];

        if (item % monkey.divider === 0) {
          (
            monkeys.find(
              (targetMonkey) => targetMonkey.id === monkey.targetTrue
            ) as Monkey
          ).items.push(item);
        } else {
          (
            monkeys.find(
              (targetMonkey) => targetMonkey.id === monkey.targetFalse
            ) as Monkey
          ).items.push(item);
        }
        monkey.items = monkey.items.slice(1);
      }
    }
  }

  monkeys.sort((monkeyA, monkeyB) => monkeyB.inspections - monkeyA.inspections);
  return monkeys[0].inspections * monkeys[1].inspections;
}

console.log(partOne()); // 95_472

// --------------------
// Part 2
// --------------------

function partTwo() {
  return partOne(10_000);
}

console.log(partTwo()); // 17_926_061_332
