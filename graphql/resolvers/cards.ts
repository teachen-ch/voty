import { FieldResolver } from "@nexus/schema";
import { Card } from "graphql/types";
import * as cardsData from "content/";
import { Role } from "@prisma/client";

const env = process.env.NEXT_PUBLIC_ENV;

export const cards: FieldResolver<"Query", "cards"> = (_root, args) => {
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
  // filter out cards which have show = "local" or "development"
  if (env === "production")
    cards = cards.filter((c) => c.show !== "local" && c.show !== "development");
  if (env === "development") cards = cards.filter((c) => c.show !== "local");
  return cards;
};

function allCards(): Card[] {
  return Object.keys(cardsData).map(
    // @ts-ignore TODO, not sure how to better do the lookup here
    (key: string) => cardsData[key].meta as Card
  );
}

export const setCards: FieldResolver<"Mutation", "setCards"> = async (
  _root,
  args,
  ctx
) => {
  const { teamId, cards } = args;
  const team = await ctx.db.team.findUnique({ where: { id: teamId } });
  if (team?.teacherId !== ctx.user?.id && ctx.user?.role !== Role.Admin)
    throw new Error("Error.NoPermission");

  const newTeam = await ctx.db.team.update({
    data: { cards },
    where: { id: teamId },
  });
  return newTeam;
};
