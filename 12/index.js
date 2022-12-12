const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

const log = (args) => {
  // console.log(args);
}

let start;
let end;

const encode = ({ x, y }) => `${x}-${y}`;

const map = lines.map((line, y) => line.split("")
  .map((letter, x) => {
    switch (letter) {
      case "S": start = { x, y, key: encode({ x, y }), value: 0, letter }; return start;
      case "E": end = { x, y, key: encode({ x, y }), value: 27, letter }; return end;
      default: return { x, y, key: encode({ x, y }), value: letter.charCodeAt(0) - 96, letter };
    }
  })
);

// console.log(map);

// part 1
// start from endpoint and get all points around where value <= current point
// rinse and repeat

let finished = false;
let i = 1;
let minSteps = map.length * map[0].length + 1;
let minA = map.length * map[0].length + 1;
let points = [[end.key]];

const checkPoint = (x, y, sourcePoint) => {
  const newPoint = map[y][x];
  log({
    newPoint, sourcePoint,
    valid: sourcePoint.value - 1 <= newPoint.value,
    included: points.flat().includes(newPoint.key),
    points: points.flat().join(),
  });
  if (
    !points.flat().includes(newPoint.key) &&
    sourcePoint.value <= newPoint.value + 1
  ) {
    return newPoint.key;
  }
  return null;
};

while (!finished && i < map.length * map[0].length + 1) {
  log("############")
  log(points.slice(-1));
  const newPoints = points.slice(-1)
    .pop()
    .map((currentKey) => {
      let result = [];
      const current = map.flat().find(x => x.key === currentKey);
      log({ current });
      let { x, y } = current;

      if (x > 0) { result.push(checkPoint(x - 1, y, current)); }
      if (y > 0) { result.push(checkPoint(x, y - 1, current)); }
      if (x < map[0].length - 1) { result.push(checkPoint(x + 1, y, current)); }
      if (y < map.length - 1) { result.push(checkPoint(x, y + 1, current)); }

      result = result.filter(p => p && !points.flat().includes(p))
      log({ result });

      if (result.find(p => p === start.key)) {
        if (i < minSteps) {
          minSteps = i;
          console.log(`reached start after ${i} steps!`);
          finished = true;
        }
      }
      if (result.find(p => map.flat().find(mp => mp.key === p).letter === 'a')) {
        if (i < minA) {
          minA = i;
          console.log(`reached a after ${minA} steps!`);
        }
      }
      log('--------------')
      return result;
    });
  log({ newPoints: newPoints.flat() })
  if (newPoints.flat().length > 0 && !finished) {
    points.push([... new Set(newPoints.flat())]);
  }
  i += 1;
  log(i, newPoints.flat().length, points.flat().length);
}
