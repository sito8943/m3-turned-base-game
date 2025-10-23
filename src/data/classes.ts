import { Class } from "../lib/types";
import type { Item } from "../../node_modules/ink-select-input/build/SelectInput";

export const classes: Item<Class>[] = [
  {
    label: "Warrior",
    value: Class.Warrior,
  },
  {
    label: "Mage",
    value: Class.Mage,
  },
  {
    label: "Hunter",
    value: Class.Hunter,
  },
];
