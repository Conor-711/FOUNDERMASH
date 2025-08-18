export type EloUpdate = {
  Ra: number;
  Rb: number;
};

// K-factor; for simplicity use fixed 32
const K = 32;

export function expectedScore(Ra: number, Rb: number): { Ea: number; Eb: number } {
  const qa = Math.pow(10, Ra / 400);
  const qb = Math.pow(10, Rb / 400);
  const Ea = qa / (qa + qb);
  const Eb = qb / (qa + qb);
  return { Ea, Eb };
}

export function updateElo(Ra: number, Rb: number, winner: 'A' | 'B'): EloUpdate {
  const { Ea, Eb } = expectedScore(Ra, Rb);
  const Sa = winner === 'A' ? 1 : 0;
  const Sb = winner === 'B' ? 1 : 0;
  const newRa = Math.round(Ra + K * (Sa - Ea));
  const newRb = Math.round(Rb + K * (Sb - Eb));
  return { Ra: newRa, Rb: newRb };
}


