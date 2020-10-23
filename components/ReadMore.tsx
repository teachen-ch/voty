import { useState } from "react";
import { Box, Flex, Button } from "rebass";

import Plus from "../public/images/icon_plus.svg";
import Minus from "../public/images/icon_minus.svg";

export const ReadMore: React.FC<{ title: string }> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box className="readmore">
      <Button
        onClick={() => setOpen(!open)}
        bg="#888"
        color="white"
        textAlign="left"
        width="100%"
      >
        <Flex alignItems="center">
          {open ? (
            <Minus height="25px" style={{ marginRight: 10 }} alt="Schliessen" />
          ) : (
            <Plus height="25px" style={{ marginRight: 10 }} alt="Öffnen" />
          )}
          {title}
        </Flex>
      </Button>
      {open && children}
    </Box>
  );
};
