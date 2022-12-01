"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var file = (0, fs_1.readFileSync)("./day1/input.txt", "utf-8");
var elvesCalories = file
    .split("\n\n")
    .map(function (elfCalories) {
    return elfCalories.split("\n").map(function (calories) { return Number(calories); });
});
var totalCalories = elvesCalories.map(function (elfCalories) {
    return elfCalories.reduce(function (total, calories) { return total + calories; });
}, 0);
var partOne = Math.max.apply(Math, totalCalories);
console.log(partOne); // 73211
// ----------------------------
var sortedCalories = totalCalories.sort(function (a, b) { return b - a; });
var partTwo = sortedCalories
    .slice(0, 3)
    .reduce(function (total, calories) { return total + calories; }, 0);
console.log(partTwo); // 213958
