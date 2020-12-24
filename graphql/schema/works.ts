import resolvers from "../resolvers";
import {
  extendType,
  objectType,
  stringArg,
  arg,
  list,
  nonNull,
} from "@nexus/schema";

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

export const WorksQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.works({
      ordering: true,
      filtering: true,
      alias: "works",
      // resolve: resolvers.works.getWorks,
    });
    /* t.list.field("works", {
      type: "Work",
      args: {
        card: stringArg(),
        userId: stringArg(),
        teamId: stringArg(),
        schoolId: stringArg(),
        visibility: arg({ type: "Visibility" }),
      },
      resolve: (_root, args, ctx, info) =>
        resolvers.works.getWorks(_root, args, ctx, info),
    }); */
  },
});

export const WorksMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneWork({
      alias: "postWork",
      // resolve: resolvers.works.postWork,
    });
    /* t.field("postWork", {
      type: "Work",
      args: {
        data: {
          card: stringArg(),
          title: stringArg(),
          text: stringArg(),
          attachments: list(
            nonNull(arg({ type: "AttachmentCreateOrConnectWithoutworkInput" }))
          ),
          userIds: list(nonNull(stringArg())),
          teamId: nonNull(stringArg()),
          data: arg({ type: "Json" }),
        },
      },
      resolve: resolvers.works.postWork,
    }); */
  },
});
