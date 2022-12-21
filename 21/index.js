const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);


const monkeys = lines.reduce((acc, val) => {
  const [monkey, value] = val.split(': ');
  acc[monkey] = value;
  return acc;
}, {});

// part 1
{
  const getMonkeyValue = (monkey) => {
    const value = monkeys[monkey];
    // console.log(value);
    let result = value;
    if (/^\d+$/.test(value)) {
      result = Number(value);
    } else {
      const [m1, sign, m2] = value.split(' ');
      const operation = `${getMonkeyValue(m1)} ${sign} ${getMonkeyValue(m2)}`;
      result = eval(operation);
    }

    monkey[monkey] = result;
    return result;
  };

  console.log(
    getMonkeyValue('root')
  );
}

// part 2
{
  monkeys['root'] = monkeys['root'].replace("+", "=");
  const getMonkeyValue = (monkey) => {
    const value = monkeys[monkey];
    // console.log(value);
    let result = value;
    if (monkey === "humn") {
      return "humn";
    } else if (/^\d+$/.test(value)) {
      result = Number(value);
    } else {
      const [m1, sign, m2] = value.split(' ');
      const operation = `(${getMonkeyValue(m1)} ${sign} ${getMonkeyValue(m2)})`;
      try {
        result = eval(operation);
      } catch {
        result = operation;
      }
    }

    monkey[monkey] = result;
    return result;
  };

  // console.log(monkeys);
  console.log(
    getMonkeyValue('root').replace(/humn/g, "x")
  );

  // https://quickmath.com/ to solve the equation
}
