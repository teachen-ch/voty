import { FieldResolver } from "@nexus/schema";
import { Card } from "graphql/types";
import logger from "util/logger";
import * as cards from "content/";

export const getCards: FieldResolver<"Query", "cards"> = async (
  _root,
  args,
  ctx
) => {
  let { keywords, age, type } = args;

  let cards = await allCards();
  if (age) keywords = keywords ? `${keywords} ${age}` : age;
  if (keywords) {
    const words = keywords.toLowerCase().split(/[,\s;]/);
    for (const word of words) {
      cards = cards.filter(
        (card) => Object.values(card).join(" ").toLowerCase().indexOf(word) >= 0
      );
    }
  }
  if (type) {
    cards = cards.filter((card) => card.type === type);
  }
  return cards;
};

async function allCards(): Promise<Card[]> {
  // @ts-ignore TODO, not sure how to beter do the lookup here
  return Object.keys(cards).map((key: string) => cards[key].meta);
}

function getCard(id: string): React.ReactNode {
  // @ts-ignore TODO, not sure how to beter do the lookup here
  return Object.keys(cards).map((key: string) => cards[key].default);
}

export const setCards: FieldResolver<"Mutation", "setCards"> = async (
  _root,
  args,
  ctx
) => {
  let { teamId, cards } = args;
  const team = await ctx.db.team.findUnique({ where: { id: teamId } });
  if (team?.teacherId !== ctx.user?.id) throw new Error("Error.NoPermission");

  const newTeam = await ctx.db.team.update({
    data: { cards },
    where: { id: teamId },
  });
  return newTeam;
};
