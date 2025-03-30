import { gql } from "@apollo/client";
import * as cards from "content/";
import {
  Card as CardType,
  useCardsQuery,
  useSetCardsMutation,
} from "graphql/types";
import { Flex, Box, Image as RImage, Text, Heading, Button } from "rebass";
import { Loading } from "components/Page";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import truncate from "lodash/truncate";
import without from "lodash/without";
import DraggableList from "react-draggable-list";
import { OneRowTable, Table, TD, TDIcon, TDImage, TR } from "./Table";
import { A } from "./Breadcrumb";
import Image from "next/legacy/image";
import IconTrash from "../public/images/icon_trash.svg";
import IconWatch from "../public/images/icon_watch.svg";
import IconMove from "../public/images/icon_move.svg";
import IconCheck from "../public/images/icon_check.svg";
import IconAdd from "../public/images/icon_add.svg";
import { useTheme } from "util/hooks";

export const GET_CARDS = gql`
  query cards($keywords: String, $age: String, $type: String) {
    cards(keywords: $keywords, age: $age, type: $type) {
      id
      title
      description
      duration
      keywords
      type
      icon
      url
      source
      content
      age
      discussion
    }
  }
`;

export const SET_CARDS = gql`
  mutation setCards($teamId: String!, $cards: String!) {
    setCards(teamId: $teamId, cards: $cards) {
      id
      cards
    }
  }
`;

export type CardsQuery = {
  keywords?: string;
  age?: string;
};

export const Cards: React.FC<React.PropsWithChildren<{
  keywords?: string;
  age?: string;
  selected?: boolean;
  type?: string;
  teamId?: string;
  teamCards?: string;
  resetFilters: () => void;
}>> = (props) => {
  const cardsQuery = useCardsQuery({ variables: props });
  const cards = cardsQuery.data?.cards;

  if (cardsQuery.error) {
    return <Text>Error loading data: {cardsQuery.error.message}</Text>;
  }
  if (cardsQuery.loading) {
    return <Loading />;
  }
  if (!cards || cards.length === 0) {
    return (
      <>
        <Text>Keine Lerninhalte gefunden…</Text>
        <Button onClick={props.resetFilters}>Filter löschen</Button>
      </>
    );
  }
  return (
    <Flex flexWrap="wrap" mx="-8px">
      {cards?.map(
        (card) =>
          card && (
            <CardItem
              key={card.id}
              card={card}
              teamCards={props.teamCards}
              teamId={props.teamId}
            />
          )
      )}
    </Flex>
  );
};

export const CardItem: React.FC<React.PropsWithChildren<{
  card: CardType;
  teamCards?: string;
  teamId?: string;
}>> = ({ card, teamCards, teamId }) => {
  const router = useRouter();
  const cardsList = teamCards ? teamCards.split(" ") : [];
  const id = String(card.id);
  const [selected, setSelected] = useState(cardsList.indexOf(id) >= 0);
  const [doSetCards] = useSetCardsMutation();
  const aula = useTheme("aula");

  async function doSelect(evt: React.BaseSyntheticEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    if (!teamId) return;
    setSelected(!selected);
    const cards = selected
      ? without(cardsList, id).join(" ")
      : cardsList.concat(id).join(" ");
    await doSetCards({ variables: { cards, teamId } });
    if (cards.split(" ").length > 1) window.scrollBy(0, selected ? -40 : 40);
  }
  const link = teamId ? `/team/${teamId}/cards/${id}` : `/cards/${id}`;
  const bgColor = selected ? "blue2" : aula ? "#69F0AE" : "blue3";
  const bgImage = `/images/bg_${card.icon || card.type}.svg`;

  return (
    <Box
      width={["calc(50% - 16px)", "calc(50% - 16px)", "calc(33.3333% - 16px)"]}
      mx="8px"
      sx={{
        background: `url(${bgImage}) center no-repeat`,
        backgroundColor: bgColor,
      }}
      color="#fff"
      p={3}
      mb={3}
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        fontSize={1}
        color={aula ? "blue2" : "black"}
      >
        <Heading
          as="h3"
          mt={0}
          fontSize={String(card.title).length > 30 ? "20px" : "20px"}
          fontWeight={aula ? "bold" : "normal"}
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(link)}
        >
          {card.title}
        </Heading>
        <Text mb={2} sx={{ hyphens: "auto" }}>
          {truncate(String(card.description), { length: 75 })}
        </Text>
        <Flex justifyContent="space-between" alignItems="flex-end" mt={2}>
          <Text mr={2}>
            <strong>Alter:</strong> {card.age}
            <br />
            <strong>Dauer:</strong> {card.duration}
          </Text>
          {teamId ? (
            <Box textAlign="right" sx={{ flexShrink: 0, cursor: "pointer" }}>
              <RImage
                src="/images/icon_preview.svg"
                onClick={() => router.push(link)}
                mb={2}
                display="block"
              />
              {selected ? (
                <Image src={IconCheck} onClick={doSelect} alt="Abwählen" />
              ) : (
                <Image src={IconAdd} onClick={doSelect} alt="Auswählen" />
              )}
            </Box>
          ) : null}
        </Flex>
      </Flex>
    </Box>
  );
};

