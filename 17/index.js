const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

const jets = lines[0].split("");

const tetrominoes = [
  y => [[2, y], [3, y], [4, y], [5, y]],
  y => [[3, y], [2, y + 1], [3, y + 1], [4, y + 1], [3, y + 2]],
  y => [[2, y], [3, y], [4, y], [4, y + 1], [4, y + 2]],
  y => [[2, y], [2, y + 1], [2, y + 2], [2, y + 3]],
  y => [[2, y], [3, y], [2, y + 1], [3, y + 1]],
];


let jetIndex = 0;
let tetrominoIndex = 0;

let cave = [Array.from(new Array(7), () => "-")];

for (let i = 0; i < 2022; i += 1) {
  // generate new rock
  let nextTetromino = tetrominoes[tetrominoIndex++ % tetrominoes.length](cave.length + 3);

  while (true) {
    let jet = jets[jetIndex++ % jets.length];
    let moveX = jet === ">" ? 1 : -1; // right = x+1, left = x-1
    let movedX = nextTetromino.map(([x, y]) => ([x + moveX, y]));

    if (movedX.every(([x, y]) => (
      (!cave[y] || !cave[y][x]) &&
      x >= 0 &&
      x < 7
    ))) {
      nextTetromino = movedX;
    }

    let moveY = -1; // always go down
    let movedY = nextTetromino.map(([x, y]) => ([x, y + moveY]));
    if (movedY.every(([x, y]) => (!cave[y] || !cave[y][x]))) {
      nextTetromino = movedY;
    } else {
      nextTetromino.forEach(([x, y]) => {
        cave[y] = cave[y] || Array(7);
        cave[y][x] = "#"
      });
      break;
    }
  }
}

console.log(
  cave.length - 1
);
