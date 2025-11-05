import type { Enemy, Stats } from "../lib/types";
import { Class } from "../lib/enums";

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

export function resolveAttackOrder(
  playerAgility: number,
  enemySpeed: number
): "player" | "enemy" {
  return enemySpeed >= playerAgility ? "enemy" : "player";
}

export type CombatRoundOutcome = {
  order: ("player" | "enemy")[];
  playerDamage: number; // damage dealt by player to enemy
  enemyDamage: number; // damage dealt by enemy to player
  enemyLifeAfter: number;
  playerLifeAfter: number;
  victory: boolean;
  defeat: boolean;
};

export function resolveCombatRound(params: {
  playerStats: Stats;
  userClass: Class;
  enemy: Enemy;
  playerLife: number;
}): CombatRoundOutcome {
  const { playerStats, userClass, enemy, playerLife } = params;
  const order =
    resolveAttackOrder(playerStats.agility, enemy.speed) === "enemy"
      ? ["enemy" as const, "player" as const]
      : ["player" as const, "enemy" as const];

  const playerDamage = calculateDamage(playerStats, userClass, enemy);
  const enemyDamage = enemy.attack ?? 0;

  let enemyLife = enemy.life;
  let playerHp = playerLife;
  let victory = false;
  let defeat = false;

  for (const side of order) {
    if (side === "player") {
      enemyLife -= playerDamage;
      if (enemyLife <= 0) {
        victory = true;
        break;
      }
    } else {
      playerHp -= enemyDamage;
      if (playerHp <= 0) {
        defeat = true;
        break;
      }
    }
  }

  return {
    order,
    playerDamage,
    enemyDamage,
    enemyLifeAfter: enemyLife,
    playerLifeAfter: playerHp,
    victory,
    defeat,
  };
}

export function attemptRun(params: {
  playerAgility: number;
  enemySpeed: number;
  enemyAttack: number | undefined;
}): { outcome: "success" | "impossible"; retaliationDamage: number } {
  const { playerAgility, enemySpeed, enemyAttack } = params;
  if (enemySpeed > playerAgility) {
    // Run impossible when enemy is faster; enemy retaliates
    return { outcome: "impossible", retaliationDamage: enemyAttack ?? 0 };
  }
  return { outcome: "success", retaliationDamage: 0 };
}
