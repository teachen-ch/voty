import {
  ChatContainer,
  MessageList,
  InputBox,
  TypingIndicator,
  ChatHeader,
  MessageOrInfo,
  Direction,
  TMessage,
} from "components/ChatElements";
import { Box, Button, Text, Link } from "rebass";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCardTitle } from "./Cards";
import { useTeam } from "state/user";
import { useRouter } from "next/router";
import { WorkCard } from "./Works";

const WAIT = 50;
const MAX_WAIT = 5000;

export const Chaty: React.FC<{
  lines: string;
  title?: string;
  speed?: number;
  slim?: boolean;
}> = ({ lines, title, speed = 1, slim = false }) => {
  const messages = useMemo<TMessage[]>(() => parseMessages(lines), [lines]);
  const [show, setShow] = useState<TMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [inputMessage, setInputMessage] = useState<TMessage>();
  const [cancel, setCancel] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => clearTimeout(cancel);
  }, []);

  useEffect(() => {
    if (document?.location?.hash === "#autostart") doChat();
  }, []);

  // scroll to bottom on every new message
  useEffect(() => {
    if (started && !showAll) messagesEndRef.current?.scrollBy(0, 1000);
  }, [show]);

  function doChat(line = 0, input?: string) {
    if (line < 0 || line >= messages.length) {
      return;
    }
    setInputMessage(undefined);
    setStarted(true);
    const msg = messages[line];
    const chars = msg.message?.length || 10;
    const wait = Math.min((1 / speed) * WAIT * chars, (1 / speed) * MAX_WAIT);

    setShow(messages.slice(0, line + 1));
    if (showAll) return;

    if (messages[line].direction === Direction.Outgoing && !input) {
      setInputMessage(messages[line]);
      return;
    }

    if (line + 1 < messages.length) {
      if (messages[line + 1].direction !== Direction.Outgoing) {
        setTyping(true);
        setCancel(setTimeout(() => doChat(line + 1), wait));
      } else {
        setTyping(false);
        setCancel(
          setTimeout(
            () => setInputMessage(messages[line + 1]),
            (1 / speed) * 1000
          )
        );
      }
    } else {
      setTyping(false);
      setFinished(true);
    }
  }

  if (!started) {
    return (
      <WorkCard
        sx={{
          background: slim
            ? ""
            : "url('/content/chaty.svg') center top no-repeat",
          backgroundSize: ["100%", "100%", "100%"],
          borderRadius: 5,
        }}
        bg="#fff"
        color="#000"
        height={["auto", "auto", slim ? 160 : 480]}
      >
        <Box textAlign="center" pt={[130, 130, slim ? 0 : 330]}>
          <Button mt={4} onClick={() => doChat()} width="250px">
            Chat starten
          </Button>
          <Text mt={3} fontSize={1}>
            <Link
              onClick={() => {
                setShowAll(true);
                doChat(messages.length - 1);
              }}
              variant="underline"
            >
              Den ganzen Chat anzeigen
            </Link>
          </Text>
        </Box>
      </WorkCard>
    );
  }

  function resetChat() {
    clearTimeout(cancel);
    setStarted(false);
    setFinished(false);
    setTyping(false);
    setInputMessage(undefined);
    setShow([]);
  }

  return (
    <ChatContainer>
      <ChatHeader title={title} onClick={resetChat} />
      <MessageList ref={messagesEndRef}>
        {show.map((msg, i) => (
          <MessageOrInfo key={i} model={msg} is="Message" />
        ))}
        {typing ? <TypingIndicator /> : null}
        {finished ? (
          <Button mt={3} width="100%" onClick={() => resetChat()}>
            Fertig
          </Button>
        ) : (
          <div style={{ height: 50, marginTop: 100 }} />
        )}
      </MessageList>
      <ShowInput message={inputMessage} doChat={doChat} />
    </ChatContainer>
  );
};

const ShowInput: React.FC<{
  message?: TMessage;
  doChat: (line: number, input?: string) => void;
}> = ({ message, doChat }) => {
  const team = useTeam();
  const router = useRouter();

  if (!message) return null;

  function selectOption(message: TMessage, o: string) {
    message.selected = o;
    doChat(message.line, o);
  }

  function nextChaty(id: string) {
    const url = team
      ? `/team/${team.id}/cards/${id}#autostart`
      : `/cards/${id}#autostart`;
    void router.push(url);
  }

  if (message.type === "BUTTONS" || message.type === "MENU") {
    const options = message.message?.split("|") || [];
    return (
      <InputBox>
        {options.map((o, i) => (
          <Button
            key={i}
            onClick={() => selectOption(message, o)}
            ml={i && 2}
            flex={1}
          >
            <Text fontSize={1}>{o}</Text>
          </Button>
        ))}
      </InputBox>
    );
  }
  if (message.type === "CHATY") {
    return (
      <InputBox>
        <Text
          pl={2}
          flex={1}
          color="#000"
          fontWeight="semi"
          minWidth="300px"
          my={[2, 2, 0]}
          sx={{ borderRadius: [0, 0, "0px 0px 5px 5px"] }}
        >
          Weiter zu «{getCardTitle(String(message?.message))}»?
        </Text>
        <Button
          ml={2}
          mr={3}
          width="150px"
          onClick={() => selectOption(message, "Nein")}
        >
          Nein
        </Button>
        <Button
          width="150px"
          onClick={() => nextChaty(String(message?.message))}
        >
          Ja
        </Button>
      </InputBox>
    );
  }
  return (
    <InputBox>
      <Button
        width="100%"
        onClick={() => selectOption(message, String(message.message))}
      >
        {message.message}
      </Button>
    </InputBox>
  );
};

export function parseMessages(lines: string): TMessage[] {
  lines = lines.trim();
  return lines.split(/\n+(?=[!\-*])/).map((line, ix) => parseMessage(line, ix));
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
  let message = lines.replace(/^[-*!]?\s*/gm, "");
  let children = undefined;

  // check for special commands: GIPHY / IMAGE / BUTTON, etc.
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  const match = message.match(/^([A-Z]{3,}):?\s+/);
  if (match && match[1]) {
    type = match[1];
    const rest = message.substr(match[0].length);
    const result = specialMessage(type, rest);
    if (typeof result === "string") {
      message = result;
    } else {
      children = result;
    }
  }

  // does the message contain just 1-2 emojis?
  if (/^\p{Emoji}{1,2}$/mu.test(message)) {
    type = "emoji";
    children = <span style={{ fontSize: 40 }}>{message}</span>;
  }
  return { direction, message, type, line: ix, children };
}

function specialMessage(type: string, rest: string): React.ReactNode {
  switch (type) {
    case "GIF":
    case "GIPHY": {
      let media = rest;
      // from https://giphy.com/gifs/fifa-h7LENyTiMBCp0pCaGz to
      // https://media0.giphy.com/media/h7LENyTiMBCp0pCaGz/giphy.mp4
      let id = rest.replace(/.*\/gifs\/([^/]*)$/, "$1");
      if (id.indexOf("-")) id = id.replace(/.*?-/, "");
      if (id) media = `https://media0.giphy.com/media/${id}/giphy.mp4`;
      return <video src={media} autoPlay loop width="200" />;
    }
    case "IMAGE":
    case "IMG":
    case "BILD":
      return <img src={rest} width="200" />;
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
    case "CHATY":
      return rest;
    default:
      console.error("Unkown special command: ", type);
      return rest;
  }
}
