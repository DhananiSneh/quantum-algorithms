// Real amplitudes are enough: these circuits only use H, X, and phase flips of -1.

const S = Math.SQRT1_2;

export function zeros(n) {
  const amp = new Array(1 << n).fill(0);
  amp[0] = 1;
  return amp;
}

export function h(amp, q) {
  const bit = 1 << q;
  const next = new Array(amp.length).fill(0);
  for (let i = 0; i < amp.length; i++) {
    if (i & bit) continue;
    const j = i | bit;
    const a0 = amp[i];
    const a1 = amp[j];
    next[i] = S * (a0 + a1);
    next[j] = S * (a0 - a1);
  }
  return next;
}

export function x(amp, q) {
  const bit = 1 << q;
  const next = amp.slice();
  for (let i = 0; i < amp.length; i++) {
    if (i & bit) continue;
    const j = i | bit;
    next[i] = amp[j];
    next[j] = amp[i];
  }
  return next;
}

export function hadamardAll(amp, from, to) {
  let next = amp;
  for (let q = from; q < to; q++) next = h(next, q);
  return next;
}

// Ancilla is the highest qubit. f(x) is 0 or 1 on the low data bits.
export function oracle(amp, dataQubits, f) {
  const anc = 1 << dataQubits;
  const next = new Array(amp.length).fill(0);
  for (let i = 0; i < amp.length; i++) {
    if (amp[i] === 0) continue;
    const x = i & (anc - 1);
    const y = f(x) ? i ^ anc : i;
    next[y] += amp[i];
  }
  return next;
}

export function mostLikelyData(amp, dataQubits) {
  const anc = 1 << dataQubits;
  const probs = new Map();
  for (let i = 0; i < amp.length; i++) {
    const x = i & (anc - 1);
    probs.set(x, (probs.get(x) || 0) + amp[i] * amp[i]);
  }
  let best = 0;
  let bestP = -1;
  for (const [x, p] of probs) {
    if (p > bestP) {
      best = x;
      bestP = p;
    }
  }
  return { outcome: best, probability: bestP };
}

export function probabilityOf(amp, index) {
  return amp[index] * amp[index];
}
