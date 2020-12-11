import resolvers from "../resolvers";
import { extendType, objectType, stringArg, intArg } from "@nexus/schema";

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
        type: intArg(),
      },
      resolve: (_root, args, ctx, info) =>
        resolvers.cards.getCards(_root, args, ctx, info),
    });
  },
});
