import { hadamardAll, mostLikelyData, oracle, x, zeros } from "./simulator.js";

// Hidden string s is recovered with one query. f(x) = s · x mod 2.
export function bernsteinVazirani(secret, dataQubits) {
  const dot = (x) => bitCount(x & secret) % 2;
  let amp = zeros(dataQubits + 1);
  amp = x(amp, dataQubits);
  amp = hadamardAll(amp, 0, dataQubits + 1);
  amp = oracle(amp, dataQubits, dot);
  amp = hadamardAll(amp, 0, dataQubits);
  const { outcome, probability } = mostLikelyData(amp, dataQubits);
  if (probability < 0.99) {
    throw new Error("Bernstein–Vazirani did not recover the secret");
  }
  return outcome;
}

function bitCount(n) {
  let c = 0;
  while (n) {
    c += n & 1;
    n >>= 1;
  }
  return c;
}
