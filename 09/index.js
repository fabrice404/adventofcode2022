const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

// part 1
{
  const start = { x: 0, y: 0 };
  const h = { ...start };
  const t = { ...start };
  const positions = [];

  lines.forEach((line) => {
    let [direction, count] = line.split(" ");
    // console.log({ drsirection, count: +count });

    while (count > 0) {
      switch (direction) {
        case "R":
          h.x += 1;
          break;
        case "L":
          h.x -= 1;
          break;
        case "U":
          h.y += 1;
          break;
        case "D":
          h.y -= 1; break;
      }

      if (h.x - t.x > 1) {
        if (h.y - t.y === 1) {
          t.y += 1;
        } else if (h.y - t.y === -1) {
          t.y -= 1;
        }
        t.x += 1;
      } else if (h.x - t.x < -1) {
        if (h.y - t.y === 1) {
          t.y += 1;
        } else if (h.y - t.y === -1) {
          t.y -= 1;
        }
        t.x -= 1;
      }

      if (h.y - t.y > 1) {
        if (h.x - t.x === 1) {
          t.x += 1;
        } else if (h.x - t.x === -1) {
          t.x -= 1;
        }
        t.y += 1;
      } else if (h.y - t.y < -1) {
        if (h.x - t.x === 1) {
          t.x += 1;
        } else if (h.x - t.x === -1) {
          t.x -= 1;
        }
        t.y -= 1;
      }
      // console.log({ h, t });
      const key = `${t.x}-${t.y}`;
      if (!positions.includes(key)) {
        positions.push(key);
      }
      count -= 1;
    }
  });
  console.log(positions.length);
}

// part 2
{
  const rope = Array.from(new Array(10), () => ({ x: 0, y: 0 }));
  const positions = [];
  lines.forEach((line, lineNum) => {
    // console.log(line);
    let [direction, count] = line.split(" ");
    while (count > 0) {
      switch (direction) {
        case "R":
          rope[0].x += 1;
          break;
        case "L":
          rope[0].x -= 1;
          break;
        case "U":
          rope[0].y += 1;
          break;
        case "D":
          rope[0].y -= 1; break;
      }

      for (let i = 1; i < rope.length; i += 1) {
        const prev = rope[i - 1];
        const curr = rope[i];

        const diffX = prev.x - curr.x;
        const diffY = prev.y - curr.y;

        if (Math.abs(diffX) > 1 || Math.abs(diffY) > 1) {
          curr.x += Math.sign(diffX);
          curr.y += Math.sign(diffY);
        }

        if (i === 9) {
          const key = `${curr.x}-${curr.y}`;
          if (!positions.includes(key)) {
            positions.push(key);
          }
        }
      }

      count -= 1;
    }
  });
  console.log(positions.length);
}
