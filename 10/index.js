const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

let i = 0;
let x = 1;
const xs = [];
let crtLine;
const crtLines = [];
let li = 1;

String.prototype.replaceCharAt = function (index, value) {
  return `${this.substring(0, index)}${value}${this.substring(index + 1)}`;
}

const newLine = () => {
  if (crtLine) {
    crtLines.push(crtLine);
  }
  crtLine = "";
};

const nextTick = () => {
  // console.log({ i, x, xs });
  i += 1;
  if ([20, 60, 100, 140, 180, 220].includes(i)) {
    xs.push(x * i);
  }
  if ((i - 1) % 40 === 0) {
    newLine();
    li = 1;
  }
  crtLine += [x, x + 1, x + 2].includes(li) ? '#' : '.';
  li += 1;
};

newLine();

lines.forEach((line) => {
  if (line === "noop") {
    nextTick();
  } else {
    const val = +line.substring(5);
    // console.log(val);
    nextTick();
    nextTick();
    x += val;
  }
});
// console.log({ i, x, xs });
newLine();

console.log(xs.reduce((acc, val) => acc + val, 0));

console.log(crtLines.join('\n'));
