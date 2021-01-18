import { Label, Radio, Textarea, TextareaProps } from "@rebass/forms";
import { useContext, useMemo, useState } from "react";
import { BoxProps, Button, Text, Flex, Box } from "rebass";
import { CardContext } from "./Cards";
import React from "react";
import { Authors, usePostWork, WorkCard, Works, WorkItem } from "./Works";
import { UserWhereUniqueInput } from "graphql/types";
import { cloneDeep } from "lodash";
import { Info } from "./Info";
import { Err } from "./Page";
import { CircleBullet } from "./Learning";

export { Text };

interface IQuestContext {
  answers: Record<string, any>;
  setAnswer: (id: string, answer: any) => void;
  children: React.ReactNode;
  readOnly?: boolean;
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
  let questionIx = 0;
  return (
    <QuestContext.Provider value={context}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ix: ++questionIx,
            })
          : child
      )}
      {allowGroups && (
        <>
          <Label mt={4} mb={2}>
            Erarbeitet durch:{" "}
          </Label>
          <Authors setUsers={setUsers} />
        </>
      )}

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
        readOnly: true,
      }}
    >
      <WorkCard>
        <Box my={-4}>{children}</Box>
      </WorkCard>
    </QuestContext.Provider>
  );
};

export const Question: React.FC<BoxProps & { ix?: string }> = ({
  ix,
  children,
  ...props
}) => {
  const allChildren = React.Children.toArray(children);
  const first = allChildren.shift();
  return (
    <Box mt={4} {...props}>
      <Flex mb={2}>
        {ix && <CircleBullet value={ix} mr={3} />}
        <Box flex={1}>
          <Box mt={1} mb={3}>
            {first}
          </Box>
          {allChildren}
        </Box>
      </Flex>
    </Box>
  );
};

type AnswerProps = {
  id: string;
  answer?: any;
};

export const Textfield: React.FC<
  AnswerProps &
    TextareaProps & {
      lines?: number;
      placeholder?: string;
      width?: string | number | Array<string | number>;
    }
> = ({ id, lines = 2, ...props }) => {
  const { answers, setAnswer, readOnly } = useContext(QuestContext);

  if (!id) return <Err msg="<Question/> ohne id" />;
  if (answers === undefined)
    return <Err msg="<Question/> used outside of <Quest>...</Quest>" />;

  const text = String(answers[id] || "");

  return (
    // @ts-ignore
    <Textarea
      value={text}
      onChange={(e: any) => setAnswer(id, e.target.value)}
      mb={4}
      rows={lines}
      readOnly={readOnly}
      {...props}
    />
  );
};

export const MultiChoice: React.FC<{ row?: boolean } & AnswerProps> = ({
  id,
  children,
  row,
}) => {
  const { answers, setAnswer, readOnly } = useContext(QuestContext);
  const [answered, setAnswered] = useState<number>();

  if (!id) return <Err msg="<MultiChoice/> ohne id" />;
  if (answers === undefined)
    return <Err msg="<Question/> used outside of <Quest>...</Quest>" />;

  function doAnswer(ix: number) {
    if (answered) return false;
    setAnswer(id, ix);
    setAnswered(ix);
  }
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
              setAnswer: readOnly ? undefined : () => doAnswer(ix + 1),
              answer: Number(answers[id]),
              answered,
              ix: ix + 1,
            })
          : child
      )}
    </Flex>
  );
};

export const Choice: React.FC<{
  correct?: boolean;
  ix?: number;
  answer?: number;
  answered?: number;
  setAnswer?: () => void;
}> = ({ correct, ix, answer, answered, setAnswer = () => 0, children }) => {
  const color = answered === ix ? (correct ? "green" : "danger") : "white";
  return (
    <Label alignItems="center" mr={2} onClick={setAnswer} mb={2}>
      <Radio checked={answer === ix} sx={{ fill: color }} mr={2} />
      <Text flex={1} sx={{ flexGrow: 1 }}>
        {children}
      </Text>
    </Label>
  );
};
