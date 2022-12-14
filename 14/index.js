const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

let minX;
let maxX;
let minY;
let maxY;

let rocks = [];

const addRock = (x, y) => {
  const key = `${x}/${y}`;
  if (!rocks.includes(key)) {
    rocks.push(key);
  }
}
lines.forEach((line) => {
  const r = line.split(' -> ')
    .map(coords => {
      const [x, y] = coords.split(',')
        .map(i => parseInt(i, 10));
      if (x < minX || minX == null) { minX = x; }
      if (x > maxX || maxX == null) { maxX = x; }
      if (y < minY || minY == null) { minY = y; }
      if (y > maxY || maxY == null) { maxY = y; }
      return { x, y }
    });

  for (let i = 1; i < r.length; i += 1) {
    const start = r[i - 1];
    const end = r[i];

    for (let i = Math.min(start.x, end.x); i <= Math.max(start.x, end.x); i += 1) {
      addRock(i, start.y);
    }
    for (let j = Math.min(start.y, end.y); j <= Math.max(start.y, end.y); j += 1) {
      addRock(start.x, j);
    }
  }
});
// console.log({ minX, maxX, minY, maxY });

const grid = Array.from(
  Array(maxY + 3),
  (e, i) => Array.from(
    Array(maxX + (2 * maxY)),
    () => i === maxY + 2 ? '#' : '.',
  ),
);

rocks.forEach(rock => {
  const [x, y] = rock.split('/').map(i => parseInt(i, 10));
  grid[y][x] = "#";
});

const printGrid = () => {
  // console.log();
  // console.log(grid.length, grid[0].length);
  console.log(grid.map(row => row.slice(minX - 10).join("")).join("\n"));
  console.log()
}

printGrid();

let overflow = false;
let stale = false;
let sands = [];
let i = 0;

let part1 = 0;
let part2 = 0;
while (!stale) {
  for (let s = 0; s < sands.length; s += 1) {
    let sand = sands[s];
    let nextX = sand.x;
    let nextY = sand.y + 1;
    if (nextY > maxY && part1 === 0) {
      overflow = true;
      part1 = grid.flat().filter(x => x === 'o').length;
    }
    if (grid[nextY][nextX] === '.') {
      grid[sand.y][sand.x] = '.';
      grid[nextY][nextX] = '+';
      sand.x = nextX;
      sand.y = nextY;
    } else {
      nextX = nextX - 1;
      if (grid[nextY][nextX] === '.') {
        grid[sand.y][sand.x] = '.';
        grid[nextY][nextX] = '+';
        sand.x = nextX;
        sand.y = nextY;
      } else {
        nextX = nextX + 2;
        if (grid[nextY][nextX] === '.') {
          grid[sand.y][sand.x] = '.';
          grid[nextY][nextX] = '+';
          sand.x = nextX;
          sand.y = nextY;
        } else {
          grid[sand.y][sand.x] = 'o';
        }
      }
    }
  }
  if (sands.length) {
    const { x, y } = sands.slice(-1).pop();
    if (x === 500 && y === 0) {
      stale = true;
      part2 = grid.flat().filter(x => x === 'o').length;
    }
  }
  sands.push({ x: 500, y: 0 });

  i += 1;
}
printGrid();
console.log(part1);
console.log(part2);
