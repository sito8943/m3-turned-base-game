import { Class } from "../lib/types";
import type { Item } from "../../node_modules/ink-select-input/build/SelectInput";

export type HomePropsType = {
  onSelect: (selectedClass: Item<Class>) => void;
};

export type FightPropsType = {
  userClass: Class;
};
