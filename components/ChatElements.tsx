import { Box, Flex, Image, Text } from "rebass";
import { Markdown } from "util/markdown";
import { GlossaryReplace } from "./Glossary";
import React from "react";

export enum Direction {
  "Incoming",
  "Outgoing",
  "Info",
}

export type TMessage = {
  direction?: Direction;
  message?: string;
  type?: string;
  line: number;
  selected?: string;
  children?: React.ReactNode;
};

export const ChatContainer: React.FC = ({ children }) => (
  <Box height="480px">
    <Flex
      flexDirection="column"
      width={["100%", "100%", "calc(100% - 64px)"]}
      height={["auto", "auto", "480px"]}
      ml={[-3, -3, 0]}
      bg="#fff"
      color="#000"
      sx={{
        borderRadius: [0, 0, 5],
        position: ["fixed", "fixed", "absolute", "absolute"],
        bottom: [0, 0, "inherit"],
        top: [0, 0, "inherit"],
        zIndex: [100, 100, 0, 0],
      }}
    >
      {children}
    </Flex>
  </Box>
);

export const ChatHeader: React.FC<{ title?: string; onClick: () => void }> = ({
  title,
  onClick,
}) => (
  <Flex
    display={["inherit", "inherit", "none"]}
    bg="#494A4B"
    p={3}
    alignItems="center"
    justifyContent="space-between"
    sx={{ borderBottom: "2px solid #ccc" }}
    height="70px"
  >
    {onClick && (
      <Image
        src="/images/icon_back.svg"
        onClick={onClick}
        mr={2}
        sx={{ cursor: "pointer", flexGrow: 0 }}
      />
    )}
    <Text fontWeight="bold" textAlign="left" sx={{ flexGrow: 1 }}>
      {title}
    </Text>
  </Flex>
);

export const MessageList = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(function ML({ children }, ref) {
  return (
    <Flex p={3} flexDirection="column" overflow="scroll" flex="1" ref={ref}>
      {children}
    </Flex>
  );
});

export const Message: React.FC<{ direction?: Direction }> = ({
  direction,
  children,
}) => {
  const out = direction === Direction.Outgoing;
  const bg = out ? "#206DBB" : "#E9E9EB";
  const color = out ? "#fff" : "#000";
  return (
    <Box
      alignSelf={out ? "flex-end" : "flex-start"}
      maxWidth="80%"
      color={color}
      py="6px"
      px="12px"
      mb={3}
      bg={bg}
      fontSize={1}
      sx={{ borderRadius: 14 }}
    >
      {children}
    </Box>
  );
};

export const InputBox: React.FC = ({ children }) => (
  <Flex
    flexDirection="row"
    flexWrap="wrap"
    alignItems="center"
    width="100%"
    bg="lightgray"
    p={2}
    sx={{ borderTop: "1px solid lightgray" }}
  >
    {children}
  </Flex>
);

export const MessageOrInfo: React.FC<{ model: TMessage; is: string }> = ({
  model,
}) =>
  model.direction === Direction.Info ? (
    <GlossaryReplace bg="#444" color="white">
      <Info model={model} />
    </GlossaryReplace>
  ) : (
    <ParsedMessage model={model} />
  );

const ParsedMessage: React.FC<{ model: TMessage }> = ({ model }) => {
  if (model.selected) {
    model.message = model.selected;
  }
  return (
    <Message direction={model.direction}>
      <GlossaryReplace bg="#444" color="white">
        {model.children || model.message}
      </GlossaryReplace>
    </Message>
  );
};

const Info: React.FC<{ model: TMessage }> = ({ model }) => (
  <Box
    mb={3}
    mx={4}
    py={3}
    px={3}
    bg="lightgray"
    color="gray"
    fontSize={1}
    sx={{ borderRadius: 8 }}
    maxWidth="350px"
  >
    <Markdown>{model.message}</Markdown>
  </Box>
);

export const TypingIndicator: React.FC = () => (
  <Box mt={-25} ml={1} fontSize={4}>
    <GlowDot delay={0} />
    <GlowDot delay={0.2} />
    <GlowDot delay={0.4} />
  </Box>
);

const GlowDot: React.FC<{ delay: number }> = ({ delay }) => (
  <Text
    color="primary"
    variant="inline"
    sx={{ animation: `glowDot 0.5s linear ${delay}s infinite alternate` }}
  >
    .
  </Text>
);
