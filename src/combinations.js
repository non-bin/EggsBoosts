const { nextTick } = require("process");

module.exports = {
  simpleRecursive: function(boosts, callback, base = [], depth = 5) {
    if (depth == 0) {
      return;
    }

    boosts.forEach(boost => {
      var newCombination = base.concat([boost]);
      callback(newCombination);
      nextTick(() => { // Don't fill the call stack
        this.simpleRecursive(boosts, callback, newCombination, depth - 1)
      });
    });
  },

  trimmingRecursive: function(boosts, callback, base = [], maxDuration = 60, maxBoosts = 5) {
    throw "Not implemented"; // TODO
  },

  preCalculated: function(combinations, callback) {
    throw "Not implemented"; // TODO
  }
}
