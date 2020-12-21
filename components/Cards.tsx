import { gql } from "@apollo/client";
import * as cards from "content/";
import {
  Card as CardType,
  useCardsQuery,
  useSetCardsMutation,
} from "graphql/types";
import { Flex, Box, Text, Heading, Button } from "rebass";
import { Loading } from "components/Page";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { without } from "lodash";
import { A } from "./Breadcrumb";

export const GET_CARDS = gql`
  query cards($keywords: String, $age: String) {
    cards(keywords: $keywords, age: $age) {
      id
      title
      description
      duration
      keywords
      type
      url
      source
      content
      age
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

export const Cards: React.FC<{
  keywords?: string;
  age?: string;
  teamId: string;
  teamCards: string;
}> = (props) => {
  const cardsQuery = useCardsQuery({ variables: props });
  const cards = cardsQuery.data?.cards;

  if (cardsQuery.error) {
    return <Text>Error loading data: {cardsQuery.error.message}</Text>;
  }
  if (cardsQuery.loading) {
    return <Loading />;
  }
  if (!cards) {
    return <p>No cards found</p>;
  }
  return (
    <Flex flexWrap="wrap" mx="-8px">
      {cards?.map(
        (card) =>
          card && (
            <CardBox
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

export const CardBox: React.FC<{
  card: CardType;
  teamCards: string;
  teamId: string;
}> = ({ card, teamCards, teamId }) => {
  const router = useRouter();
  const cardsList = teamCards ? teamCards.split(" ") : [];
  const id = String(card.id);
  const [selected, setSelected] = useState(cardsList.indexOf(id) >= 0);
  const [doSetCards] = useSetCardsMutation();

  async function doSelect(evt: React.BaseSyntheticEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    setSelected(!selected);
    const cards = selected
      ? without(cardsList, id).join(" ")
      : cardsList.concat(id).join(" ");
    await doSetCards({ variables: { cards, teamId } });
  }
  return (
    <Box
      bg="white"
      width="calc(33.3333% - 16px);"
      mx="8px"
      color="black"
      p={3}
      mb={3}
      onClick={() => router.push(`cards/${card.id}`)}
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
            {selected ? "✔" : "+"}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export const CardList: React.FC<{ teamCards: string; teamId: string }> = ({
  teamCards,
  teamId,
}) => {
  if (!teamCards) {
    return <Text>Noch keine Inhalte ausgewählt</Text>;
  }
  return (
    <>
      {teamCards.split(" ").map((id, ix) => (
        <Flex key={id} my={3} ml={4}>
          <CircleBullet value={ix + 1} />
          <Text>
            <A href={`/team/${teamId}/cards/${id}`}>{getCardTitle(id)}</A>
          </Text>
        </Flex>
      ))}
    </>
  );
};

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
    fontSize={[2]}
    display="inline-block"
    sx={{ borderRadius: 25, cursor: onClick ? "pointer" : "inherit" }}
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
