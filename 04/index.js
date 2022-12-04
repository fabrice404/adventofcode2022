const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trim().split(/\n/gi);

let total1 = 0;
let total2 = 0;

// between
Number.prototype.btw = function (a, b) {
  return this >= a && this <= b || this >= b && this <= a;
}

lines.forEach((line) => {
  const [a, b, c, d] = line.split(/[,-]/gi).map(n => parseInt(n, 10));

  if (a >= c && b <= d || a <= c && b >= d) {
    total1 += 1;
  }

  if (a.btw(c, d) || b.btw(c, d) || c.btw(a, b) || d.btw(a, b)) {
    total2 += 1;
  }
});
console.log(total1);
console.log(total2);
