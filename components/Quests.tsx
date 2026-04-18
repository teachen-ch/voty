import {
  Label,
  Radio,
  Select,
  Textarea,
} from "components/ui";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Button, Text, Flex, Box } from "components/ui";
import { useTeam, useUser } from "state/user";
import { CardContext } from "./Cards";
import React from "react";
import { Authors, usePostWork, WorkCard, Works, WorkItem } from "./Works";
import { UserWhereUniqueInput } from "graphql/types";
import cloneDeep from "lodash/cloneDeep";
import shuffle from "lodash/shuffle";
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

export const Quest: React.FC<React.PropsWithChildren<{ groups?: string }>> = ({ children, groups }) => {
  const user = useUser();
  const team = useTeam();
  const { card, title } = useContext(CardContext);
  const [users, setUsers] = useState<Array<UserWhereUniqueInput>>();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [trigger, setTrigger] = useState(0);

  const [doPostWork, state] = usePostWork({
    card,
    title,
    data: answers,
    users,
    setTrigger,
  });

  const setAnswer = useCallback(
    (id: string, value: any) => {
      // eslint-disable-next-line
      answers[id] = value;
      setAnswers(cloneDeep(answers));
    },
    [answers]
  );

  const context = useMemo<IQuestContext>(() => {
    return { answers, setAnswer, children } as IQuestContext;
  }, [answers, children, setAnswer]);

  const success = state.called && !state.error;
  let questionIx = 0;
  return (
    <QuestContext.Provider value={context}>
      {React.Children.map(children, (child) =>
        React.isValidElement<{ ix?: number }>(child)
          ? React.cloneElement(child, {
              ix: ++questionIx,
            })
          : child
      )}
      {team &&
        allowGroups(team, card, groups as AllowGroups) === AllowGroups.Yes && (
          <>
            <Label className="mt-8 mb-2">
              Erarbeitet durch:{" "}
            </Label>
            <Authors setUsers={setUsers} />
          </>
        )}

      {success ? (
        <Info className="mb-32">Antworten abgeschickt!</Info>
      ) : (
        <Button
          className="mt-4 mb-32"
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
        <Box className="-mt-4">{children}</Box>
      </WorkCard>
    </QuestContext.Provider>
  );
};

export const Question: React.FC<React.PropsWithChildren<{ className?: string; ix?: string }>> = ({
  ix,
  children,
  className,
}) => {
  const otherChildren = React.Children.toArray(children);
  const first = otherChildren.shift();
  const [hint, setHint] = useState(false);
  return (
    <Box className={`mt-8 ${className || ""}`}>
      <Flex className="mb-2">
        {ix && <CircleBullet value={ix} className="mr-4" />}
        <Box
          className="flex-1"
          onMouseOver={() => setHint(true)}
          onMouseOut={() => setHint(false)}
        >
          <Box className="mt-1 mb-4">
            {first}
          </Box>

          <FeedbackText
            style={{
              position: "absolute",
              visibility: hint ? "inherit" : "hidden",
              right: "32px",
              marginTop: -24,
              textAlign: "right",
            }}
            text="Frage unklar?"
            quest={`Frage ${ix}`}
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

export const Textfield: React.FC<React.PropsWithChildren<AnswerProps & {
  lines?: number;
  placeholder?: string;
  width?: string | number | Array<string | number>;
  className?: string;
}>> = ({ id, lines = 2, ...props }) => {
  const { answers, setAnswer, readOnly } = useContext(QuestContext);

  if (!id) return <Err msg="<Question/> ohne id" />;
  if (answers === undefined)
    return <Err msg="<Question/> used outside of <Quest>...</Quest>" />;

  const text = String(answers[id] || "");

  return (
    <Textarea
      value={text}
      onChange={(e: any) => setAnswer(id, e.target.value)}
      rows={lines}
      readOnly={readOnly}
      {...props}
    />
  );
};

export const MultiChoice: React.FC<React.PropsWithChildren<{ row?: boolean } & AnswerProps>> = ({
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
      className={`mb-8 justify-start flex-wrap sm:flex-nowrap ${row ? "flex-row" : "flex-col"}`}
    >
      {React.Children.map(children, (child, ix) =>
        React.isValidElement<{
          setAnswer?: () => void;
          answer?: number;
          answered?: number;
          ix?: number;
        }>(child)
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

export const Choice: React.FC<React.PropsWithChildren<{
  correct?: boolean;
  ix?: number;
  answer?: number;
  answered?: number;
  setAnswer?: () => void;
}>> = ({ correct, ix, answer, answered, setAnswer = () => 0, children }) => {
  const colorClass =
    answered === ix ? (correct ? "text-green" : "text-danger") : "";
  return (
    <Label className="items-center mr-2 mb-2 cursor-pointer" onClick={setAnswer}>
      <Radio checked={answer === ix} className={`${colorClass} mr-2`} />
      <span className="flex-1 grow">
        {children}
      </span>
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

export const Order: React.FC<React.PropsWithChildren<AnswerProps & { items: string[] }>> = ({
  items,
  id,
}) => {
  const { answers, setAnswer, readOnly } = useContext(QuestContext);
  const [current, setCurrent] = useState<readonly OrderItemType[]>([]);
  const [correct, setCorrect] = useState(false);
  const checkCorrect = useCallback(
    (answer: readonly OrderItemType[]) => {
      if (answer.map((item) => item.text).join(",") === items.join(",")) {
        setCorrect(true);
      }
    },
    [items]
  );

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
  }, [items, answers, id, checkCorrect]);

  if (!id) return <Err msg="<Order/> ohne id" />;
  if (answers === undefined)
    return <Err msg="<Order/> used outside of <Quest>...</Quest>" />;

  function doAnswer(answer: readonly OrderItemType[]) {
    setAnswer(id, answer);
    setCurrent(answer);
    checkCorrect(answer);
  }

  return (
    <Table className="mb-8">
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
          <TDIcon {...dragHandleProps} className="cursor-grab">
            <Image src={IconMove} alt="" />
          </TDIcon>
        )}
        {correct && (
          <TDIcon>
            <Image src={IconCheck} alt="" />
          </TDIcon>
        )}
        <TD flexy>{item.text}</TD>
      </TR>
    );
  }
}

export const Choose: React.FC<React.PropsWithChildren<AnswerProps & { className?: string; disabled?: boolean }>> = ({
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
