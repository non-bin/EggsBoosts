const combinationFunctions = require("./combinations");
const permutationFunctions = require("./permutations");

const MAX_BOOSTS = 5;
const MAX_DURATION = 60;
const CALC_DURATION = 30;

const boostTexts = [
  "50:    3e  20m",
  "150:   10e 15m",
  // "750:   10e 3h",
  // "2500:  50e 10m",
  // "7500:  50e 2h",
  // "1000:  2m  30m",
  // "8000:  10m 10m",
  // "15000: 5m  1h",
  // "50000: 50m 10m"
]

if (CALC_DURATION >= MAX_DURATION) {
  throw "CALC_DURATION must be less than MAX_DURATION";
}

// Turn the boost texts into an array of boost objects
const boosts = [];

boostTextRegex = /(\d+): *(\d+)(.) *(\d+)([mh])/;
boostTexts.forEach(boostText => {
  regexMatches = boostTextRegex.exec(boostText);

  var boost = {};

  boost.type = regexMatches[3];
  boost.multiplier = Number(regexMatches[2]);
  if (regexMatches[5] == "m") {
    boost.duration = Number(regexMatches[4]);
  } else {
    boost.duration = Number(regexMatches[4] * 60);
  }
  boost.cost = Number(regexMatches[1]);

  boosts.push(boost);
});

var noPermutations = 0;
var lastDisplayUpdate = 0;

// Generate all possible combinations of boosts
combinationFunctions.simpleRecursive([1,2,3,4], (combination) => {

  // console.log(JSON.stringify(combination));

  // Generate all possible permutations of the combination
  permutationFunctions.alignToEnd(combination, (permutation) => {
    noPermutations++;
    // if (process.uptime() - lastDisplayUpdate > 0.2) {
    //   lastDisplayUpdate = process.uptime();
    //   console.log(`Permutations: ${noPermutations}`);
    // }

    console.log(JSON.stringify(permutation));
  });
});
