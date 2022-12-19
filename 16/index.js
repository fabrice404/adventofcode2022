const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
const lines = input.trimEnd().split(/\n/gi);

let initialValve;
const valves = {};
lines.forEach((line) => {
  let [valve, flowRate, ...destinations] = line
    .replace(/Valve /g, '')
    .replace(/ has flow rate=/g, ',')
    .replace(/; tunnel leads to valve /g, ',')
    .replace(/; tunnels lead to valves /g, ',')
    .replace(/ /g, '')
    .replace(/,,/g, ',')
    .split(',');
  valves[valve] = { flowRate, destinations };
  if (initialValve == null) {
    initialValve = `${valve}`;
  }
});
console.dir({ valves }, { depth: 3 });


const findRoutes = (subRoute) => {
  const subRouteParts = subRoute.split('-');
  const lastValve = subRouteParts.slice(-1).pop();
  if (subRouteParts.length > 10) {
    return subRoute;
  }
  return valves[lastValve].destinations
    .map((destination) => findRoutes(`${subRoute}-${destination}`));
};

// find all best routes 
console.log(
  findRoutes("AA").flat(100)
);


// const replaceValvesByValues = (route) => {
//   const alreadyOpened = [];
//   let lastFlowRate = 0;
//   return route.split(/-/gi)
//     .map((step, i) => {
//       let result = lastFlowRate;
//       if (!alreadyOpened.includes(step)) {
//         alreadyOpened.push(step);


//         result = lastFlowRate + +valves[step].flowRate;
//         lastFlowRate = result;
//       }
//       return `${lastFlowRate}+${result}`;
//     })
//     .join("+");
// };

// const L = 30;
// const navigate = (route, alreadyOpened = []) => {
//   const routeParts = route.split(/-/gi);
//   const [lastValve, lastValue] = routeParts.filter(r => r !== "OpeningValve").pop().split('/');

//   if (!alreadyOpened.includes(lastValve) && valves[lastValve].flowRate > 0) {
//     route += `/${lastValue || 0}-${lastValve}/${valves[lastValve].flowRate}`;
//     alreadyOpened.push(lastValve);
//   } else {
//     route += `/${lastValue || 0}`;
//   }

//   if (routeParts.length >= L) {
//     return route.split('-').slice(0, L).join('+').replace(/[^0-9+]/gi, '');
//   }

//   return valves[lastValve].destinations
//     .map((destination) => navigate(`${route}-${destination}`, alreadyOpened));
// };
// const routes = navigate(initialValve).flat(30);
// console.log(routes);
// let part1 = 0;
// routes.forEach((route) => {
//   const rate = eval(route);
//   if (rate > part1) {
//     console.log(route);
//     part1 = rate;
//   }
// });
// console.log(part1);
