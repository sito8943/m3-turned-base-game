import type { Stats } from "../lib/types";
import { LEVEL_UP_EXP } from "./constants";

export function computeExpGain(expGained: number, level: number): number {
  // Current design: scale exp by level
  return Math.floor(expGained / level);
}

export function applyAttributeIncrease(
  stats: Stats,
  attribute: keyof Stats
): Stats {
  const newStats = { ...stats };
  newStats[attribute]++;
  if (attribute === "strength") {
    newStats.life += 8;
  } else if (attribute === "intelligence") {
    newStats.mana += 8;
  }
  return newStats;
}

export { LEVEL_UP_EXP };

