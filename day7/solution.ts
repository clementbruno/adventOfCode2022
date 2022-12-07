import { readFileSync } from "fs";

const file: string = readFileSync("day7/input.txt", "utf8");

// --------------------
// Part 1
// --------------------

interface Directory {
  name: string;
  size: number;
  children: (Directory | File)[];
  parent: Directory | null;
}

class Directory {
  constructor(
    name: string,
    size: number,
    children: (Directory | File)[] = [],
    parent: Directory | null = null
  ) {
    this.name = name;
    this.size = size;
    this.children = children;
    this.parent = parent;
  }
}

interface File {
  name: string;
  size: number;
  parent: Directory | null;
}

class File {
  constructor(name: string, size: number, parent: Directory | null = null) {
    this.name = name;
    this.size = size;
    this.parent = parent;
  }
}

const operations = file.trim().split("\n");

const rootDirectory = new Directory("/", 0);
const directories: Directory[] = [rootDirectory];
const files: File[] = [];
let currentDirectory = rootDirectory;

for (let i = 1; i < operations.length; i++) {
  const operation = operations[i];

  if (operation.includes("dir")) {
    const name = operation.split(" ")[1];
    const newDir = new Directory(name, 0, [], currentDirectory);
    directories.push(newDir);
    currentDirectory.children.push(newDir);
  } else if (!operation.includes("$")) {
    const elements = operation.split(" ");
    const name = elements[1];
    const size = parseInt(elements[0]);
    const newFile = new File(name, size, currentDirectory);
    currentDirectory.children.push(newFile);
    currentDirectory.size += newFile.size;
    let dir = currentDirectory.parent;
    while (dir) {
      dir.size += newFile.size;
      dir = dir.parent;
    }
    files.push(newFile);
  } else if (operation.includes("$ cd")) {
    const target = operation.split(" ")[2];
    if (target === "..") {
      currentDirectory = currentDirectory.parent as Directory;
    } else {
      currentDirectory = currentDirectory.children.find(
        (child) => child.name === target
      ) as Directory;
    }
  }
}

const partOne = directories
  .filter((dir) => dir.size <= 100000)
  .reduce((sum, dir) => sum + dir.size, 0);

console.log(partOne);

// --------------------
// Part 2
// --------------------

const totalSpace = 70000000;
const neededSpace = 30000000;
const currentFreeSpace = totalSpace - rootDirectory.size;

const minimumSpaceToFree = neededSpace - currentFreeSpace;

const candidateDirectories = directories.filter(
  (dir) => dir.size > minimumSpaceToFree
);

candidateDirectories.sort((a, b) => a.size - b.size);
const smallestCandidate = candidateDirectories[0];

console.log(smallestCandidate.size);
