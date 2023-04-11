var tests = 0;
var failed = 0;

var boost1;
var boost2;
var instance1;
var instance2;

try {
  boost1 = new Boost('earnings', 3,  20, 50);   // 3x earnings 20m 50e
} catch (e) {
  failed++;
  console.error('Failed to create boost1\n');
}
tests++;

try {
  boost2 = new Boost('meta',     10, 15, 150);  // 10x earnings 15m 150e
} catch (e) {
  failed++;
  console.error('Failed to create boost2\n');
}
tests++;

if (boost1.toString() !== '{0: 3x earnings 20m 50e}') {
  failed++;
  console.error('Boost 1 toString() failed');
  console.error('Expected: {0: 3x earnings 20m 50e}');
  console.error('Actual:   ' + boost1.toString() + '\n');
}
tests++;

if (boost2.toString() !== '{1: 10x meta 15m 150e}') {
  failed++;
  console.error('Boost 2 toString() failed');
  console.error('Expected: {1: 10x meta 15m 150e}');
  console.error('Actual:   ' + boost2.toString() + '\n');
}
tests++;

try {
  instance1 = new Instance();
} catch (e) {
  failed++;
  console.error('Failed to create instance1\n');
}
tests++;

try {
  instance2 = new Instance();
} catch (e) {
  failed++;
  console.error('Failed to create instance2\n');
}
tests++;

instance1.applyBoost(boost1);
instance1.applyBoost(boost2);

for (let i = 0; i < 6; i++) {
  instance2.applyBoost(boost1);
}

var boostBreakdown1 = instance1.getBoostBreakdown();
var boostBreakdown2 = instance2.getBoostBreakdown();

if (boostBreakdown1.length !== 2 || boostBreakdown1[0][0].id !== 0 || boostBreakdown1[0][1] !== 1 || boostBreakdown1[1][0].id !== 1 || boostBreakdown1[1][1] !== 1) {
  failed++;
  console.error('Instance 1 boost breakdown failed');
  console.error('Expected: [[0, 1], [1, 1]]');
  console.error(`Actual:   [[${boostBreakdown1[0][0].id}, ${boostBreakdown1[0][1]}], [${boostBreakdown1[1][0].id}, ${boostBreakdown1[1][1]}]] length: ${boostBreakdown1.length}\n`);
}
tests++;

if (boostBreakdown2.length !== 1 || boostBreakdown2[0][0].id !== 0 || boostBreakdown2[0][1] !== 6) {
  failed++;
  console.error('Instance 2 boost breakdown failed');
  console.error('Expected: [[0, 6]]');
  console.error(`Actual:   [[${boostBreakdown2[0][0].id}, ${boostBreakdown2[0][1]}]] length: ${boostBreakdown2.length}\n`);
}
tests++;

if (instance1.getCost() !== 200) {
  failed++;
  console.error('Instance 1 cost failed');
  console.error('Expected: 200');
  console.error('Actual:   ' + instance1.getCost() + '\n');
}
tests++;

if (instance2.getCost() !== 250) {
  failed++;
  console.error('Instance 2 cost failed');
  console.error('Expected: 250');
  console.error('Actual:   ' + instance2.getCost() + '\n');
}
tests++;

var earningsBreakdown1 = instance1.getEarningsBreakdown();
var earningsBreakdown2 = instance2.getEarningsBreakdown();

if (earningsBreakdown1.length !== 2 || earningsBreakdown1[0][0] !== 15 || earningsBreakdown1[0][1] !== 30 || earningsBreakdown1[1][0] !== 5 || earningsBreakdown1[1][1] !== 3) {
  failed++;
  console.error('Instance 1 earnings breakdown failed');
  console.error('Expected: [[15, 30], [5, 3]]');
  console.error('Actual:   ' + JSON.stringify(earningsBreakdown1) + '\n');
}
tests++;

if (earningsBreakdown2.length !== 1 || earningsBreakdown2[0][0] !== 20 || earningsBreakdown2[0][1] !== 18) {
  failed++;
  console.error('Instance 2 earnings breakdown failed');
  console.error('Expected: [[20,18]]');
  console.error('Actual:   ' + JSON.stringify(earningsBreakdown2) + '\n');
}
tests++;

if (instance1.getEarningsAverage() !== 23.25) {
  failed++;
  console.error('Instance 1 earnings average failed');
  console.error('Expected: 23.25');
  console.error('Actual:   ' + instance1.getEarningsAverage() + '\n');
}
tests++;

if (instance2.getEarningsAverage() !== 18) {
  failed++;
  console.error('Instance 2 earnings average failed');
  console.error('Expected: 18');
  console.error('Actual:   ' + instance2.getEarningsAverage() + '\n');
}
tests++;

var instance3;
var instance4;

try {
  instance3 = instance1.clone();
} catch (e) {
  failed++;
  console.error('Failed to clone to instance 3\n');
}
tests++;

try {
  instance4 = instance3.clone();
} catch (e) {
  failed++;
  console.error('Failed to clone to instance 4\n');
}
tests++;

var boostBreakdown3 = instance3.getBoostBreakdown();
var boostBreakdown4 = instance4.getBoostBreakdown();

if (boostBreakdown3.length !== 2 || boostBreakdown3[0][0].id !== 0 || boostBreakdown3[0][1] !== 1 || boostBreakdown3[1][0].id !== 1 || boostBreakdown3[1][1] !== 1) {
  failed++;
  console.error('Instance 3 boost breakdown failed');
  console.error('Expected: [[0, 1], [1, 1]]');
  console.error(`Actual:   [[${boostBreakdown3[0][0].id}, ${boostBreakdown3[0][1]}], [${boostBreakdown3[1][0].id}, ${boostBreakdown3[1][1]}]] length: ${boostBreakdown3.length}\n`);
}
tests++;

if (boostBreakdown4.length !== 2 || boostBreakdown4[0][0].id !== 0 || boostBreakdown4[0][1] !== 1 || boostBreakdown4[1][0].id !== 1 || boostBreakdown4[1][1] !== 1) {
  failed++;
  console.error('Instance 3 boost breakdown failed');
  console.error('Expected: [[0, 1], [1, 1]]');
  console.error(`Actual:   [[${boostBreakdown4[0][0].id}, ${boostBreakdown4[0][1]}], [${boostBreakdown4[1][0].id}, ${boostBreakdown4[1][1]}]] length: ${boostBreakdown4.length}\n`);
}
tests++;


if (failed == 0) {
  console.log('\x1b[32m%s\x1b[0m', `All ${tests} tests passed\n`);
} else {
  console.error(`${failed}/${tests} tests failed\n`);
  process.exit(1);
}
