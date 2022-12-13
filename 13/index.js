const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

const isInOrder = (left, right) => {
  // console.log(`Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`);
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    // console.log(`Compare ${JSON.stringify(left[i])} vs ${JSON.stringify(right[i])}`);
    if (right[i] == null) {
      return false;
    } else if (left[i] == null) {
      return true;
    }
    const isLeftArray = Array.isArray(left[i]);
    const isRightArray = Array.isArray(right[i]);
    if (isLeftArray || isRightArray) {
      let result = isInOrder(
        isLeftArray ? left[i] : [left[i]],
        isRightArray ? right[i] : [right[i]],
      );
      if (result != null) {
        return result;
      }
    } else if (left[i] > right[i]) {
      return false;
    } else if (left[i] < right[i]) {
      return true;
    }
  }
}

let pair = 1;
let part1 = 0;
let packets = [];
for (let i = 0; i < lines.length; i += 3) {
  const left = JSON.parse(lines[i]);
  const right = JSON.parse(lines[i + 1]);
  packets.push(left, right);
  const inOrder = isInOrder(left, right);
  if (inOrder !== false) {
    part1 += pair;
  }
  pair += 1;
}
console.log(part1);

packets.push([[2]], [[6]]);
packets = packets.sort((a, b) => isInOrder(a, b) ? -1 : 1).map(p => JSON.stringify(p));

const part2 = (packets.indexOf(JSON.stringify([[2]])) + 1) * (packets.indexOf(JSON.stringify([[6]])) + 1);
console.log(part2);
