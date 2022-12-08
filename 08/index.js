const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

// part 1
{
  const grid = lines.map((line) => line.split("").map((tree) => ({ height: parseInt(tree, 10), visible: false })));

  const checkRow = (row) => {
    let tallestLTR = row[0].height;
    row[0].visible = true;
    let tallestRTL = row[row.length - 1].height;
    row[row.length - 1].visible = true;

    for (let i = 1; i < row.length - 1; i += 1) {
      const treeLTR = row[i];
      if (treeLTR.height > tallestLTR) {
        tallestLTR = treeLTR.height;
        treeLTR.visible = true;
      }
      const treeRTL = row[row.length - 1 - i];
      if (treeRTL.height > tallestRTL) {
        tallestRTL = treeRTL.height;
        treeRTL.visible = true;
      }
    }
  }

  const checkColumn = (colNum) => {
    let tallestTTB = grid[0][colNum].height;
    grid[0][colNum].visible = true;
    let tallestBTT = grid[grid.length - 1][colNum].height;
    grid[grid.length - 1][colNum].visible = true;


    for (let i = 1; i < grid.length - 1; i += 1) {
      const treeTTB = grid[i][colNum];
      if (treeTTB.height > tallestTTB) {
        tallestTTB = treeTTB.height;
        treeTTB.visible = true;
      }
      const treeBTT = grid[grid.length - 1 - i][colNum];
      if (treeBTT.height > tallestBTT) {
        tallestBTT = treeBTT.height;
        treeBTT.visible = true;
      }
    }
  };

  grid.forEach((row) => {
    checkRow(row);
  });

  grid[0].forEach((col, i) => {
    checkColumn(i);
    checkColumn(i);
  });

  // console.log(grid);
  console.log(grid.flat().filter((tree) => tree.visible).length);
}

// part 2
{
  const grid = lines.map((line) => line.split("").map((tree) => parseInt(tree, 10)));
  // console.log(grid);
  let bestScore = -1;

  for (let x = 0; x < grid[0].length; x += 1) {
    for (let y = 0; y < grid.length; y += 1) {
      const tree = grid[y][x];

      let xLeft = x - 1;
      let scoreLeft = 0;
      let left = [];
      while (xLeft >= 0) {
        const current = grid[y][xLeft];
        left.push(current);
        scoreLeft += 1
        if (current >= tree) {
          break;
        }
        xLeft -= 1;
      }

      let xRight = x + 1;
      let scoreRight = 0;
      let right = [];
      while (xRight <= grid[0].length - 1) {
        let current = grid[y][xRight];
        right.push(current);
        scoreRight += 1;
        if (current >= tree) {
          break;
        }
        xRight += 1;
      }

      let yTop = y - 1;
      let scoreTop = 0;
      let top = [];
      while (yTop >= 0) {
        let current = grid[yTop][x];
        top.push(current);
        scoreTop += 1;
        if (current >= tree) {
          break;
        }
        yTop -= 1;
      }

      let yBottom = y + 1;
      let scoreBottom = 0;
      let bottom = [];
      while (yBottom <= grid.length - 1) {
        let current = grid[yBottom][x];
        bottom.push(current);
        scoreBottom += 1;
        if (current >= tree) {
          break;
        }
        yBottom += 1;
      }

      const score = scoreTop * scoreLeft * scoreRight * scoreBottom;
      if (score > bestScore) {
        bestScore = score;
        console.log({
          tree,
          x, y,
          score,
          scoreTop, top,
          scoreLeft, left,
          scoreRight, right,
          scoreBottom, bottom,
        });
      }
    }
  }
  console.log(bestScore);
}
