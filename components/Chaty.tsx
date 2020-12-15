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

const WAIT = 40;

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
    const wait = WAIT * chars;

    if (line + 1 < messages.length) {
      if (messages[line + 1].direction === "incoming") {
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
      <Card height="500px">
        <Flex justifyContent="center" alignContent="center">
          <Button mt={6} onClick={() => doChat()}>
            Demo starten
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Box height="500px">
      <MainContainer>
        <ChatContainer style={{ paddingTop: "1rem", minHeight: "500px" }}>
          <MessageList>
            {showMessages(show)}
            {typing ? (
              <TypingIndicator style={{ position: "inherit" }} />
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
  if (message.type === "BUTTONS" || message.type === "MENU") {
    const options = message.message?.split("|") || [];
    return (
      <InputBox>
        {options.map((o, i) => (
          <Button
            key={i}
            onClick={() => doChat(message.line + 1)}
            ml={i && 2}
            flex={1}
          >
            <Text fontSize={1}>{o}</Text>
          </Button>
        ))}
      </InputBox>
    );
  }
  return (
    <InputBox>
      <Button width="100%" onClick={() => doChat(message.line + 1)}>
        {message.message}
      </Button>
    </InputBox>
  );
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

type TMessage = {
  direction?: string;
  message?: string;
  sender?: string;
  position?: string;
  sentTime?: string;
  type?: string;
  line: number;
};

function showMessages(messages: TMessage[]) {
  return messages.map((msg, i) => <Message key={i} model={msg} />);
}

function parseMessages(lines: string): TMessage[] {
  lines = lines.trim();
  return lines.split(/\n+/).map((line, ix) => parseMessage(line, ix));
}

function parseMessage(line: string, ix: number): TMessage {
  line = line.trim();
  let direction = "";
  let type = "text";
  switch (line[0]) {
    case "-":
      direction = "incoming";
      break;
    case "*":
      direction = "outgoing";
      break;
    default:
      throw new Error("ERR_CHATY_PARSE_DIRECTION");
  }
  let message = line.replace(/^[-*]\s*/, "");

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
      rest = rest.replace(/^\s*\((.*?)\)\s*$/, "$1");
      const options = rest.split(/\)\s*\(/);
      return options.join("|");
    }
    case "BUTTON":
      return rest;
    default:
      console.error("Unkown special command: ", type);
      return rest;
  }
}
