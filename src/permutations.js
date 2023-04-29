module.exports = {
  alignToEnd: function(boosts, callback, maxDuration = 60, maxBoosts = 5, permutation = []) {
    if (boosts.length == 0) {
      callback(permutation); // Only call back once all boosts have been applied
      return;
    }

    availableStarts = this.findStartPositions(permutation);

    availableStarts.forEach(start => {
      var newBoosts = structuredClone(boosts);
      var boost = newBoosts.shift();
      boost.start = start;
      var newPermutation = permutation.concat(boost);
      if (this.isValidPermutation(newPermutation, maxDuration, maxBoosts)) {
        process.nextTick(() => { // Don't fill the call stack
          this.alignToEnd(newBoosts, callback, maxDuration, maxBoosts, newPermutation);
        });
      }
    });
  },

  preCalculated: function(permutations, callback, maxDuration = null, maxBoosts = null) {
    throw "Not implemented"; // TODO
  },

  isValidPermutation: function(permutation, maxDuration, maxBoosts) {
    return true; // TODO
  },

  findStartPositions: function(base) {
    var availableStarts = [0];
    for (let i = 0; i < base.length; i++) {
      availableStarts.push(base[i].start + base[i].duration);
    }

    return availableStarts;
  }
}

// Example of a permutation:
// [
//   { type: 'e', multiplier: 3,  duration: 20, cost: 50,  start: 0 },
//   { type: 'e', multiplier: 10, duration: 15, cost: 150, start: 20 },
//   { type: 'm', multiplier: 10, duration: 30, cost: 750, start: 0 }
// ]
//
// Meaning:
// [ ---- 3e 20m ---- ][ - 10e 15m - ]
// [ --------- 10m 30m -------- ]
