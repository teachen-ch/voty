import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { Box } from "rebass";
import { useMemo, useState } from "react";

export const Chaty: React.FC<{ lines: string }> = ({ lines }) => {
  const [chat, setChat] = useState<TMessage[]>([]);
  const messages = useMemo<TMessage[]>(() => parseMessages(lines), [lines]);

  function doChat(message: string) {
    const msg = parseMessage("* " + message);
    setChat(chat.concat(msg));
  }
  return (
    <Box height="auto">
      <MainContainer>
        <ChatContainer style={{ paddingTop: "1rem" }}>
          <MessageList>
            {showMessages(messages)}
            {showMessages(chat)}
          </MessageList>
          <MessageInput placeholder="Deine Nachricht..." onSend={doChat} />
        </ChatContainer>
      </MainContainer>
    </Box>
  );
};

type TMessage = {
  direction?: string;
  message?: string;
  sender?: string;
  position?: string;
  sentTime?: string;
  type?: string;
};

function showMessages(messages: TMessage[]) {
  return messages.map((msg, i) => <Message key={i} model={msg} />);
}

function parseMessages(lines: string): TMessage[] {
  lines = lines.trim();
  return lines.split(/\n+/).map((line) => parseMessage(line));
}

function parseMessage(line: string): TMessage {
  line = line.trim();
  let direction = "";
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
    const type = match[1];
    const rest = message.substr(match[0].length);
    message = specialMessage(type, rest);
  }

  // does the message contain just 1-2 emojis?
  if (/^\p{Emoji}{1,2}$/mu.test(message)) {
    message = `<span style="font-size: 3rem">${message}</span>`;
  }
  return { direction, message };
}

function specialMessage(type: string, rest: string): string {
  switch (type) {
    case "GIF":
    case "GIPHY": {
      // from https://giphy.com/gifs/fifa-h7LENyTiMBCp0pCaGz to
      // https://media0.giphy.com/media/h7LENyTiMBCp0pCaGz/giphy.mp4
      const id = rest.replace(/.*-([^-]+)$/, "$1");
      const media = `https://media0.giphy.com/media/${id}/giphy.mp4`;
      return `<video src="${media}" autoplay loop width="200"/>`;
    }
    case "IMAGE":
    case "IMG":
    case "BILD":
      return `<img src="${rest}" width="200"/>`;
    case "MENU": {
      rest = rest.replace(/^\s*\((.*?)\)\s*$/, "$1");
      const options = rest.split(/\)\s*\(/);
      return options.map((o) => `<a href="">${o}</a><br/>`).join("");
    }
    case "BUTTON":
      return `<a href="">${rest}</a><br/>`;
    default:
      console.error("Unkown special command: ", type);
      return rest;
  }
}
