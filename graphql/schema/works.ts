import resolvers from "../resolvers";
import {
  extendType,
  objectType,
  stringArg,
  booleanArg,
  arg,
} from "@nexus/schema";
import { Visibility } from "@prisma/client";

export const Work = objectType({
  name: "Work",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.title();
    t.model.data();
    t.model.users();
    t.model.attachments();
    t.model.card();
    t.model.updatedAt();
    t.model.reactions();
  },
});

export const WOrksQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("works", {
      type: "Work",
      args: {
        card: stringArg(),
        teamId: stringArg(),
        schoolId: stringArg(),
        // visibility: arg<Visibility>()
      },
      resolve: (_root, args, ctx, info) =>
        resolvers.works.getWorks(_root, args, ctx, info),
    });
  },
});
