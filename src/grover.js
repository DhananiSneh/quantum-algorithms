import { h, probabilityOf, x, zeros } from "./simulator.js";

// Two-qubit search. One Grover iteration lands on the marked basis state.
// marked is an integer from 0 to 3.
export function grover(marked) {
  if (marked < 0 || marked > 3) throw new Error("marked state must be 0, 1, 2, or 3");
  let amp = zeros(2);
  amp = h(h(amp, 0), 1);
  amp = amp.map((a, i) => (i === marked ? -a : a));
  amp = h(h(amp, 0), 1);
  amp = x(x(amp, 0), 1);
  amp = amp.map((a, i) => (i === 3 ? -a : a));
  amp = x(x(amp, 0), 1);
  amp = h(h(amp, 0), 1);
  return {
    state: marked,
    probability: probabilityOf(amp, marked),
  };
}
