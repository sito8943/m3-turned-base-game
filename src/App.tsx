import type { Item } from "../node_modules/ink-select-input/build/SelectInput";
import { Class } from "./lib/types";

import { useState } from "react";
import Home from "./views/Home";
import Fight from "./views/Fight";

export const App = () => {
  const [userClass, setUserClass] = useState<Class>();

  const onClassSelect = (selectedClass: Item<Class>) => {
    setUserClass(selectedClass.value);
  };

  return (
    <>
      {!userClass ? (
        <Home onSelect={onClassSelect} />
      ) : (
        <Fight userClass={userClass} />
      )}
    </>
  );
};
