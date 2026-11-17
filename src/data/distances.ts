/** Approximate one-way road distances from Leeuwarden (km). Indicative only — the quote uses the real route. */
export const DISTANCES: [string, number][] = [
  ['Leeuwarden', 0], ['Burgum', 15], ['Franeker', 18], ['Dokkum', 25], ['Sneek', 25], ['Harlingen', 28], ['Bolsward', 30],
  ['Drachten', 30], ['Heerenveen', 30], ['Joure', 35], ['Lauwersoog', 40], ['Beetsterzwaag', 38], ['Lemmer', 50], ['Wolvega', 50],
  ['Zuidhorn', 50], ['Leek', 50], ['Groningen', 60], ['Haren', 70], ['Steenwijk', 70], ['Giethoorn', 80], ['Meppel', 80],
  ['Assen', 85], ['Hoogeveen', 100], ['Kampen', 100], ['Den Helder', 100], ['Zwolle', 105], ['Alkmaar', 115], ['Emmen', 125], ['Amsterdam', 140],
];
export const km = (place: string) => DISTANCES.find(([p]) => p === place)?.[1] ?? 0;
