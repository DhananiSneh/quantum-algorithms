# Quantum algorithms

[![test](https://github.com/DhananiSneh/quantum-algorithms/actions/workflows/test.yml/badge.svg)](https://github.com/DhananiSneh/quantum-algorithms/actions/workflows/test.yml)

Three quantum algorithms on a small state-vector simulator. No quantum computer, and no extra packages.

| Algorithm | What one run decides |
|---|---|
| Deutsch–Jozsa | Whether a function is constant or balanced |
| Bernstein–Vazirani | The hidden bit string inside a linear function |
| Grover | Which of four states was marked |

The simulator uses real amplitudes. These circuits only need the Hadamard gate, the X gate, and a phase of −1.

## Run the tests

```bash
npm test
```

Node.js 20 or newer.

## How each one is wired

**Deutsch–Jozsa.** An extra qubit starts in `|1>`, Hadamards spread the input, the function is queried once, and Hadamards return the data qubits. All zeros means the function is constant. Anything else means it is balanced.

**Bernstein–Vazirani.** The same shape of circuit. The function is the dot product of the input with a secret string. The measured bits are that secret.

**Grover.** Two qubits, one marked state, one iteration. The oracle flips the phase of the marked state, then the diffusion step concentrates the amplitude there.

## Author

[Sneh Dhanani](https://github.com/DhananiSneh) develops web products, iOS apps, Android apps, custom software, and quantum algorithms.

[snehdhanani1@gmail.com](mailto:snehdhanani1@gmail.com)
