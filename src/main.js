const MAX_BOOSTS = 5;
const MAX_DURATION = 30;
const CALC_DURATION = 10;

if (CALC_DURATION >= MAX_DURATION) {
  throw "CALC_DURATION must be less than MAX_DURATION";
}

const boostTexts = [
  "50:    3e  20m",
  "150:   10e 15m",
  "750:   10e 3h",
  "2500:  50e 10m",
  "7500:  50e 2h",
  "1000:  2m  30m",
  "8000:  10m 10m",
  "15000: 5m  1h",
  "50000: 50m 10m"
]


// Turn the boost texts into an array of boost objects
const boosts = [];

boostTextRegex = /(\d+): *(\d+)(.) *(\d+)([mh])/;
boostTexts.forEach(boostText => {
  regexMatches = boostTextRegex.exec(boostText);

  var boost = {};

  boost.type = regexMatches[3];
  boost.multiplier = regexMatches[2];
  if (regexMatches[5] == "m") {
    boost.duration = regexMatches[4];
  } else {
    boost.duration = regexMatches[4] * 60;
  }
  boost.cost = regexMatches[1];

  boosts.push(boost);
});

// Generate all possible combinations of boosts
const combinations = generateCombination(boosts);
console.log(JSON.stringify(combinations));

function generateCombination(boosts, base = [], deapth = 5) {
  if (deapth == 0) {
    return [];
  }

  var combinations = [];

  boosts.forEach(boost => {
    var newCombination = base.concat([boost]);
    combinations.push(newCombination);
    combinations = combinations.concat(generateCombination(boosts, newCombination, deapth - 1));
  });

  return combinations;
}
