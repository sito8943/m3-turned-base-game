import { Box, Text } from "ink";
import BigText from "ink-big-text";
import type { GameOverPropsType } from "./types";
import { Class } from "../lib/enums";

function GameOver(props: GameOverPropsType) {
  const { userClass, level, combats, defeater } = props;

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <BigText
        text="Defeated!!!"
        align="center"
        colors={["red", "#1b1b1b"]}
      />
      <Text>
        You were defeated with level {level}, class {String(Class[userClass])}{" "}
        by {defeater.name}.
      </Text>
      <Text>You survived {combats} combats.</Text>
    </Box>
  );
}

export default GameOver;
