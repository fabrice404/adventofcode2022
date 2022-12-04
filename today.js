const fs = require('fs');

const folderName = new Date().getDate().toString().padStart(2, '0');
const folderPath = `${__dirname}/${folderName}`;

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const jsPath = `${folderPath}/index.js`;
if (!fs.existsSync(jsPath)) {
  fs.writeFileSync(jsPath, "const fs = require('fs');\nconst input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');\nconst lines = input.trim().split(\/\\n\/gi);\n\n");
}

const inputPath = `${folderPath}/input.txt`;
if (!fs.existsSync(inputPath)) {
  fs.writeFileSync(inputPath, "\n");
}
