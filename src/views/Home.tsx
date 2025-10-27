import Gradient from "ink-gradient";
import { Box, Text } from "ink";
import BigText from "ink-big-text";
import SelectInput from "ink-select-input";
import { classes } from "../data";
import type { HomePropsType } from "./types";

function Home(props: HomePropsType) {
  const { onSelect } = props;

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Gradient name="summer">
        <BigText text="M3 Game" align="center" />
      </Gradient>
      <Box
        width="100%"
        borderStyle="round"
        paddingX={1}
        paddingY={1}
      >
        <Text>Choose your class</Text>
        <SelectInput items={classes} onSelect={onSelect} />
      </Box>
    </Box>
  );
}

export default Home;
