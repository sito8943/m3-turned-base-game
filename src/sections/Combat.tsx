import type { CombatPropsType } from "./types";
import { getRandomEnemy } from "../data/";
import { useCallback, useEffect, useState } from "react";
import { Box, Text } from "ink";
import { UserAction } from "../lib/enums";
import type { Enemy } from "../lib/types";
import SelectInput from "ink-select-input";
import type { Item } from "../../node_modules/ink-select-input/build/SelectInput";
import { attemptRun, resolveCombatRound } from "../core";

const playerActions: Item<UserAction>[] = [
  {
    label: "Attack!",
    value: UserAction.Attack,
  },
  {
    label: "Run",
    value: UserAction.Run,
  },
];

function Combat(props: CombatPropsType) {
  const { onCombatWon, onCombatLost, playerStats, userClass, playerLevel } =
    props;

  const [enemy, setEnemy] = useState<Enemy>();
  const [enemyPlaying, setEnemyPlaying] = useState(false);
  const [damage, setDamage] = useState<number>();
  const [playerLife, setPlayerLife] = useState(playerStats.life);
  const [defeated, setDefeated] = useState(false);
  const [runStatus, setRunStatus] = useState<"idle" | "success" | "impossible">(
    "idle"
  );

  useEffect(() => {
    if (!enemy) {
      setEnemy(getRandomEnemy(playerLevel));
    }
  }, [enemy, playerLevel]);

  useEffect(() => {
    if (playerLife <= 0 && enemy) {
      onCombatLost(enemy);
    }
  }, [enemy, onCombatLost, playerLife]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onActionSelect = useCallback(
    async (action: Item<UserAction>) => {
      if (!enemy) return;
      if (action.value === UserAction.Run) {
        const res = attemptRun({
          playerAgility: playerStats.agility,
          enemySpeed: enemy.speed,
          enemyAttack: enemy.attack,
        });
        if (res.outcome === "impossible") {
          setRunStatus("impossible");
          await delay(1500);
          setRunStatus("idle");
          if (res.retaliationDamage > 0) {
            setEnemyPlaying(true);
            setPlayerLife((prev) => prev - res.retaliationDamage);
            await delay(2000);
            setEnemyPlaying(false);
          }
        } else {
          setRunStatus("success");
          await delay(1500);
          setRunStatus("idle");
          setDamage(undefined);
          setEnemy(undefined);
        }
        return;
      }

      const outcome = resolveCombatRound({
        playerStats,
        userClass,
        enemy,
        playerLife,
      });

      const enemyAttack = async () => {
        setEnemyPlaying(true);
        setPlayerLife((prev) => prev - outcome.enemyDamage);
        await delay(2000);
        setEnemyPlaying(false);
      };

      const playerAttack = async () => {
        setDamage(outcome.playerDamage);
        setEnemy((prev) =>
          prev ? { ...prev, life: prev.life - outcome.playerDamage } : prev
        );
        await delay(2000);
        setDamage(undefined);
      };

      const handleVictory = async () => {
        setDefeated(true);
        onCombatWon(enemy.givenExp);
        setEnemy(undefined);
        await delay(2000);
        setDefeated(false);
      };

      for (const step of outcome.order) {
        if (step === "enemy") {
          await enemyAttack();
          if (outcome.playerLifeAfter <= 0) return;
        } else {
          await playerAttack();
          if (outcome.victory) {
            await handleVictory();
            return;
          }
        }
      }
    },
    [enemy, onCombatWon, playerLife, playerStats, userClass]
  );

  const render = useCallback(() => {
    return (
      <Box width="100%" display="flex" flexDirection="column">
        <Text>
          Your life: {playerLife} | Enemy: {enemy?.name} (life {enemy?.life})
        </Text>

        {runStatus === "success" && (
          <Box
            width="100%"
            borderStyle="round"
            paddingX={1}
            paddingY={0}
            marginTop={1}
          >
            <Text bold color="yellow">
              You successfully escaped!
            </Text>
          </Box>
        )}

        {runStatus === "impossible" && (
          <Box
            width="100%"
            borderStyle="round"
            paddingX={1}
            paddingY={0}
            marginTop={1}
          >
            <Text bold color="red">
              Running is impossible against this foe!
            </Text>
          </Box>
        )}

        {!enemyPlaying && !damage && runStatus === "idle" && (
          <Box
            width="100%"
            borderStyle="round"
            paddingX={1}
            paddingY={0}
            marginTop={1}
          >
            <Text bold>What are you going to do?</Text>
            <SelectInput items={playerActions} onSelect={onActionSelect} />
          </Box>
        )}

        {!!damage && (
          <Box
            width="100%"
            borderStyle="round"
            paddingX={1}
            paddingY={0}
            marginTop={1}
          >
            <Text bold color="green">
              You hit enemy {enemy?.name}, dealing {damage} damage
            </Text>
          </Box>
        )}

        {enemyPlaying && (
          <Box
            width="100%"
            borderStyle="round"
            paddingX={1}
            paddingY={0}
            marginTop={1}
          >
            <Text bold color="red">
              Enemy {enemy?.name} hits you, dealing {enemy?.attack} damage
            </Text>
          </Box>
        )}
      </Box>
    );
  }, [
    damage,
    enemy?.attack,
    enemy?.life,
    enemy?.name,
    enemyPlaying,
    onActionSelect,
    playerLife,
    runStatus,
  ]);

  return (
    <Box width="100%" display="flex" flexDirection="column">
      {!defeated && render()}
      {defeated && (
        <Box
          width="100%"
          borderStyle="double"
          paddingX={1}
          paddingY={0}
          marginTop={1}
        >
          <Text bold color="green">
            Enemy defeated! You won this combat. Remaining life {playerLife}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default Combat;
