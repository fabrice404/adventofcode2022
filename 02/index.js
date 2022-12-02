const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trim().split(/\n/gi);

{
  const letters = {
    X: { // rock
      points: 1,
      A: 3,
      B: 0,
      C: 6
    },
    Y: { // paper
      points: 2,
      A: 6,
      B: 3,
      C: 0,
    },
    Z: { // scissor
      points: 3,
      A: 0,
      B: 6,
      C: 3,
    },
  };

  let total = 0;
  lines.forEach((line) => {
    const [opponent, me] = line.split(" ");
    const play = letters[me];
    const result = play.points + play[opponent];

    total += result;
    // console.log({ opponent, me, result });
  })
  console.log(total);
}

{
  const A = 1;
  const B = 2;
  const C = 3;
  const letters = {
    X: { // loss
      points: 0,
      A: C,
      B: A,
      C: B,
    },
    Y: { // draw
      points: 3,
      A: A,
      B: B,
      C: C,
    },
    Z: { // win
      points: 6,
      A: B,
      B: C,
      C: A,
    },
  };

  let total = 0;
  lines.forEach((line) => {
    const [opponent, me] = line.split(" ");
    const play = letters[me];
    const result = play.points + play[opponent];

    total += result;
    console.log({ opponent, me, pts: play.points, opp: play[opponent], result });
  })
  console.log(total);
}
