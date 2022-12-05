const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

{
  const stacks = [];
  lines.filter(x => x.trim()).forEach((line) => {
    if (line.trim().startsWith("[")) {
      const chars = line.split("")
      if (stacks.length === 0) {
        const len = Math.floor(chars.length / 3);
        stacks.push(
          ...Array.from(Array(len), () => [])
        );
      }
      for (let i = 1, j = 0; i < chars.length; i += 4, j += 1) {
        const char = chars[i];
        if (char.trim()) {
          stacks[j].unshift(char);
        }
      }
    } else if (line.trim().startsWith("move")) {
      const [count, from, to] = line.replace(/[^0-9 ]/gi, '').trim().replace(/  /gi, ' ').split(" ");
      for (let i = 0; i < count; i += 1) {
        stacks[to - 1].push(stacks[from - 1].pop());
      }
    }
  });
  console.log(stacks.map(stack => stack[stack.length - 1]).join(""));
}

{
  const stacks = [];
  lines.filter(x => x.trim()).forEach((line) => {
    if (line.trim().startsWith("[")) {
      const chars = line.split("")
      if (stacks.length === 0) {
        const len = Math.floor(chars.length / 3);
        stacks.push(
          ...Array.from(Array(len), () => [])
        );
      }
      for (let i = 1, j = 0; i < chars.length; i += 4, j += 1) {
        const char = chars[i];
        if (char.trim()) {
          stacks[j].unshift(char);
        }
      }
    } else if (line.trim().startsWith("move")) {
      const [count, from, to] = line.replace(/[^0-9 ]/gi, '').trim().replace(/  /gi, ' ').split(" ");
      stacks[to - 1].push(...stacks[from - 1].splice(-count));
    }
  });
  console.log(stacks.map(stack => stack[stack.length - 1]).join(""));
}
