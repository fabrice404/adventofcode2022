const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

const blueprints = lines.map((line, i) => {
  const [, id, oreRobotCostOre, clayRobotCostOre, obsidianRobotCostOre, obsidianRobotCostClay, geodeRobotCostOre, geodeRobotCostObsidian] =
    line.match(/^Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian.$/).map(Number)

  return {
    id,
    ore: { ore: oreRobotCostOre, clay: 0, obsidian: 0, robots: 1 },
    clay: { ore: clayRobotCostOre, clay: 0, obsidian: 0, robots: 0 },
    obsidian: { ore: obsidianRobotCostOre, clay: obsidianRobotCostClay, obsidian: 0, robots: 0 },
    geode: { ore: geodeRobotCostOre, clay: 0, obsidian: geodeRobotCostObsidian, robots: 0 },
  };
});

// console.log(blueprints);

let totalOre = 0;
let totalClay = 0;
let totalObsidian = 0;
let totalGeode = 0;

const buildRobot = (type, name) => {
  while (
    totalOre >= type.ore &&
    totalClay >= type.clay &&
    totalObsidian >= type.obsidian
  ) {
    console.log(`Builing a ${name} robot`);
    type.robots += 1;
    totalOre -= type.ore;
    totalClay -= type.clay;
    totalObsidian -= type.obsidian;
  }
};

[blueprints[0]].forEach((blueprint) => {
  for (let i = 0; i < 24; i += 1) {
    console.log(`== Minute ${i + 1} ==`)
    const ore = blueprint.ore.robots;
    const clay = blueprint.clay.robots;
    const obsidian = blueprint.obsidian.robots;
    const geode = blueprint.geode.robots;

    buildRobot(blueprint.geode, 'geode');
    buildRobot(blueprint.obsidian, 'obsidian');
    buildRobot(blueprint.clay, 'clay');
    buildRobot(blueprint.ore, 'ore');

    totalOre += ore;
    totalClay += clay;
    totalObsidian += obsidian;
    totalGeode += geode;

    console.log(blueprint.ore.robots, totalOre);
    console.log(blueprint.clay.robots, totalClay);
    console.log(blueprint.obsidian.robots, totalObsidian);
    console.log(blueprint.geode.robots, totalGeode);

    console.log(`===============`);
  }
});

