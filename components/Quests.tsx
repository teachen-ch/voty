import { Label, Radio, Textarea } from "@rebass/forms";
import { useContext, useMemo, useState } from "react";
import { Button, Flex } from "rebass";
import { CardContext } from "./Cards";
import React from "react";
import { Authors, usePostWork, WorkCard, Works, WorkItem } from "./Works";
import { UserWhereUniqueInput } from "graphql/types";
import { cloneDeep } from "lodash";
import { Info } from "./Info";
import { Err } from "./Page";

interface IQuestContext {
  answers: Record<string, any>;
  setAnswer: (id: string, answer: any) => void;
  children: React.ReactNode;
}

export const QuestContext = React.createContext({} as IQuestContext);

export const Quest: React.FC<{ allowGroups?: boolean }> = ({
  children,
  allowGroups,
}) => {
  const { card, title } = useContext(CardContext);
  const [users, setUsers] = useState<Array<UserWhereUniqueInput>>();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const context = useMemo<IQuestContext>(() => {
    return { answers, setAnswer, children } as IQuestContext;
  }, [answers]);

  const [doPostWork, state, trigger] = usePostWork({
    card,
    title,
    data: answers,
    users,
  });

  function setAnswer(id: string, value: any) {
    // eslint-disable-next-line
    answers[id] = value;
    setAnswers(cloneDeep(answers));
  }

  const success = state.called && !state.error;

  return (
    <QuestContext.Provider value={context}>
      {children}
      {allowGroups && <Authors setUsers={setUsers} />}

      {success ? (
        <Info mb={6}>Antworten abgeschickt!</Info>
      ) : (
        <Button mt={3} mb={6} onClick={doPostWork}>
          Abschicken
        </Button>
      )}
      <Works card={card} items={QuestWork} trigger={trigger}></Works>
    </QuestContext.Provider>
  );
};

const QuestWork: WorkItem = ({ work }) => {
  const { children } = useContext(QuestContext);
  return (
    <QuestContext.Provider
      value={{
        answers: work.data as Record<string, any>,
        setAnswer: () => 0,
        children: null,
      }}
    >
      <WorkCard>{children}</WorkCard>
    </QuestContext.Provider>
  );
};

type QuestionProps = {
  id: string;
  answer?: any;
};

export const Question: React.FC<
  QuestionProps & { lines?: number; placeholder?: string }
> = ({ id, placeholder, lines = 2 }) => {
  const { answers, setAnswer } = useContext(QuestContext);
  const text = String(answers[id] || "");

  if (!id) return <Err msg="<Question/> ohne id" />;

  return (
    <Textarea
      value={text}
      onChange={(e) => setAnswer(id, e.target.value)}
      mb={4}
      rows={lines}
      placeholder={placeholder}
    />
  );
};

export const MultiChoice: React.FC<{ row?: boolean } & QuestionProps> = ({
  id,
  children,
  row,
}) => {
  const { answers, setAnswer } = useContext(QuestContext);
  if (!id) return <Err msg="<MultiChoice/> ohne id" />;
  return (
    <Flex
      mb={4}
      flexDirection={row ? "row" : "column"}
      justifyContent="flex-start"
      flexWrap={["wrap", "wrap", "inherit"]}
    >
      {React.Children.map(children, (child, ix) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              setAnswer: () => setAnswer(id, ix + 1),
              answer: Number(answers[id]),
              ix: ix + 1,
            })
          : child
      )}
    </Flex>
  );
};

export const Answer: React.FC<{
  correct?: boolean;
  ix?: number;
  answer?: number;
  setAnswer?: () => void;
}> = ({ correct, ix, answer, setAnswer, children }) => {
  return (
    <Label alignItems="center" mr={2} sx={{ flexGrow: 0 }}>
      <Radio
        checked={answer === ix}
        onChange={() => setAnswer && setAnswer()}
        sx={{ fill: "white" }}
      />
      {children}
    </Label>
  );
};
