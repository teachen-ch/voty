/*
 * This is a quick and ___very___ dirty implementation of a Quizz module into Chaty
 * Chaty itself was already very hacky, adding a stateful Quizz to it does not make it
 * any more readable. Sorry for that. We are looking for funding, so that we don't only
 * work during night shifts on this stuff. Thanks!
 */
import {
  clone,
  cloneDeep,
  findIndex,
  pick,
  random,
  sample,
  shuffle,
} from "lodash";
import { useContext, useMemo, useState } from "react";
import { Button, Text } from "rebass";
import { Grid } from "theme-ui";
import { ChatyContext, parseOptions, TMessage } from "util/chaty";
import { isBrowser } from "util/isBrowser";

export interface Quizz {
  token?: string;
  questions: Record<string, IQuestion>;
  lastQuestion: string;
}

export interface IQuestion {
  question: string;
  answers: string[];
  picked: number;
  correct: boolean;
}

const replyCorrect = [
  "Genau!",
  "Das stimmt!",
  "Richtig!",
  "Das ist richtig.",
  "Ja, das stimmt.",
  "Korrekt!",
  "Super :-)",
  "Ganz genau",
];
const replyWrong = ["Nicht ganz.", "Nein... ", "Falsch: ", "Richtig wäre: "];

export const ChatyAnswers: React.FC<{
  options: string[];
}> = ({ options: answers }) => {
  const {
    line,
    messages,
    inputMessage,
    selectOption,
    quizz,
    setQuizz,
  } = useContext(ChatyContext);
  const shuffled = shuffle(answers);
  const question = messages[line].message!;
  const [answered, setAnswered] = useState<number>(-10);

  const findAnswer = (answer: string) =>
    findIndex(answers, (a) => a === answer);

  function answer(answer: string) {
    if (!quizz) return console.error("Quizz undefined. Aborting");
    const picked = findAnswer(answer);
    const correct = picked === 0;
    quizz.questions[question] = { question, picked, correct, answers };
    quizz.lastQuestion = question;
    const emoji = correct ? "✔" : "❌";
    setQuizz(cloneDeep(quizz));
    setAnswered(picked);
    selectOption(inputMessage!, `${answer!}(${emoji})`);
  }
  return (
    <Grid
      width="100%"
      bg="lightgray"
      p={2}
      sx={{ borderTop: "1px solid lightgray" }}
    >
      {shuffled.map((o, i) => (
        <Button key={i} onClick={() => answer(o)} flex={1}>
          <Text fontSize={1} textAlign="left" width="100%">
            {o}
          </Text>
        </Button>
      ))}
    </Grid>
  );
};

export const ChatyQuizzCheck: React.FC<{ message: TMessage }> = ({
  message,
}) => {
  const { quizz } = useContext(ChatyContext);
  const question = useMemo(() => quizz!.lastQuestion, [quizz]);
  const q = quizz!.questions[question];
  const replies = useMemo(() => message.message!.split("\n"), [
    message.message,
  ]);
  const reply = useMemo(() => (q.correct ? replies[1] : replies[2]), [
    q.correct,
    replies,
  ]);
  return <div>{reply}</div>;
};
export const ChatyQuizzEvaluate: React.FC<{ message: TMessage }> = ({
  message,
}) => {
  const replyTemplate = message.message!.replace("EVALUATE ", "");
  const reply = useEvaluateQuizz(replyTemplate);
  return <div>{reply}</div>;
};

export function createEmptyQuizz() {
  return { token: uuid(), questions: {} };
}

function useEvaluateQuizz(replyTemplate: string) {
  const { quizz } = useContext(ChatyContext);
  const questions = quizz!.questions;
  const result: Record<string, number> = { total: 0, correct: 0, percent: 0 };
  result.total = Object.keys(questions).length;
  result.correct = Object.values(questions).filter((q) => q.correct).length;
  result.percent = Math.round((100 * result.correct) / result.total);
  let reply = replyTemplate;
  Object.keys(result).forEach(
    (key) => (reply = reply.replace(`{${key}}`, String(result[key])))
  );
  return reply;
}

export function loadQuizz() {
  const str = isBrowser() ? localStorage.getItem("quizz") : "";
  const quizz = str ? JSON.parse(str) : createEmptyQuizz();
  return quizz as Quizz;
}

function saveQuizz(quizz: Quizz) {
  localStorage.setItem("quizz", JSON.stringify(quizz));
}

function uuid() {
  if (typeof crypto === "undefined")
    return Math.round(Math.random() * 10 ** 18);
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
