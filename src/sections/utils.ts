import { Class, type Enemy, type Stats } from "../lib/types";

export function calculateDamage(
  playerStats: Stats,
  userClass: Class,
  enemy: Enemy
): number {
  if (userClass === Class.Mage) {
    const damage = playerStats.intelligence - (enemy.magicResistant ?? 0);
    return damage || 1;
  } else {
    const damage = playerStats.strength - (enemy.physicalResistant ?? 0);
    return damage || 1;
  }
}
