const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trim().split(/\n/gi);
let elves = [0];

// part 1
let i = 0;
lines.forEach((line) => {
  if (line === "") {
    i += 1;
    elves[i] = 0;
  } else {
    elves[i] += parseInt(line, 10);
  }
});
elves = elves.sort((a, b) => a > b ? 1 : -1);
console.log(...elves.slice(-1));

// part 2

console.log(
  elves.slice(-3).reduce((acc, val) => { return acc + val }, 0)
)
