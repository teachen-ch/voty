import { useState } from "react";
import { Box, Flex, Button } from "rebass";

import Plus from "../public/images/icon_plus.svg";
import Minus from "../public/images/icon_minus.svg";

export const ReadMore: React.FC<{
  title: string;
  color?: string;
  hidePlus?: boolean;
}> = (props) => {
  const [open, setOpen] = useState(false);
  const color = props.color || "#73899D";
  return (
    <Box className="readmore">
      <Button
        onClick={() => setOpen(!open)}
        bg={color}
        color="white"
        textAlign="left"
        width="100%"
      >
        <Flex
          alignItems="center"
          justifyContent={props.hidePlus ? "center" : "left"}
        >
          {props.hidePlus ? (
            ""
          ) : open ? (
            <Minus height="25px" style={{ marginRight: 10 }} alt="Schliessen" />
          ) : (
            <Plus height="25px" style={{ marginRight: 10 }} alt="Öffnen" />
          )}
          {props.title}
        </Flex>
      </Button>
      {open && props.children}
    </Box>
  );
};
