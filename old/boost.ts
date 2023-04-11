class Boost {
  static nextId: number = 0;

  id: number;
  type: Boost.Type;
  multiplier: number;
  duration: number;
  cost: number;

  constructor(type: Boost.Type, multiplier: number, duration: number, cost: number) {
    if (multiplier < 0) {
      throw new Error('Invalid multiplier: ' + multiplier);
    }
    if (duration < 0) {
      throw new Error('Invalid duration: ' + duration);
    }
    if (cost < 0) {
      throw new Error('Invalid cost: ' + cost);
    }

    this.id = Boost.nextId++;
    this.type = type;
    this.multiplier = multiplier;
    this.duration = duration;
    this.cost = cost;
  }

  toString() {
    return `{${this.id}: ${this.multiplier}x ${this.type} ${this.duration}m ${this.cost}e}`;
  }
}

namespace Boost {
  export enum Type {
    earnings,
    hatchery,
    soul,
    meta
  }
}
