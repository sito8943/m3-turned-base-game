import { type Stats } from "../lib/types";
import type { Item } from "../../node_modules/ink-select-input/build/SelectInput";

export const attributes: Item<keyof Stats>[] = [
  {
    label: "Strength",
    value: "strength",
  },
  {
    label: "Intelligence",
    value: "intelligence",
  },
  {
    label: "Agility",
    value: "agility",
  },
];
