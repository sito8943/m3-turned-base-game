export type Stats = {
  strength: number; // 8 of life each and + 1 physical atk
  intelligence: number; // 8 of mana each and + 1 spell atk
  agility: number; // 1 of speed each
  life: number; // base: 10
  mana: number; // base: 0
};

export type Enemy = {
  name: string;
  attack: number;
  life: number;
  givenExp: number;
  speed: number;
  magicResistant?: number;
  physicalResistant?: number;
};
