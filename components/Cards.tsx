import { gql } from "@apollo/client";
import * as cards from "content/";
import {
  Card as CardType,
  useCardsQuery,
  useSetCardsMutation,
} from "graphql/types";
import { Flex, Box, Image, Text, Heading, Button } from "rebass";
import { Loading } from "components/Page";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { without } from "lodash";
import { A } from "./Breadcrumb";
import DraggableList from "react-draggable-list";
import { OneRowTable, Table, TD, TDIcon, TR } from "./Table";

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

export const Cards: React.FC<{
  keywords?: string;
  age?: string;
  selected?: boolean;
  type?: string;
  teamId?: string;
  teamCards?: string;
  resetFilters: () => void;
}> = (props) => {
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

export const CardItem: React.FC<{
  card: CardType;
  teamCards?: string;
  teamId?: string;
}> = ({ card, teamCards, teamId }) => {
  const router = useRouter();
  const cardsList = teamCards ? teamCards.split(" ") : [];
  const id = String(card.id);
  const [selected, setSelected] = useState(cardsList.indexOf(id) >= 0);
  const [doSetCards] = useSetCardsMutation();

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
  return (
    <Box
      bg="white"
      width="calc(33.3333% - 16px);"
      mx="8px"
      color="black"
      p={3}
      mb={3}
      onClick={() => router.push(link)}
      sx={{ cursor: "pointer" }}
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        flex={1}
      >
        <Heading as="h3" mt={0} fontSize={2}>
          {card.title}
        </Heading>
        <Text fontSize={1}>{card.description}</Text>
        <Text mt={2} fontSize={1}>
          <strong>Alter:</strong>
          <br /> {card.age}
        </Text>
        <Flex justifyContent="space-between" alignItems="center" mt={2}>
          <Text fontSize={1}>
            <strong>Dauer:</strong>
            <br /> {card.duration}
          </Text>
          {teamId ? (
            <Button
              sx={{
                borderRadius: 100,
                width: 60,
                height: 60,
                boxSizing: "border-box",
                border: "5px solid white",
              }}
              bg={selected ? "green" : "secondary"}
              onClick={doSelect}
            >
              {selected ? (
                <img src="/images/icon_check.svg" />
              ) : (
                <img src="/images/icon_add.svg" />
              )}
            </Button>
          ) : null}
        </Flex>
      </Flex>
    </Box>
  );
};

export const CardStudentList: React.FC<{
  teamCards: string;
  teamId: string;
}> = ({ teamCards, teamId }) => {
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
            bg="secondary"
            sx={{ cursor: "pointer" }}
            mb={4}
            px={3}
            height={84}
            fontWeight="semi"
          >
            <Image src={getCardIcon(card?.icon, card?.type)} mr={3} />
            {card?.title}
          </Flex>
        );
      })}
    </Box>
  );
};

export const CardListAdmin: React.FC<{
  teamCards: string;
  teamId: string;
}> = ({ teamCards, teamId }) => {
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
            <TDIcon src="/images/icon_watch.svg" mr={0} />
            <TD width="180px" smHide>
              {card?.duration}
            </TD>
            <TDIcon src={getCardTypeIcon(card?.type)} />
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
  commonProps: (id: string) => void;
}

export const CardListSelect: React.FC<{
  teamCards: string;
  teamId: string;
}> = ({ teamCards, teamId }) => {
  if (!teamCards) {
    return <OneRowTable text="Noch keine Inhalte ausgewählt" />;
  }
  const [cards, setCards] = useState<readonly CardAdminType[]>([]);
  const [doSetCards] = useSetCardsMutation();

  useEffect(() => generateList(teamCards), [teamCards]);

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
      <DraggableList<CardAdminType, (id: string) => void, CardAdminItem>
        list={cards}
        itemKey="id"
        padding={0}
        onMoveEnd={onMoveEnd}
        template={CardAdminItem}
        commonProps={doDelete}
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
        <TDIcon
          {...dragHandleProps}
          sx={{ cursor: "move" }}
          src="/images/icon_move.svg"
        />
        <TD flexy>
          <A href={item.link}>{item.title}</A>
        </TD>
        <TDIcon src="/images/icon_watch.svg" mr={0} />

        <TD width="180px" smHide>
          {item?.duration}
        </TD>
        <TDIcon
          src="/images/icon_trash.svg"
          sx={{ cursor: "pointer" }}
          onClick={() => this.props.commonProps(item.id)}
        />
      </TR>
    );
  }
}

export const Card: React.FC<{ id: string }> = ({ id }) => {
  const Comp = getCard(id);
  return <Comp />;
};

export const CircleBullet: React.FC<{
  value: string | number;
  bg?: string;
  color?: string;
  onClick?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ value, onClick, bg, color }) => (
  <Text
    fontWeight="bold"
    fontSize={2}
    display="inline-block"
    sx={{
      borderRadius: 25,
      cursor: onClick ? "pointer" : "inherit",
      flexShrink: 0,
    }}
    color={color || "gray"}
    bg={bg || "white"}
    mr={2}
    p={1}
    width="35px"
    height="35px"
    textAlign="center"
    onClick={onClick}
  >
    {value}
  </Text>
);

export function getCard(id: string): React.FC {
  // @ts-ignore TODO, not sure how to beter do the lookup here
  return cards[id].default as React.FC;
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
  return icon || `/images/card_${type || "generic"}.svg`;
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