export const StudentCardList: React.FC<React.PropsWithChildren<{
  teamCards: string;
  teamId: string;
}>> = ({ teamCards, teamId }) => {
  const router = useRouter();
  if (!teamCards) {
    return (
      <OneRowTable text="Deine Lehrperson hat noch keine Inhalte ausgewählt" />
    );
  }
  return (
    <Box id="cards">
      {teamCards.split(" ").map((id) => {
        const card = getCardMeta(id);
        return (
          <Flex
            key={id}
            onClick={() => router.push(`/team/${teamId}/cards/${id}`)}
            alignItems="center"
            bg="primary"
            mb={3}
            px={3}
            height={76}
            fontWeight="semi"
            sx={{ ":hover": { bg: "primary" }, cursor: "pointer" }}
            color="#fff"
          >
            <TDImage
              src={getCardIcon(card?.icon, card?.type)}
              mr={3}
              ml={0}
              light
            />
            {card?.title}
          </Flex>
        );
      })}
    </Box>
  );
};

export const TeacherCardList: React.FC<React.PropsWithChildren<{
  teamCards: string;
  teamId: string;
}>> = ({ teamCards, teamId }) => {
  if (!teamCards) {
    return <OneRowTable text="Noch keine Inhalte ausgewählt" />;
  }
  return (
    <Table id="cards">
      {teamCards.split(" ").map((id) => {
        const card = getCardMeta(id);
        return (
          <TR key={id} href={`/team/${teamId}/cards/${id}`}>
            <TD flexy>{card?.title}</TD>
            <TDIcon mr={0}>
              <Image src={IconWatch} alt="" />
            </TDIcon>
            <TD width="180px" smHide>
              {card?.duration}
            </TD>
            <TDImage src={getCardTypeIcon(card?.type)} />
          </TR>
        );
      })}
    </Table>
  );
};

interface CardAdminType {
  id: string;
  ix: number;
  title: string;
  link: string;
  type?: string | null;
  duration?: string | null;
}

interface CardAdminProps {
  item: CardAdminType;
  itemSelected: number;
  dragHandleProps: Record<string, any>;
  commonProps: { doDelete: (id: string) => void };
}

