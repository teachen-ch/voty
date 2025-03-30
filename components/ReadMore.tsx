import { useState } from "react";
import { Box, Text, Flex, Button } from "rebass";

import Image from "next/legacy/image";
import IconPlus from "../public/images/icon_plus.svg";
import IconMinus from "../public/images/icon_minus.svg";

export const ReadMore: React.FC<{
  title: string;
  bg?: string;
  hidePlus?: boolean;
  fontSize?: number | number[];
}> = ({ title, bg = "darkgray", hidePlus, fontSize = 4, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box color="white">
      <Button
        onClick={() => setOpen(!open)}
        bg={bg}
        py={"7px"}
        width="100%"
        my={0}
      >
        <Flex
          alignItems="center"
          fontSize={fontSize}
          ml={-1}
          color="white"
          justifyContent={hidePlus ? "center" : "left"}
        >
          {!hidePlus &&
            (open ? (
              <Image src={IconMinus} alt="Schliessen" />
            ) : (
              <Image src={IconPlus} alt="Öffnen" />
            ))}
          <Text
            textAlign="left"
            variant="inline"
            mx={2}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Text>
        </Flex>
      </Button>
      {open && children}
    </Box>
  );
};
