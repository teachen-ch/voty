import { findIndex, pick, random, sample, shuffle } from "lodash";
import { useContext, useMemo } from "react";
import { Button, Text } from "rebass";
import { Grid } from "theme-ui";
import { ChatyContext, TMessage } from "util/chaty";

export interface Quizz {
  token?: string;
  answers: Record<string, number>;
  lastAnswer?: number;
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
const replyWrong = ["Nicht ganz.", "Nein", "Falsch"];

export const ChatyQuestion: React.FC<{
  options: string[];
}> = ({ options }) => {
  const { inputMessage, selectOption, quizz, setQuizz } = useContext(
    ChatyContext
  );
  const shuffled = shuffle(options);

  function answer(answer: string) {
    const answerIndex = findIndex(options, (o) => o === answer);
    recordLastAnswer(answerIndex);
    selectOption(inputMessage!, answer);
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

export const ChatyQuizzCheck: React.FC<{
  message: TMessage;
}> = ({ message }) => {
  const { quizz } = useContext(ChatyContext);
  const question = message.message;
  const answer = lastAnswer();
  const correct = answer === 0;
  const reply = useMemo(
    () => (correct ? sample(replyCorrect) : sample(replyWrong)),
    [correct]
  );
  return <div>{reply}</div>;
};

function recordLastAnswer(answer: number) {
  const quizz = loadQuizz();
  quizz.lastAnswer = answer;
  saveQuizz(quizz);
}

function recordQuizzAnswer(question: string, answer: number) {
  const quizz = loadQuizz();
  quizz.answers[question] = answer;
  saveQuizz(quizz);
}

function lastAnswer() {
  return loadQuizz().lastAnswer;
}

function ratioCorrect() {
  const answers = loadQuizz().answers;
  const total = Object.keys(answers).length;
  const correct = Object.values(answers).filter((ix) => ix === 0).length;
  return Math.round((100 * correct) / total);
}

function loadQuizz() {
  const emptyQuizz = { answers: {}, correct: undefined };
  const str = localStorage.getItem("quizz");
  const quizz = str ? JSON.parse(str) : emptyQuizz;
  return quizz as Quizz;
}

function saveQuizz(quizz: Quizz) {
  localStorage.setItem("quizz", JSON.stringify(quizz));
}
