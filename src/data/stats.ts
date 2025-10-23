import { Class, type Stats } from "../lib/types";

export const warriorStats: Stats = {
  strength: 2,
  intelligence: 0,
  agility: 1,
  life: 26,
  mana: 0,
};

export const mageStats: Stats = {
  strength: 0,
  intelligence: 3,
  agility: 0,
  life: 10,
  mana: 24,
};

export const hunterStats: Stats = {
  strength: 1,
  intelligence: 1,
  agility: 2,
  life: 18,
  mana: 8,
};

export const BaseStats: Record<Class, Stats> = {
  [Class.Warrior]: warriorStats,
  [Class.Mage]: mageStats,
  [Class.Hunter]: hunterStats,
};
