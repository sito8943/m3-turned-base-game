import type { Enemy } from "../lib/types";

export const enemies: Enemy[] = [
  {
    name: "👺 Goblin",
    attack: 1,
    life: 4,
    speed: 1,
    givenExp: 25,
  },
  {
    name: "🐺 Dire wolf",
    attack: 2,
    life: 4,
    speed: 4,
    magicResistant: 1,
    givenExp: 30,
  },
  {
    name: "💀 🔪 Skeleton",
    attack: 2,
    life: 8,
    speed: 2,
    givenExp: 50,
    physicalResistant: 2,
  },
  {
    name: "👺 🪓 Orc",
    attack: 3,
    life: 10,
    speed: 2,
    physicalResistant: 1,
    givenExp: 60,
  },
  {
    name: "🐺 Giant Wolf",
    attack: 4,
    life: 8,
    speed: 8,
    magicResistant: 2,
    givenExp: 70,
  },
  {
    name: "💀 🏹 Skeleton Archer",
    attack: 3,
    life: 9,
    speed: 5,
    givenExp: 70,
    physicalResistant: 2,
  },
];

// Weights are computed dynamically based on player level (see getRandomEnemy)

function getTier(name: string): number {
  switch (name) {
    case "👺 Goblin":
    case "🐺 Dire wolf":
      return 1;
    case "💀 🔪 Skeleton":
      return 2;
    case "👺 🪓 Orc":
    case "🐺 Giant Wolf":
    case "💀 🏹 Skeleton Archer":
      return 3;
    default:
      return 1;
  }
}

export function getRandomEnemy(playerLevel: number): Enemy {
  if (enemies.length === 0) {
    throw new Error("No enemies available");
  }

  // Dynamic weights based on player level
  const highLevel = playerLevel > 3;
  const weights = enemies.map((e) => {
    const tier = getTier(e.name);
    if (!highLevel) {
      // Early game: favor weak enemies, rare strong ones
      if (tier === 1) return 5;
      if (tier === 2) return 2;
      return 0; // tier 3
    }
    // Higher level: favor strong enemies, keep weak ones less frequent
    if (tier === 1) return 1;
    if (tier === 2) return 3;
    return 5; // tier 3
  }) as number[];
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < enemies.length; i++) {
    if (r < weights[i]) {
      return { ...enemies[i] };
    }
    r -= weights[i];
  }

  // Fallback (shouldn't hit): return a copy of the last enemy
  return { ...enemies[enemies.length - 1] };
}
