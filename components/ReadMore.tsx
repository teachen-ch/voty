import { useState } from "react";
import { Box, Flex, Button } from "rebass";

import Plus from "../public/images/icon_plus.svg";
import Minus from "../public/images/icon_minus.svg";

export const ReadMore: React.FC<{
  title: string;
  bg?: string;
  hidePlus?: boolean;
  fontSize?: number | number[];
}> = ({ title, bg = "#73899D", hidePlus, fontSize = 4, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box color="white">
      <Button
        onClick={() => setOpen(!open)}
        bg={bg}
        color="white"
        width="100%"
        py={0}
        my={0}
      >
        <Flex
          alignItems="center"
          fontSize={fontSize}
          ml={-2}
          color="white"
          justifyContent={hidePlus ? "center" : "left"}
        >
          {!hidePlus &&
            (open ? (
              <Minus style={{ marginRight: 4 }} alt="Schliessen" />
            ) : (
              <Plus style={{ marginRight: 4 }} alt="Öffnen" />
            ))}
          {title}
        </Flex>
      </Button>
      {open && children}
    </Box>
  );
};
