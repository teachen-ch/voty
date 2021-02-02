import {
  Label,
  Radio,
  Select,
  SelectProps,
  Textarea,
  TextareaProps,
} from "@rebass/forms";
import { useContext, useEffect, useMemo, useState } from "react";
import { BoxProps, Button, Text, Flex, Box } from "rebass";
import { useTeam, useUser } from "state/user";
import { CardContext } from "./Cards";
import React from "react";
import { Authors, usePostWork, WorkCard, Works, WorkItem } from "./Works";
import { UserWhereUniqueInput } from "graphql/types";
import { cloneDeep, shuffle } from "lodash";
import { Info } from "./Info";
import { Err } from "./Page";
import { CircleBullet } from "./Learning";
import { Table, TD, TDIcon, TR } from "./Table";
import DraggableList from "react-draggable-list";
import IconMove from "../public/images/icon_move.svg";
import IconCheck from "../public/images/icon_check.svg";
import { FeedbackText } from "./Feedback";
import { AllowGroups, allowGroups } from "./Prefs";

export { Text };

interface IQuestContext {
  answers: Record<string, any>;
  setAnswer: (id: string, answer: any) => void;
  children: React.ReactNode;
  readOnly?: boolean;
}

export const QuestContext = React.createContext({} as IQuestContext);

export const Quest: React.FC<{ groups?: string }> = ({ children, groups }) => {
  const user = useUser();
  const team = useTeam();
  const { card, title } = useContext(CardContext);
  const [users, setUsers] = useState<Array<UserWhereUniqueInput>>();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [trigger, setTrigger] = useState(0);
  const context = useMemo<IQuestContext>(() => {
    return { answers, setAnswer, children } as IQuestContext;
  }, [answers]);

  const [doPostWork, state] = usePostWork({
    card,
    title,
    data: answers,
    users,
    setTrigger,
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
      {team &&
        allowGroups(team, card, groups as AllowGroups) === AllowGroups.Yes && (
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
        <Button
          mt={3}
          mb={6}
          onClick={doPostWork}
          disabled={Boolean(!user || !team)}
        >
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
        <Box mt={-4}>{children}</Box>
      </WorkCard>
    </QuestContext.Provider>
  );
};

export const Question: React.FC<BoxProps & { ix?: string }> = ({
  ix,
  children,
  ...props
}) => {
  const otherChildren = React.Children.toArray(children);
  const first = otherChildren.shift();
  const [hint, setHint] = useState(false);
  return (
    <Box mt={4} {...props}>
      <Flex mb={2}>
        {ix && <CircleBullet value={ix} mr={3} />}
        <Box
          flex={1}
          onMouseOver={() => setHint(true)}
          onMouseOut={() => setHint(false)}
        >
          <Box mt={1} mb={3}>
            {first}
          </Box>

          <FeedbackText
            sx={{
              position: "absolute",
              visibility: hint ? "inherit" : "hidden",
              right: "32px",
            }}
            text="Frage unklar?"
            quest={`Frage ${ix}`}
            mt={-24}
            textAlign="right"
          />
          {otherChildren}
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

interface OrderItemType {
  text: string;
}
interface OrderItemProps {
  item: OrderItemType;
  itemSelected: number;
  dragHandleProps: Record<string, any>;
  commonProps: { readOnly?: boolean; correct: boolean };
}

export const Order: React.FC<AnswerProps & { items: string[] }> = ({
  items,
  id,
}) => {
  const { answers, setAnswer, readOnly } = useContext(QuestContext);
  const [current, setCurrent] = useState<readonly OrderItemType[]>([]);
  const [correct, setCorrect] = useState(false);

  // initial shuffle of the answers
  useEffect(() => {
    if (answers && answers[id]) {
      checkCorrect(answers[id]);
      setCurrent(answers[id]);
    } else {
      setCurrent(
        shuffle(items).map((text) => {
          return { text };
        })
      );
    }
  }, [items, answers]);

  if (!id) return <Err msg="<Order/> ohne id" />;
  if (answers === undefined)
    return <Err msg="<Order/> used outside of <Quest>...</Quest>" />;

  function doAnswer(answer: readonly OrderItemType[]) {
    setAnswer(id, answer);
    setCurrent(answer);
    checkCorrect(answer);
  }

  function checkCorrect(answer: readonly OrderItemType[]) {
    if (answer.map((item) => item.text).join(",") === items.join(",")) {
      setCorrect(true);
    }
  }

  return (
    <Table mb={4}>
      <DraggableList<
        OrderItemType,
        { readOnly?: boolean; correct: boolean },
        OrderItem
      >
        list={current}
        itemKey="text"
        padding={0}
        constrainDrag={true}
        onMoveEnd={doAnswer}
        template={OrderItem}
        commonProps={{ readOnly, correct }}
      />
    </Table>
  );
};

class OrderItem extends React.Component<OrderItemProps> {
  state = {
    over: false,
  };

  render() {
    const { item, dragHandleProps, commonProps } = this.props;
    const { readOnly, correct } = commonProps;
    return (
      <TR
        onMouseOver={() => this.setState({ over: true })}
        onMouseOut={() => this.setState({ over: false })}
      >
        {!(readOnly || correct) && (
          <TDIcon {...dragHandleProps} sx={{ cursor: "grab" }}>
            <IconMove />
          </TDIcon>
        )}
        {correct && (
          <TDIcon>
            <IconCheck />
          </TDIcon>
        )}
        <TD flexy>{item.text}</TD>
      </TR>
    );
  }
}

export const Choose: React.FC<AnswerProps & SelectProps> = ({
  id,
  children,
  ...props
}) => {
  const { answers, setAnswer, readOnly } = useContext(QuestContext);

  if (!id) return <Err msg="<Choose/> ohne id" />;
  if (answers === undefined)
    return <Err msg="<Choose/> used outside of <Quest>...</Quest>" />;

  const choice = String(answers[id] || "");

  return (
    // @ts-ignore
    <Select
      value={choice}
      onChange={(e: any) => setAnswer(id, e.target.value)}
      disabled={readOnly}
      {...props}
    >
      {children}
    </Select>
  );
};