export const EditCardList: React.FC<React.PropsWithChildren<{
  teamCards: string;
  teamId: string;
}>> = ({ teamCards, teamId }) => {
  const [cards, setCards] = useState<readonly CardAdminType[]>([]);
  const [doSetCards] = useSetCardsMutation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => generateList(teamCards), [teamCards]);

  if (!teamCards) {
    return <OneRowTable text="Noch keine Inhalte ausgewählt" />;
  }
  function doDelete(id: string) {
    const oldCards = cards.map((item) => item.id);
    const newCards = without(oldCards, id);
    const str = newCards.join(" ");
    void doSetCards({ variables: { cards: str, teamId } });
    generateList(str);
  }

  function generateList(str: string) {
    const cards = str.split(" ").map((id, ix) => {
      const card = getCardMeta(id);
      return {
        id,
        ix: ix + 1,
        title: getCardTitle(id),
        link: `/team/${teamId}/cards/${id}`,
        type: card?.type,
        duration: card?.duration,
      };
    });
    setCards(cards);
  }

  function onMoveEnd(newList: readonly CardAdminType[]) {
    const cards = newList.map((item) => item.id).join(" ");
    void doSetCards({ variables: { cards, teamId } });
    generateList(cards);
  }

  return (
    <Table>
      <DraggableList<
        CardAdminType,
        { doDelete: (id: string) => void },
        CardAdminItem
      >
        list={cards}
        itemKey="id"
        padding={0}
        onMoveEnd={onMoveEnd}
        template={CardAdminItem}
        commonProps={{ doDelete }}
      />
    </Table>
  );
};

class CardAdminItem extends React.Component<CardAdminProps> {
  state = {
    over: false,
  };

  render() {
    const { item, dragHandleProps } = this.props;
    return (
      <TR
        onMouseOver={() => this.setState({ over: true })}
        onMouseOut={() => this.setState({ over: false })}
      >
        <TDIcon {...dragHandleProps} sx={{ cursor: "grab" }}>
          <Image src={IconMove} alt="" />
        </TDIcon>
        <TD flexy>
          <A
            href={item.link}
            sx={{ textDecoration: "none", borderBottom: "none" }}
          >
            {item.title}
          </A>
        </TD>
        <TDIcon smHide mr={0}>
          <Image src={IconWatch} alt="" />
        </TDIcon>

        <TD width="180px" smHide>
          {item?.duration}
        </TD>
        <TDIcon>
          <Image
            src={IconTrash}
            onClick={() => this.props.commonProps.doDelete(item.id)}
            alt="Löschen"
          />
        </TDIcon>
      </TR>
    );
  }
}

interface ICardContext {
  card: string;
  title: string;
}

export const CardContext = React.createContext({} as ICardContext);

export const Card: React.FC<React.PropsWithChildren<{ id: string }>> = ({ id }) => {
  const Comp = getCard(id);
  const title = getCardTitle(id);
  // use useState for context, otherwise childs will always be rerendered
  const [context] = useState<ICardContext>({ card: id, title });
  return (
    <CardContext.Provider value={context}>
      <Text fontSize={2} textAlign="left">
        <Comp />
      </Text>
    </CardContext.Provider>
  );
};

export function getCard(id: string): React.FC<React.PropsWithChildren<unknown>> {
  // @ts-ignore TODO, not sure how to beter do the lookup here
  return cards[id].default as React.FC<React.PropsWithChildren<unknown>>;
}

export function getCardMeta(id: string): CardType | undefined {
  // @ts-ignore TODO, not sure how to beter do the lookup here
  return id in cards ? (cards[id].meta as CardType) : undefined;
}

export function getCardTitle(id: string): string {
  const meta = getCardMeta(id);
  return meta ? String(meta["title"]) : "";
}

export function getCardIcon(
  icon?: string | null,
  type?: string | null
): string {
  return `/images/card_${icon || type || "generic"}.svg`;
}

export function getCardTypeIcon(type?: string | null): string {
  switch (type) {
    case "tool":
      return "/images/icon_tool.svg";
    case "video":
      return "/images/icon_video.svg";
    case "chaty":
      return "/images/icon_chaty.svg";
    default:
      return "/images/icon_tool.svg";
  }
}
