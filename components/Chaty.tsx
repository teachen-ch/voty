/*
 * This is a quick and ___very___ dirty implementation of a Quizz module into Chaty
 * Chaty itself was already very hacky, adding a stateful Quizz to it does not make it
 * any more readable. Sorry for that. We are looking for funding, so that we don't only
 * work during night shifts on this stuff. Thanks!
 */
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
import { Box, Button, Text, Link } from "components/ui";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTeam } from "state/user";
import { useRouter } from "next/router";
import { WorkCard } from "./Works";
import { ChatyAnswers, loadQuizz, Quizz } from "./ChatyQuizz";
import {
  ChatyContext,
  Direction,
  IChatyContext,
  parseMessages,
  TMessage,
} from "util/chaty";

const WAIT = 50;
const MAX_WAIT = 3000;

export const Chaty: React.FC<
  React.PropsWithChildren<{
    lines: string;
    title?: string;
    speed?: number;
    slim?: boolean;
    quickShow?: boolean;
  }>
> = ({ lines, title, speed = 1, slim = false, quickShow = true }) => {
  const [reset, setReset] = useState(0);
  const messages = useMemo(() => parseMessages(lines), [lines]);
  const [show, setShow] = useState<TMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [inputMessage, setInputMessage] = useState<TMessage>();
  const [cancel, setCancel] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [showAll, setShowAll] = useState(false);
  const [line, setLine] = useState(0);
  const storedQuizz = useMemo(() => loadQuizz(), []);
  const [quizz, setQuizz] = useState<Quizz>(storedQuizz);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const doChat = useCallback(
    (line = 0, input?: string) => {
      if (line < 0 || line >= messages.length) {
        return;
      }
      setInputMessage(undefined);
      setStarted(true);
      setLine(line);
      const msg = messages[line];
      const chars =
        msg.direction == Direction.Incoming ? msg.message?.length || 10 : 10;
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

  function selectOption(message: TMessage, o: string) {
    message.selected = o;
    doChat(message.line, o);
  }

  useEffect(() => {
    return () => {
      if (cancel) clearTimeout(cancel);
    };
  }, [cancel]);

  useEffect(() => {
    if (started && !showAll) {
      const c = setTimeout(
        () => messagesEndRef.current?.scrollBy(0, 1000),
        300
      );
      return () => clearTimeout(c);
    }
  }, [show, showAll, started]);

  useEffect(() => {
    if (document?.location?.hash === "#autostart") doChat();
  }, [doChat]);

  if (!started) {
    return (
      <WorkCard
        className="bg-white text-black"
        style={
          {
            background: slim
              ? ""
              : "url('/content/chaty.svg') center top no-repeat",
            backgroundSize: "100%",
            borderRadius: 5,
            height: slim ? "auto" : 480,
          } as React.CSSProperties
        }
      >
        <Box className="text-center" style={{ paddingTop: slim ? 0 : 330 }}>
          <Button className="mt-4 w-60" onClick={() => doChat()}>
            Chat starten
          </Button>
          {quickShow && (
            <Text className="mt-4 text-sm">
              <Link
                onClick={() => {
                  setShowAll(true);
                  doChat(messages.length - 1);
                }}
                className="underline"
              >
                Den ganzen Chat anzeigen
              </Link>
            </Text>
          )}
        </Box>
      </WorkCard>
    );
  }

  function resetChat() {
    cancel && clearTimeout(cancel);
    setStarted(false);
    setFinished(false);
    setTyping(false);
    setInputMessage(undefined);
    setShow([]);
    setReset(reset + 1);
  }

  const context: IChatyContext = {
    messages,
    line,
    doChat,
    selectOption,
    inputMessage,
    quizz,
    setQuizz,
  };

  return (
    <ChatyContext.Provider value={context}>
      <ChatContainer>
        <ChatHeader title={title} onClick={resetChat} />
        <MessageList ref={messagesEndRef}>
          {show.map((msg, i) => (
            <MessageOrInfo key={i} model={msg} is="Message" />
          ))}
          {typing ? <TypingIndicator /> : null}
          {finished ? (
            <Button className="mt-4 w-full" onClick={() => resetChat()}>
              Fertig
            </Button>
          ) : (
            <div style={{ height: 50, marginTop: 0 }} />
          )}
        </MessageList>
        <ShowInput />
      </ChatContainer>
    </ChatyContext.Provider>
  );
};

const ShowInput: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { inputMessage, selectOption } = useContext(ChatyContext);
  const team = useTeam();
  const router = useRouter();

  if (!inputMessage) return null;

  function nextChaty(id: string) {
    const url = team
      ? `/team/${team.id}/cards/${id}#autostart`
      : `/cards/${id}#autostart`;
    void router.push(url);
  }

  if (inputMessage.type === "BUTTONS" || inputMessage.type === "MENU") {
    const options = inputMessage.message?.split("|") || [];
    return <ChatyMenu options={options} />;
  }
  if (inputMessage.type === "ANSWER") {
    const options = inputMessage.message?.split("|") || [];
    return <ChatyAnswers options={options} />;
  }
  if (inputMessage.type === "CHATY") {
    return <ChatyNext nextChaty={nextChaty} />;
  }
  return (
    <InputBox>
      <Button
        className="w-full"
        onClick={() => selectOption(inputMessage, String(inputMessage.message))}
      >
        {inputMessage.message}
      </Button>
    </InputBox>
  );
};
