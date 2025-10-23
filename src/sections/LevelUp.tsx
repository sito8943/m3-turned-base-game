import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { attributes } from "../data/attributes";
import type { LevelPropsType } from "./types";

function LevelUp(props: LevelPropsType) {
  const { onAttributeSelect } = props;

  return (
    <Box width="100%" display="flex" flexDirection="column">
      <Text>Level UP!!!</Text>
      <Text>Choose an attribute</Text>
      <SelectInput items={attributes} onSelect={onAttributeSelect} />
    </Box>
  );
}

export default LevelUp;
