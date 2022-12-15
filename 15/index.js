const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

const sensors = lines.map((line) => {
  const [sX, sY, bX, bY] = line.replace(/^Sensor at x=/gi, '')
    .replace(/, y=/gi, ',')
    .replace(/: closest beacon is at x=/gi, ',')
    .split(/,/gi)
    .map(s => parseInt(s, 10));

  const sensor = {
    x: sX,
    y: sY,
    distance: Math.abs(sX - bX) + Math.abs(sY - bY),
    beacon: { x: bX, y: bY },
  };

  return sensor;
});

// part 1
const lineNum = 2000000;
const coverage = new Set();
const beacons = new Set();

sensors.forEach((sensor) => {
  let yDiff = Math.abs(sensor.y - lineNum);
  let xMin = sensor.x - sensor.distance + yDiff;
  let xMax = sensor.x + sensor.distance - yDiff;

  for (let i = xMin; i < xMax; i += 1) {
    coverage.add(i);
    if (i === sensor.beacon.x == lineNum === sensor.beacon.y) {
      beacons.add(i);
    }
  }
});

console.log(coverage.size - beacons.size);

// part 2
for (let i = 0; i < 4000000; i += 1) {
  let ranges = [];

  for (let j = 0; j < sensors.length; j += 1) {
    const sensor = sensors[j];

    if (
      sensor.y - sensor.distance < i &&
      sensor.y + sensor.distance > i
    ) {
      let yDiff = Math.abs(sensor.y - i);
      let xMin = Math.max(0, sensor.x - sensor.distance + yDiff);
      let xMax = Math.min(4000000, sensor.x + sensor.distance - yDiff);
      ranges.push({ min: xMin, max: xMax });
    }
  }

  ranges
    .sort((a, b) => a.min - b.min || a.max - b.max)
    .reduce((acc, val) => {
      if (acc.max < val.min - 1) {
        console.log(
          (val.min - 1) * 4000000 + i
        );
      }

      return {
        min: Math.min(acc.min, val.min),
        max: Math.max(acc.max, val.max)
      };
    });
}

