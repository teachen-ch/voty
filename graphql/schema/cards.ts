import resolvers from "../resolvers";
import { extendType, objectType, stringArg, nonNull } from "@nexus/schema";

export const Card = objectType({
  name: "Card",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("description");
    t.string("duration");
    t.string("age");
    t.string("keywords");
    t.string("type");
    t.string("url");
    t.string("source");
    t.string("content");
    t.boolean("discussion");
  },
});

export const CardsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("cards", {
      type: "Card",
      args: {
        keywords: stringArg(),
        age: stringArg(),
        type: stringArg(),
      },
      resolve: (_root, args, ctx, info) =>
        resolvers.cards.cards(_root, args, ctx, info),
    });
  },
});

export const CardsMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("setCards", {
      type: "Team",
      args: {
        teamId: nonNull(stringArg()),
        cards: nonNull(stringArg()),
      },
      resolve: (_root, args, ctx, info) =>
        resolvers.cards.setCards(_root, args, ctx, info),
    });
  },
});
