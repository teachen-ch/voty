import { useState } from "react";
import { Box, Text, Flex, Button } from "components/ui";

import Image from "next/image";
import IconPlus from "../public/images/icon_plus.svg";
import IconMinus from "../public/images/icon_minus.svg";

export const ReadMore: React.FC<React.PropsWithChildren<{
  title: string;
  bg?: string;
  hidePlus?: boolean;
  fontSize?: number | number[];
}>> = ({ title, bg = "darkgray", hidePlus, fontSize = 4, children }) => {
  const [open, setOpen] = useState(false);
  const bgClass = bg === "darkgray" ? "bg-black/20" : "";
  const bgStyle = bg === "darkgray" || bg === "transparent" ? undefined : bg;
  return (
    <Box>
      <Button
        onClick={() => setOpen(!open)}
        style={bgStyle ? { backgroundColor: bgStyle } : undefined}
        className={`py-[4px] w-full my-0 min-h-0 text-black ${bgClass} ${
          hidePlus ? "justify-center" : "justify-start"
        }`}
      >
        <Flex
          className={`items-center ml-[-4px] ${hidePlus ? "justify-center" : "justify-start"}`}
          style={{ fontSize: Array.isArray(fontSize) ? undefined : `${[12, 16, 20, 22, 26, 34, 50][fontSize] ?? 26}px` }}
        >
          {!hidePlus &&
            (open ? (
              <Image src={IconMinus} alt="Schliessen" />
            ) : (
              <Image src={IconPlus} alt="Öffnen" />
            ))}
          <Text
            className="text-left mx-2 overflow-hidden text-ellipsis whitespace-nowrap"
            variant="inline"
          >
            {title}
          </Text>
        </Flex>
      </Button>
      {open && children}
    </Box>
  );
};
