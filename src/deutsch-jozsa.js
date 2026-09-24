import { hadamardAll, mostLikelyData, oracle, x, zeros } from "./simulator.js";

// One query tells a constant function from a balanced one.
// Returns "constant" or "balanced".
export function deutschJozsa(dataQubits, f) {
  let amp = zeros(dataQubits + 1);
  amp = x(amp, dataQubits);
  amp = hadamardAll(amp, 0, dataQubits + 1);
  amp = oracle(amp, dataQubits, f);
  amp = hadamardAll(amp, 0, dataQubits);
  const { outcome, probability } = mostLikelyData(amp, dataQubits);
  if (probability < 0.99) {
    throw new Error("Deutsch–Jozsa did not produce a decisive measurement");
  }
  return outcome === 0 ? "constant" : "balanced";
}
