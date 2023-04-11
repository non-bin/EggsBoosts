class Instance {
  static config: any = {
    'bulkDiscount': [5, 0.2], // 20% discount when buying 5 of one boost
  };

  static setConfig(config: any) {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        Instance.config[key] = config[key];
      }
    }
  }

  boosts: Boost[];

  constructor() {
    this.boosts = [];
  }

  applyBoost(boost: Boost) {
    this.boosts.push(boost);
  }

  /*
  * Returns an object in the format [[minuites, multiplier], ...]
  * eg [[30, 10], [10, 2]] would mean 30 minutes of 10x earnings, then 10 minutes of 2x earnings
  */
  getEarningsBreakdown() {
    const breakdown = [];

    var time = 0;

    while (true) {
      var nextTime = Infinity;
      var earnings = 0;
      var meta = 0;

      for (let i = 0; i < this.boosts.length; i++) {
        const boost = this.boosts[i];

        if (boost.duration > time) {
          nextTime = Math.min(nextTime, boost.duration);

          if (boost.type == Boost.Type.earnings) {
            earnings += boost.multiplier;
          } else if (boost.type == Boost.Type.meta) {
            meta += boost.multiplier;
          }
        }
      }

      if (nextTime == Infinity && earnings == 0 && meta == 0) {
        break;
      }

      meta     = Math.max(1, meta);
      earnings = Math.max(1, earnings);

      breakdown.push([nextTime - time, earnings * meta]);
      time = nextTime;
    }

    return breakdown;
  }

  getEarningsAverage() {
    const breakdown = this.getEarningsBreakdown();

    var total = 0;
    var time = 0;

    for (let i = 0; i < breakdown.length; i++) {
      if (breakdown[i][1] > 1) { // only count time where earnings > 1x
        total += breakdown[i][0] * breakdown[i][1]; // minutes * earnings
        time += breakdown[i][0];
      }
    }

    return total / time;
  }

  getDuration() {
    const breakdown = this.getEarningsBreakdown();

    var time = 0;

    for (let i = 0; i < breakdown.length; i++) {
      if (breakdown[i][1] > 1) { // only count time where earnings > 1x
        time += breakdown[i][0];
      }
    }

    return time;
  }

  /*
  * Returns an object in the format [[Boost, count], ...]
  * eg [[boost1, 5], [boost, 2]] would mean 5 of one boost, and 2 of another
  */
  getBoostBreakdown(idOnly = false): number[] | Boost[] {
    const breakdown: any = [];

    for (let i = 0; i < this.boosts.length; i++) {
      const boost = this.boosts[i];

      var found = false;

      for (let j = 0; j < breakdown.length; j++) {
        if (breakdown[j][0].id == boost.id) {
          breakdown[j][1]++;
          found = true;
          break;
        }
      }

      if (!found) {
        breakdown.push([boost, 1]);
      }
    }

    if (idOnly) {
      for (let i = 0; i < breakdown.length; i++) {
        breakdown[i][0] = breakdown[i][0].id;
      }
    }

    return breakdown;
  }

  getCost() {
    const breakdown = this.getBoostBreakdown();

    var cost = 0;

    for (let i = 0; i < breakdown.length; i++) {
      const boost = breakdown[i][0];
      const count = breakdown[i][1];

      cost += boost.cost * Math.floor(count / Instance.config.bulkDiscount[0]) * Instance.config.bulkDiscount[0] * (1-Instance.config.bulkDiscount[1]);
      cost += boost.cost * (count % Instance.config.bulkDiscount[0]);
    }

    return cost;
  }

  getSummary(): Instance.Summary {
    return {
      boostIds: this.getBoostBreakdown(true),
      cost: this.getCost(),
      averageEarnings: this.getEarningsAverage()
    }
  }

  clone() {
    const inst = new Instance();

    for (let i = 0; i < this.boosts.length; i++) {
      inst.applyBoost(this.boosts[i]);
    }

    return inst;
  }
}

namespace Instance {
  export type Summary = {
    boostIds: number[],
    cost: number,
    averageEarnings: number
  }
}
