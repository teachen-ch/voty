import { Quizz } from "components/ChatyQuizz";
import React, { createContext, ReactNode, useState } from "react";

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

export type IChatyContext = {
  messages: TMessage[];
  line: number;
  quizz?: Quizz;
  inputMessage?: TMessage;
  // setMessages: (messages: TMessage[]) => void;
  doChat: (line: number, input?: string) => void;
  selectOption: (message: TMessage, option: string) => void;
};

export const ChatyContext = createContext<IChatyContext>({
  messages: [],
  line: 0,
  doChat: (line: number, input?: string) => {},
  selectOption: (message: TMessage, option: string) => {},
});

/* export const ChatyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<TMessage[]>([])
  const 
  const context: ChatyContext = {
    messages, setMessages
    line: 0
    setMess
  }
  return;
}; */

export function parseMessages(lines: string): TMessage[] {
  lines = lines.trim();
  return lines.split(/\n+(?=[!\-*])/).map((line, ix) => parseMessage(line, ix));
}

export function parseMessage(lines: string, ix: number): TMessage {
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
  const match = message.match(/^([A-Z]{3,}):?\s+/);
  if (match && match[1]) {
    type = match[1];
    const rest = message.substring(match[0].length);
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

export function specialMessage(type: string, rest: string): React.ReactNode {
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
      return <img src={rest} width="200" alt="Bild" />;
    case "BUTTONS":
    case "QUESTION":
    case "MENU": {
      return parseOptions(rest);
    }
    case "ANSWER":
      return rest;
    case "BUTTON":
      return rest;
    case "CHATY":
      return rest;
    default:
      console.error("Unkown special command: ", type);
      return rest;
  }
}

// Parse a list of options to a command such as MENU, which can be either on a single line:
//   MENU(bla)(bli)(blo)
// or multi line:
//   MENU\n  bla\n  bli\n  blo
// Returns a "|" pipe-separated string of options
export function parseOptions(rest: string) {
  const options =
    rest.indexOf("\n") >= 0
      ? rest.split("\n")
      : rest.replace(/^\s*\((.*?)\)\s*$/, "$1").split(/\)\s*\(/);
  return options.join("|");
}
