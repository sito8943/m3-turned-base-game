import { Class, type Stats } from "../lib/types";

export const warriorStats: Stats = {
  strength: 3,
  intelligence: 0,
  agility: 1,
  life: 28,
  mana: 0,
};

export const mageStats: Stats = {
  strength: 0,
  intelligence: 3,
  agility: 1,
  life: 14,
  mana: 24,
};

export const hunterStats: Stats = {
  strength: 3,
  intelligence: 1,
  agility: 3,
  life: 20,
  mana: 8,
};

export const BaseStats: Record<Class, Stats> = {
  [Class.Warrior]: warriorStats,
  [Class.Mage]: mageStats,
  [Class.Hunter]: hunterStats,
};
