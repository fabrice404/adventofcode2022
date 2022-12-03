const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trim().split(/\n/gi);

{
  let total = 0
  lines.forEach((line) => {
    const comp1 = line.substring(0, line.length / 2);
    const comp2 = line.substring(line.length / 2);

    let c = "";
    comp1.split("").forEach((c1) => {
      if (comp2.split("").includes(c1) && c === "") {
        c = c1;
      }
    });

    const i = c.charCodeAt(0) - (c === c.toLowerCase() ? 96 : 38)
    total += i;
    // console.log({ comp1, comp2, c, i });
  });

  console.log(total);
}

{
  let total = 0
  for (let i = 0; i < lines.length; i += 3) {
    let rs1 = lines[i].split("");
    let rs2 = lines[i + 1].split("");
    let rs3 = lines[i + 2].split("");


    let c = "";
    rs1.forEach((c1) => {
      if (
        rs2.includes(c1) &&
        rs3.includes(c1)
      ) {
        c = c1;
      }
    })
    // 

    const ind = c.charCodeAt(0) - (c === c.toLowerCase() ? 96 : 38)
    total += ind;
    console.log({ rs1, rs2, rs3, c, i });
  };

  console.log(total);
}
