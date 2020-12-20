import { FieldResolver } from "@nexus/schema";
import { Card } from "graphql/types";
import * as cards from "content/";

export const getCards: FieldResolver<"Query", "cards"> = (_root, args) => {
  let { keywords } = args;
  const { age, type } = args;

  let cards = allCards();
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

function allCards(): Card[] {
  // @ts-ignore TODO, not sure how to better do the lookup here
  return Object.keys(cards).map((key: string) => cards[key].meta as Card);
}

export const setCards: FieldResolver<"Mutation", "setCards"> = async (
  _root,
  args,
  ctx
) => {
  const { teamId, cards } = args;
  const team = await ctx.db.team.findUnique({ where: { id: teamId } });
  if (team?.teacherId !== ctx.user?.id) throw new Error("Error.NoPermission");

  const newTeam = await ctx.db.team.update({
    data: { cards },
    where: { id: teamId },
  });
  return newTeam;
};
