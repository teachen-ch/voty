import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Box, Button, Text, Flex, Card } from "rebass";
import { useEffect, useMemo, useState } from "react";
import { Markdown } from "util/markdown";

const WAIT = 40;
const MAX_WAIT = 3000;

export const Chaty: React.FC<{ lines: string }> = ({ lines }) => {
  const messages = useMemo<TMessage[]>(() => parseMessages(lines), [lines]);
  const [show, setShow] = useState<TMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [inputMessage, setInputMessage] = useState<TMessage>();

  let cancel = 0;

  useEffect(() => {
    return () => clearTimeout(cancel);
  }, []);

  function doChat(line = 0) {
    if (line < 0 || line >= messages.length) {
      return;
    }
    setInputMessage(undefined);
    setStarted(true);
    setShow(messages.slice(0, line + 1));
    const msg = messages[line];
    const chars = msg.message?.length || 10;
    const wait = Math.min(WAIT * chars, MAX_WAIT);

    if (line + 1 < messages.length) {
      if (messages[line + 1].direction !== Direction.Outgoing) {
        setTyping(true);
        cancel = setTimeout(() => doChat(line + 1), wait);
      } else {
        setTyping(false);
        setTimeout(() => setInputMessage(messages[line + 1]), 1000);
      }
    } else {
      setTyping(false);
    }
  }

  if (!started) {
    return (
      <Card>
        <Flex justifyContent="center" alignContent="center">
          <Button my={3} onClick={() => doChat()}>
            Chat starten
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Box textAlign="left">
      <MainContainer>
        <ChatContainer style={{ paddingTop: "1rem" }}>
          <MessageList>
            {showMessages(show)}
            {typing ? (
              <TypingIndicator
                style={{ display: "inline-block", marginBottom: "20px" }}
                is="MessageSeparator"
              />
            ) : null}
          </MessageList>
          <div is="MessageInput" style={{ marginTop: "auto" }}>
            <ShowInput message={inputMessage} doChat={doChat} />
          </div>
        </ChatContainer>
      </MainContainer>
    </Box>
  );
};

const ShowInput: React.FC<{
  message?: TMessage;
  doChat: (line: number) => void;
}> = ({ message, doChat }) => {
  if (!message) return null;

  function selectOption(o: string) {
    message!.selected = o;
    doChat(message!.line);
  }
  if (message.type === "BUTTONS" || message.type === "MENU") {
    const options = message.message?.split("|") || [];
    return (
      <InputBox>
        {options.map((o, i) => (
          <Button key={i} onClick={() => selectOption(o)} ml={i && 2} flex={1}>
            <Text fontSize={1}>{o}</Text>
          </Button>
        ))}
      </InputBox>
    );
  }
  return (
    <InputBox>
      <Button
        width="100%"
        onClick={() => selectOption(String(message.message))}
      >
        {message.message}
      </Button>
    </InputBox>
  );
};

const MessageOrInfo: React.FC<{ model: TMessage; is: string }> = ({ model }) =>
  model.direction === Direction.Info ? (
    <Info model={model} />
  ) : (
    <ParsedMessage model={model} />
  );

const Info: React.FC<{ model: TMessage }> = ({ model }) => (
  <Box my={2} mx={4} p={2} bg="lightgray" sx={{ borderRadius: 8 }}>
    <Markdown>{model.message}</Markdown>
  </Box>
);

const ParsedMessage: React.FC<{ model: TMessage }> = ({ model }) => {
  if (model.type === "MENU" || model.type === "BUTTON") {
    model.message = model.selected;
  }
  return <Message model={model} />;
};

const InputBox: React.FC = ({ children }) => (
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

enum Direction {
  "Incoming",
  "Outgoing",
  "Info",
}

type TMessage = {
  direction?: Direction;
  message?: string;
  sender?: string;
  position?: string;
  sentTime?: string;
  type?: string;
  line: number;
  selected?: string;
};

function showMessages(messages: TMessage[]) {
  return messages.map((msg, i) => (
    <MessageOrInfo key={i} model={msg} is="Message" />
  ));
}

function parseMessages(lines: string): TMessage[] {
  lines = lines.trim();
  return lines
    .split(/\n+(?=[\!\-\*])/)
    .map((line, ix) => parseMessage(line, ix));
}

function parseMessage(lines: string, ix: number): TMessage {
  lines = lines.trim();
  let direction: Direction;
  let type = "text";
  switch (lines[0]) {
    case "-":
      direction = Direction.Incoming;
      break;
    case "*":
      direction = Direction.Outgoing;
      break;
    case "!":
      direction = Direction.Info;
      break;
    default:
      throw new Error("ERR_CHATY_PARSE_DIRECTION");
  }
  // remove message type character and whitespace at beginning of lines
  let message = lines.replace(/^[\-\*\!]?\s+/gm, "");

  // check for special commands: GIPHY / IMAGE / BUTTON, etc.
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const match = message.match(/^([A-Z]{3,}):?\s+/);
  if (match && match[1]) {
    type = match[1];
    const rest = message.substr(match[0].length);
    message = specialMessage(type, rest);
  }

  // does the message contain just 1-2 emojis?
  if (/^\p{Emoji}{1,2}$/mu.test(message)) {
    type = "emoji";
    message = "<span style='font-size: 40px'>" + message + "</span>";
  }
  return { direction, message, type, line: ix };
}

function specialMessage(type: string, rest: string): string {
  switch (type) {
    case "GIF":
    case "GIPHY": {
      let media = rest;
      // from https://giphy.com/gifs/fifa-h7LENyTiMBCp0pCaGz to
      // https://media0.giphy.com/media/h7LENyTiMBCp0pCaGz/giphy.mp4
      let id = rest.replace(/.*\/gifs\/([^\/]*)$/, "$1");
      if (id.indexOf("-")) id = id.replace(/.*?\-/, "");
      if (id) media = `https://media0.giphy.com/media/${id}/giphy.mp4`;
      return `<video src="${media}" autoplay loop width="200"/>`;
    }
    case "IMAGE":
    case "IMG":
    case "BILD":
      return `<img src="${rest}" width="200"/>`;
    case "BUTTONS":
    case "MENU": {
      // either single line: MENU (bla) (bli) (blo)
      // or multi line: MENU\n  bla\n  bli\n  blo
      const options =
        rest.indexOf("\n") >= 0
          ? rest.split("\n")
          : rest.replace(/^\s*\((.*?)\)\s*$/, "$1").split(/\)\s*\(/);
      return options.join("|");
    }
    case "BUTTON":
      return rest;
    default:
      console.error("Unkown special command: ", type);
      return rest;
  }
}
