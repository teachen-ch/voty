import { Box, Button, Flex, Text } from "components/ui";
import { Markdown } from "util/markdown";
import { GlossaryReplace } from "./Glossary";
import React, { useContext } from "react";
import Image from "next/image";
import IconBack from "../public/images/icon_back_white.svg";
import { getCardTitle } from "./Cards";
import { ChatyContext, Direction, TMessage } from "util/chaty";

export const ChatContainer: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Box style={{ height: 480 }}>
    <Flex
      className="flex-col w-full bg-white text-black sm:rounded-card sm:absolute fixed bottom-0 top-0 z-100 sm:z-0"
      style={{ height: 480 }}
    >
      {children}
    </Flex>
  </Box>
);

export const ChatHeader: React.FC<
  React.PropsWithChildren<{ title?: string; onClick: () => void }>
> = ({ title, onClick }) => (
  <Flex
    className="sm:hidden bg-[#494A4B] text-white p-4 items-center justify-between border-b-2 border-[#ccc]"
    style={{ height: 70 }}
  >
    {onClick && (
      <Box className="inline-block mr-2">
        <Image
          src={IconBack}
          onClick={onClick}
          className="pointer"
          alt="Zurück"
        />
      </Box>
    )}
    <p className="font-semibold text-left grow m-0">{title}</p>
  </Flex>
);

export const MessageList = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(function ML({ children }, ref) {
  return (
    <Flex className="p-4 flex-col overflow-scroll flex-1 relative" ref={ref}>
      {children}
    </Flex>
  );
});

export const Message: React.FC<
  React.PropsWithChildren<{ direction?: Direction }>
> = ({ direction, children }) => {
  const out = direction === Direction.Outgoing;
  return (
    <Box
      className={`max-w-[80%] py-1.5 px-3 mb-4 text-sm rounded-[14px] ${
        out
          ? "self-end bg-[#206DBB] text-white"
          : "self-start bg-[#E9E9EB] text-black"
      }`}
    >
      {children}
    </Box>
  );
};

export const InputBox: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <Flex className="flex-row flex-wrap items-center w-full bg-highlight p-2 border-t border-highlight">
    {children}
  </Flex>
);

export const MessageOrInfo: React.FC<
  React.PropsWithChildren<{ model: TMessage; is: string }>
> = ({ model }) =>
  model.direction === Direction.Info ? (
    <GlossaryReplace bg="#444" color="#fff">
      <Info model={model} />
    </GlossaryReplace>
  ) : (
    <ParsedMessage message={model} />
  );

const ParsedMessage: React.FC<
  React.PropsWithChildren<{ message: TMessage }>
> = ({ message }) => {
  if (message.selected) {
    message.message = message.selected;
  }
  const Component = typeof message.children === "function" && message.children;

  return (
    <Message direction={message.direction}>
      <GlossaryReplace bg="#444" color="#fff">
        {Component ? (
          <Component message={message} />
        ) : (
          (message.children as React.ReactNode) || message.message
        )}
      </GlossaryReplace>
    </Message>
  );
};

const Info: React.FC<React.PropsWithChildren<{ model: TMessage }>> = ({
  model,
}) => (
  <Box className="mb-4 mx-8 py-4 px-4 bg-highlight text-gray text-sm rounded-lg max-w-87.5">
    <Markdown>{model.message}</Markdown>
  </Box>
);

export const ChatyMenu: React.FC<
  React.PropsWithChildren<{
    options: string[];
  }>
> = ({ options }) => {
  const { inputMessage, selectOption } = useContext(ChatyContext);
  return (
    <InputBox>
      {options.map((o, i) => (
        <Button
          key={i}
          onClick={() => selectOption(inputMessage!, o)}
          className={`flex-1 ${i ? "ml-2" : ""}`}
        >
          <span className="text-sm">{o}</span>
        </Button>
      ))}
    </InputBox>
  );
};

export const ChatyNext: React.FC<
  React.PropsWithChildren<{
    nextChaty: (topic: string) => void;
  }>
> = ({ nextChaty }) => {
  const { inputMessage, selectOption } = useContext(ChatyContext);
  return (
    <InputBox>
      <Text className="pl-2 flex-1 text-black font-semibold min-w-75 my-2 sm:my-0 sm:rounded-b-card">
        Weiter zu «{getCardTitle(String(inputMessage?.message))}»?
      </Text>
      <Button
        className="ml-2 mr-4 w-37.5"
        onClick={() => selectOption(inputMessage!, "Nein")}
      >
        Nein
      </Button>
      <Button
        className="w-37.5"
        onClick={() => nextChaty(String(inputMessage?.message))}
      >
        Ja
      </Button>
    </InputBox>
  );
};

export const TypingIndicator: React.FC<
  React.PropsWithChildren<unknown>
> = () => (
  <Box className="-mt-6.25 ml-1 text-xl">
    <GlowDot delay={0} />
    <GlowDot delay={0.2} />
    <GlowDot delay={0.4} />
  </Box>
);

const GlowDot: React.FC<React.PropsWithChildren<{ delay: number }>> = ({
  delay,
}) => (
  <span
    className="inline-block text-primary"
    style={{ animation: `glowDot 0.5s linear ${delay}s infinite alternate` }}
  >
    .
  </span>
);
