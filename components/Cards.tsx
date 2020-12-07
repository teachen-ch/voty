import { gql } from "@apollo/client";
import * as cards from "content/";
import { Card as CardType, useCardsQuery } from "graphql/types";
import { Flex, Box, Text, Heading } from "rebass";
import { Loading } from "components/Page";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

export const Cards: React.FC<{ keywords?: string; age?: string }> = (props) => {
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
      {cards?.map((card) => card && <CardBox card={card} />)}
    </Flex>
  );
};

export const CardBox: React.FC<{ card: CardType }> = ({ card }) => {
  const router = useRouter();
  return (
    <Box
      bg="white"
      width="calc(33.3333% - 16px);"
      mx="8px"
      color="black"
      p={3}
      mb={3}
      onClick={() => router.push(`/cards/${card.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <Heading as="h3" mt={0} fontSize={2}>
        {card.title}
      </Heading>
      <Text fontSize={1}>
        <Text>{card.description}</Text>
        <Text mt={2}>
          <strong>Alter:</strong>
          <br /> {card.age}
        </Text>
        <Text mt={2}>
          <strong>Dauer:</strong>
          <br /> {card.duration}
        </Text>
      </Text>
    </Box>
  );
};
export const Card: React.FC<{ id: string }> = ({ id }) => {
  const Comp = getCard(id);
  return <Comp />;
};

export function getCard(id: string): React.FC {
  // @ts-ignore TODO, not sure how to beter do the lookup here
  return cards[id].default;
}

export function getCardMeta(id: string): CardType | undefined {
  // @ts-ignore TODO, not sure how to beter do the lookup here
  return id in cards ? cards[id].meta : undefined;
}
