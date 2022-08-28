import {
  ChatContainer,
  MessageList,
  InputBox,
  TypingIndicator,
  ChatHeader,
  MessageOrInfo,
  ChatyMenu,
  ChatyNext,
} from "components/ChatElements";
import { Box, Button, Text, Link } from "rebass";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTeam } from "state/user";
import { useRouter } from "next/router";
import { WorkCard } from "./Works";
import { ChatyQuestion } from "./ChatQuizz";
import { Direction, parseMessages, TMessage } from "util/chaty";

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
  }, [cancel]);

  // scroll to bottom on every new message
  useEffect(() => {
    if (started && !showAll) messagesEndRef.current?.scrollBy(0, 1000);
  }, [show, showAll, started]);

  const doChat = useCallback(
    (line = 0, input?: string) => {
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
    },
    [messages, showAll, speed]
  );

  useEffect(() => {
    if (document?.location?.hash === "#autostart") doChat();
  }, [doChat]);

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
      <ChatyMenu
        options={options}
        message={message}
        selectOption={selectOption}
      />
    );
  }
  if (message.type === "QUESTION") {
    const options = message.message?.split("|") || [];
    return (
      <ChatyQuestion
        options={options}
        message={message}
        selectOption={selectOption}
      />
    );
  }
  if (message.type === "CHATY") {
    return (
      <ChatyNext
        message={message}
        selectOption={selectOption}
        nextChaty={nextChaty}
      />
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
