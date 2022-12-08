const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

let currentPath = [];
const folders = {};

lines.forEach((line) => {
  // console.log(line);
  if (line.startsWith("$ cd")) {
    const folder = line.replace("$ cd", "").trim();
    if (folder === "..") {
      currentPath.pop();
    } else {
      currentPath.push(folder);
    }
    if (folders[currentPath.join("/")] == null) {
      folders[currentPath.join("/")] = { items: [], filesSize: 0, totalSize: 0 };
    }
  } else if (line.startsWith("$ ls")) {
  } else if (line.startsWith("dir")) {
    const folder = line.replace(/^dir/gi, "").trim();
    folders[currentPath.join("/")].items.push({ type: "folder", name: folder })
  } else {
    const [size, fileName] = line.split(" ");
    folders[currentPath.join("/")].items.push({ type: "file", name: fileName, size: +size })
    folders[currentPath.join("/")].filesSize += +size;
  }
});

Object.keys(folders).forEach((key) => {
  folders[key].totalSize = Object.keys(folders)
    .filter(k => k.startsWith(key))
    .reduce((acc, val) => acc + folders[val].filesSize, 0);
});

const result = Object.values(folders)
  .filter(({ totalSize }) => totalSize < 100000)
  .reduce((acc, val) => acc + val.totalSize, 0);
console.log(result);

const totalUsed = folders['/'].totalSize;

const resultB = Object.values(folders)
  .filter(({ totalSize }) => totalSize > Math.abs(70000000 - totalUsed - 30000000))
  .sort((a, b) => a.totalSize > b.totalSize ? 1 : -1);
console.log(resultB[0].totalSize);
