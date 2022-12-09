import { readFileSync } from "fs";

const file: string = readFileSync("day9/input.txt", "utf8").trim();

// --------------------
// Part 1
// --------------------

const moves = file
  .split("\n")
  .reduce((acc: (string | number)[][], move: string) => {
    const direction = move[0];
    const distance = parseInt(move.slice(1), 10);

    return [...acc, [direction, distance]];
  }, []);

interface movesMap {
  [key: string]: {
    x: number;
    y: number;
  };
}

const movesMap: movesMap = {
  U: {
    x: 0,
    y: 1,
  },
  D: {
    x: 0,
    y: -1,
  },
  L: {
    x: -1,
    y: 0,
  },
  R: {
    x: 1,
    y: 0,
  },
};

function followParent(
  parentKnot: { x: number; y: number },
  currentKnot: { x: number; y: number }
) {
  const distance = Math.max(
    Math.abs(currentKnot.x - parentKnot.x),
    Math.abs(currentKnot.y - parentKnot.y)
  );
  if (distance > 1) {
    const distanceX = parentKnot.x - currentKnot.x;
    const distanceY = parentKnot.y - currentKnot.y;

    currentKnot.x += Math.abs(distanceX) === 2 ? distanceX / 2 : distanceX;
    currentKnot.y += Math.abs(distanceY) === 2 ? distanceY / 2 : distanceY;
  }
}

function partOne() {
  const positionsVisited = new Set<string>();

  const positionH = { x: 0, y: 0 };
  const positionT = { x: 0, y: 0 };

  for (let i = 0; i < moves.length; i++) {
    const [direction, distance] = moves[i];

    for (let j = 0; j < distance; j++) {
      positionH.x += movesMap[direction].x;
      positionH.y += movesMap[direction].y;

      followParent(positionH, positionT);

      positionsVisited.add(`${positionT.x},${positionT.y}`);
    }
  }

  return positionsVisited.size;
}

console.log(partOne()); // 6011

// --------------------
// Part 2
// --------------------

function partTwo() {
  const positionsVisited = new Set<string>();

  const rope = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  for (let i = 0; i < moves.length; i++) {
    const [direction, distance] = moves[i];

    for (let j = 0; j < distance; j++) {
      const positionH = rope[0];
      positionH.x += movesMap[direction].x;
      positionH.y += movesMap[direction].y;

      for (let k = 1; k < rope.length; k++) {
        const previousPosition = rope[k - 1];
        const positionT = rope[k];
        followParent(previousPosition, positionT);
      }

      const tail = rope[rope.length - 1];
      positionsVisited.add(`${tail.x},${tail.y}`);
    }
  }

  return positionsVisited.size;
}

console.log(partTwo()); // 2 419
