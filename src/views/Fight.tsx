import { Box, Text } from "ink";
import BigText from "ink-big-text";
import type { FightPropsType } from "./types";
import { Class, type Enemy, type Stats } from "../lib/types";
import { useCallback, useMemo, useState } from "react";
import { BaseStats } from "../data";
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
      const newStats = { ...stats };
      newStats[attribute.value]++;
      if (attribute.value === "strength") {
        newStats.life += 8;
      } else if (attribute.value === "intelligence") {
        newStats.mana += 8;
      }
      setStats(newStats);
      setExp((prev) => prev - 100);
      setLevel(level + 1);
    },
    [level, stats]
  );

  const onCombatWon = useCallback(
    (expGained: number) => {
      setCombats((prev) => prev + 1);
      setExp((prev) => prev + Math.floor(expGained / level));
    },
    [level]
  );

  const onCombatLost = useCallback((enemy: Enemy) => {
    setDefeater(enemy);
  }, []);

  const render = useMemo(() => {
    if (exp >= 100) {
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
                Level: {level}. Exp: {exp} / 100 {String(Class[userClass])}
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
