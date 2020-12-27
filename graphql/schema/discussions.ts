import resolvers from "../resolvers";
import { extendType, objectType, nonNull, stringArg } from "@nexus/schema";

export const Discussion = objectType({
  name: "Discussion",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.text();
    t.model.card();
    t.model.ballotId();
    t.model.user();
    t.list.field("children", {
      type: "Discussion",
      resolve: async (_root, args, ctx, info) =>
        await resolvers.discussions.getTeamDiscussions(
          _root,
          { card: _root.card, ballotId: _root.ballotId },
          ctx,
          info
        ),
    });
    t.model.reactions();
    t.model.attachments();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const Reaction = objectType({
  name: "Reaction",
  definition(t) {
    t.model.id();
    t.model.emoij();
    t.model.user();
    t.model.discussion();
  },
});

export const DiscussionsQueries = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getTeamDiscussions", {
      type: "Discussion",
      args: {
        card: stringArg(),
        ballotId: stringArg(),
        teamId: stringArg(),
      },
      resolve: resolvers.discussions.getTeamDiscussions,
    });
  },
});

export const DiscussionsMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("postDiscussion", {
      type: "Discussion",
      args: {
        card: stringArg(),
        ballotId: stringArg(),
        teamId: nonNull(stringArg()),
        title: nonNull(stringArg()),
        text: nonNull(stringArg()),
      },
      resolve: resolvers.discussions.postDiscussion,
    });
  },
});
