import { Box, Text } from "ink";
import BigText from "ink-big-text";
import type { FightPropsType } from "./types";
import type { Enemy, Stats } from "../lib/types";
import { Class } from "../lib/enums";
import { useCallback, useMemo, useState } from "react";
import { BaseStats } from "../data";
import { LEVEL_UP_EXP, applyAttributeIncrease, computeExpGain } from "../core";
import type { Item } from "../../node_modules/ink-select-input/build/SelectInput";
import { GameOver, Combat, LevelUp } from "../sections";

function Fight(props: FightPropsType) {
  const { userClass } = props;

  const [combats, setCombats] = useState(0);
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [defeater, setDefeater] = useState<Enemy>();
  const [stats, setStats] = useState<Stats>(BaseStats[userClass]);

  const onAttributeSelect = useCallback(
    (attribute: Item<keyof Stats>) => {
      const newStats = applyAttributeIncrease(stats, attribute.value);
      setStats(newStats);
      setExp((prev) => prev - LEVEL_UP_EXP);
      setLevel(level + 1);
    },
    [level, stats]
  );

  const onCombatWon = useCallback(
    (expGained: number) => {
      setCombats((prev) => prev + 1);
      setExp((prev) => prev + computeExpGain(expGained, level));
    },
    [level]
  );

  const onCombatLost = useCallback((enemy: Enemy) => {
    setDefeater(enemy);
  }, []);

  const render = useMemo(() => {
    if (exp >= LEVEL_UP_EXP) {
      return <LevelUp onAttributeSelect={onAttributeSelect} />;
    } else {
      return (
        <Combat
          onCombatWon={onCombatWon}
          onCombatLost={onCombatLost}
          playerStats={stats}
          userClass={userClass}
          playerLevel={level}
        />
      );
    }
  }, [
    exp,
    onAttributeSelect,
    onCombatWon,
    onCombatLost,
    stats,
    userClass,
    level,
  ]);

  return (
    <Box width="100%" display="flex" flexDirection="column">
      {!defeater && (
        <>
          <BigText text="Fight!!!" align="center" colors={["red"]} />
          <Box
            width="100%"
            borderStyle="round"
            paddingX={1}
            paddingY={1}
            display="flex"
            flexDirection="column"
          >
            <Box width="100%" display="flex" justifyContent="space-between">
              <Text>
                Level: {level}. Exp: {exp} / {LEVEL_UP_EXP}{" "}
                {String(Class[userClass])}
              </Text>
              <Text>Combats: {combats}</Text>
            </Box>
            <Box width="100%">{render}</Box>
          </Box>
        </>
      )}
      {defeater && (
        <GameOver
          userClass={userClass}
          level={level}
          combats={combats}
          defeater={defeater}
        />
      )}
    </Box>
  );
}

export default Fight;
