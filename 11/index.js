const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.split(/\n/gi);

let monkeys = [];

const initMonkeys = () => {
  monkeys = [];
  let monkey;
  let operation;
  let testValue;
  let trueResult;
  let falseResult;

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("Monkey")) {
      const id = +line.replace(/[^0-9]/gi, '');
      monkey = { id, items: [], totalInspections: 0, fn: null };
      operation = null;
      testValue = null;
      trueResult = null;
      falseResult = null;
      monkeys.push(monkey);
    } else if (line.startsWith("Starting items: ")) {
      monkey.items = line.substring("Starting items: ".length).split(", ").map(i => parseInt(i, 10));
    } else if (line.startsWith("Operation: new = ")) {
      operation = line.substring("Operation: new = ".length)
    } else if (line.startsWith("Test: divisible by ")) {
      testValue = +line.substring("Test: divisible by ".length)
      monkey.testValue = testValue;
    } else if (line.startsWith("If true: throw to monkey ")) {
      trueResult = +line.substring("If true: throw to monkey ".length)
    } else if (line.startsWith("If false: throw to monkey ")) {
      falseResult = +line.substring("If false: throw to monkey ".length)
    }
    if (monkey && operation && testValue != null && trueResult != null && falseResult != null) {
      monkey.fn = eval(`(old) => {
        const worryLevel = Math.floor((${operation}) / 3);
        const destination = worryLevel % ${testValue} === 0 ? ${trueResult} : ${falseResult}
        return { worryLevel, destination };
      }`);
      monkey.fn2 = eval(`(old) => {
        const worryLevel = Math.floor((${operation}));
        const destination = worryLevel % ${testValue} === 0 ? ${trueResult} : ${falseResult}
        return { worryLevel, destination };
      }`);
    }
  });
};

// part 1
initMonkeys();

for (let i = 0; i < 20; i += 1) {
  monkeys.forEach((monkey) => {
    monkey.totalInspections += monkey.items.length;
    while (monkey.items.length) {
      const item = monkey.items.shift();
      const { worryLevel, destination } = monkey.fn(item);
      monkeys[destination].items.push(worryLevel);
    }
  });
}

console.log(
  monkeys.sort((a, b) => Math.sign(b.totalInspections - a.totalInspections))
    .slice(0, 2)
    .reduce((acc, val) => acc * val.totalInspections, 1)
);

// part 2
initMonkeys();
const divisors = [];

monkeys.forEach((monkey) => {
  divisors.push(monkey.testValue);
});

// find the LCM (PPCM en Français)
const lcm = divisors.reduce((acc, val) => acc * val, 1);

for (let i = 0; i < 10000; i += 1) {
  monkeys.forEach((monkey) => {
    monkey.totalInspections += monkey.items.length;
    while (monkey.items.length) {
      let item = monkey.items.shift();
      if (item > lcm) item = item % lcm
      const { worryLevel, destination } = monkey.fn2(item);
      monkeys[destination].items.push(worryLevel);
    }
  });
}

console.log(
  monkeys.sort((a, b) => Math.sign(b.totalInspections - a.totalInspections))
    .slice(0, 2)
    .reduce((acc, val) => acc * val.totalInspections, 1)
);
