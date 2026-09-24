import assert from "node:assert/strict";
import test from "node:test";
import { bernsteinVazirani } from "../src/bernstein-vazirani.js";
import { deutschJozsa } from "../src/deutsch-jozsa.js";
import { grover } from "../src/grover.js";

test("Deutsch–Jozsa recognizes constant and balanced functions", () => {
  assert.equal(deutschJozsa(3, () => 0), "constant");
  assert.equal(deutschJozsa(3, () => 1), "constant");
  assert.equal(deutschJozsa(3, (x) => x & 1), "balanced");
  assert.equal(deutschJozsa(3, (x) => bitCount(x) % 2), "balanced");
});

test("Bernstein–Vazirani recovers the hidden string in one query", () => {
  assert.equal(bernsteinVazirani(0b101, 3), 0b101);
  assert.equal(bernsteinVazirani(0b000, 3), 0b000);
  assert.equal(bernsteinVazirani(0b1111, 4), 0b1111);
});

test("Grover finds each of the four two-qubit states", () => {
  for (let marked = 0; marked < 4; marked++) {
    const found = grover(marked);
    assert.equal(found.state, marked);
    assert.ok(found.probability > 0.99);
  }
});

function bitCount(n) {
  let c = 0;
  while (n) {
    c += n & 1;
    n >>= 1;
  }
  return c;
}
