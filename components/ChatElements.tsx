import { Box, Flex, Text } from "rebass";
import { CircleBullet } from "./Cards";
import { Markdown } from "util/markdown";

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
  <Flex
    textAlign="left"
    flexDirection="column"
    width={["100%", "100%", "800px"]}
    ml={[-3, -3, -4]}
    bg="white"
    sx={{
      position: "fixed",
      bottom: 0,
      top: [0, 0, "70px"],
      zIndex: 100,
    }}
  >
    {children}
  </Flex>
);

export const ChatHeader: React.FC<{ title?: string; onClick: () => void }> = ({
  title,
  onClick,
}) => (
  <Flex
    bg="lightgray"
    textAlign="center"
    p={3}
    color="black"
    alignItems="center"
    justifyContent="space-between"
    sx={{ borderBottom: "2px solid #ccc" }}
  >
    <Text fontWeight="bold" textAlign="left">
      {title}
    </Text>
    {onClick && (
      <CircleBullet onClick={onClick} value="x" bg="secondary" color="white" />
    )}
  </Flex>
);

export const MessageList: React.FC = ({ children }) => (
  <Flex p={3} flexDirection="column" overflow="scroll" flex="1">
    {children}
  </Flex>
);

export const Message: React.FC<{ direction?: Direction }> = ({
  direction,
  children,
}) => {
  const out = direction === Direction.Outgoing;
  const bg = out ? "#206DBB" : "#E9E9EB";
  const color = out ? "white" : "black";
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
    width="100%"
    bg="#eee"
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
    <Info model={model} />
  ) : (
    <ParsedMessage model={model} />
  );

const ParsedMessage: React.FC<{ model: TMessage }> = ({ model }) => {
  if (model.selected) {
    model.message = model.selected;
  }
  return (
    <Message direction={model.direction}>
      {model.children || model.message}
    </Message>
  );
};

const Info: React.FC<{ model: TMessage }> = ({ model }) => (
  <Box
    my={2}
    mx={4}
    p={2}
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
    color="secondary"
    variant="inline"
    sx={{ animation: `glowDot 0.5s linear ${delay}s infinite alternate` }}
  >
    .
  </Text>
);
