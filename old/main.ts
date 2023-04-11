// log typeof Boost
console.log(typeof Boost);

// Instance.config({
//   bulkDiscount: [5, 0.2], // 20% discount when buying 5 of one boost TODO
// });

// 'earnings', 'hatchery', 'soul', 'meta'
var boosts: {
  earnings: Boost[],
  meta: Boost[],
  hatchery: Boost[],
  soul: Boost[]
} = {
  earnings: [],
  meta: [],
  hatchery: [],
  soul: []
};

//                              type, multiplier, duration, cost
// boosts.earnings.push(new Boost(Boost.Type.earnings, 3,  20,  50));   // 3x earnings for 20 minutes, for 50 eggs
boosts.earnings.push(new Boost(Boost.Type.earnings, 10, 15,  150));  // 10x earnings for 15 minutes, for 150 eggs
// boosts.earnings.push(new Boost(Boost.Type.earnings, 10, 180, 750));  // 10x earnings for 3 hours, for 750 eggs
boosts.earnings.push(new Boost(Boost.Type.earnings, 50, 10,  2500)); // 50x earnings for 10 minutes, for 2500 eggs
// boosts.earnings.push(new Boost(Boost.Type.earnings, 50, 120, 7500)); // 50x earnings for 2 hours, for 7500 eggs

boosts.meta.push(new Boost(Boost.Type.meta, 2,  30, 1000));  // 2x meta for 30 minutes, for 1000 eggs
boosts.meta.push(new Boost(Boost.Type.meta, 10, 10, 8000));  // 10x meta for 10 minutes, for 8000 eggs
// boosts.meta.push(new Boost(Boost.Type.meta, 5,  60, 15000)); // 5x meta for 1 hour, for 15000 eggs
boosts.meta.push(new Boost(Boost.Type.meta, 50, 10, 50000)); // 50x meta for 10 minutes, for 50000 eggs

const allBoosts: Boost[] = boosts.earnings.concat(boosts.meta);

const instances: Instance[] = []
recursiveApplyBoosts(new Instance(), allBoosts, instances, 5);

function recursiveApplyBoosts(inst: Instance, boosts: Boost[], instances: Instance[], deapth: number) {
  instances.push(inst.getSummary());

  if (deapth == 0) {
    return;
  }

  if (deapth == 4) {
    console.log('.');
  }

  for (let i = 0; i < boosts.length; i++) {
    var newInst = inst.clone();
    newInst.applyBoost(boosts[i]);
    recursiveApplyBoosts(newInst, boosts, instances, deapth - 1);
  }
}

console.log(instances);
debugger;
