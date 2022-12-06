const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

const line = lines[0];
const chars = line.split("");

for (let i = 0; i < chars.length; i += 1) {
  const packet = line.substring(i, i + 4);
  const len = new Set(packet.split("")).size;
  if (len === 4) {
    console.log(i + 4);
    break;
  }
}

for (let i = 0; i < chars.length; i += 1) {
  const packet = line.substring(i, i + 14);
  const len = new Set(packet.split("")).size;
  if (len === 14) {
    console.log(i + 14);
    break;
  }
}
