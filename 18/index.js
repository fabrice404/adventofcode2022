const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

const cubes = lines.map((line) => {
  const [x, y, z] = line.split(",").map(n => parseInt(n, 10));
  return { x, y, z, key: line };
});



const neighbors = ({ x, y, z }) => ([
  { x: x + 1, y, z, key: `${x + 1},${y},${z}` },
  { x: x - 1, y, z, key: `${x - 1},${y},${z}` },
  { x, y: y + 1, z, key: `${x},${y + 1},${z}` },
  { x, y: y - 1, z, key: `${x},${y - 1},${z}` },
  { x, y, z: z + 1, key: `${x},${y},${z + 1}` },
  { x, y, z: z - 1, key: `${x},${y},${z - 1}` },
]);



console.log(
  cubes.reduce((acc, val, i, cubes) => {
    // console.log({ acc, val, i, cubes, n: neighbors(val) });
    const freeFaces = neighbors(val)
      .filter(neighbor => !cubes.map(c => c.key).includes(neighbor.key))
      .length;
    // console.log(freeFaces);
    return acc + freeFaces;
  }, 0)
);
