import type { Item } from "../../node_modules/ink-select-input/build/SelectInput";
import type { Class, Enemy, Stats } from "../lib/types";

export type LevelPropsType = {
  onAttributeSelect: (attribute: Item<keyof Stats>) => void;
};

export type CombatPropsType = {
  onCombatWon: (expGained: number) => void;
  onCombatLost: (enemy: Enemy) => void;
  playerStats: Stats;
  userClass: Class;
  playerLevel: number;
};

export type GameOverPropsType = {
  userClass: Class;
  level: number;
  defeater: Enemy;
  combats:number
};
