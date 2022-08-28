import { findIndex, shuffle } from "lodash";
import { useContext } from "react";
import { Button, Text } from "rebass";
import { Grid } from "theme-ui";
import { ChatyContext, TMessage } from "util/chaty";

export interface Quizz {
  token?: string;
  answers: Record<string, number>;
  correct: undefined | boolean;
}

export const ChatyQuestion: React.FC<{
  options: string[];
}> = ({ options }) => {
  const { inputMessage, selectOption } = useContext(ChatyContext);
  const shuffled = shuffle(options);

  function answer(answer: string) {
    const answerIndex = findIndex(options, (o) => o === answer);
    recordQuizzAnswer(answer, answerIndex);
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

function recordQuizzAnswer(question: string, ix: number) {
  const quizz = loadQuizz();
  quizz.answers[question] = ix;
  quizz.correct = ix === 0;
  saveQuizz(quizz);
}

function wasCorrect() {
  loadQuizz().correct;
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
