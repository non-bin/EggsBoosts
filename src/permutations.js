const { nextTick } = require("process");

module.exports = {
  alignStartOrEnd: function(combination, callback) {
    function recurse(boosts, base = [], maxDuration = 60, maxBoosts = 5) {
      callback(base);
    }

    recurse(combination);
  },

  preCalculated: function(permutations, callback) {
    throw "Not implemented"; // TODO
  }
}
