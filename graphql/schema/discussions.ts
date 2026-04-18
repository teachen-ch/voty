import { builder } from "../builder";

export const DiscussionType = builder.prismaObject("Discussion", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    text: t.exposeString("text"),
    card: t.exposeString("card", { nullable: true }),
    ballotId: t.exposeString("ballotId", { nullable: true }),
    user: t.relation("user"),
    reactions: t.relation("reactions"),
    attachments: t.relation("attachments"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

// Self-referential field — attached after declaration. Uses the resolver to
// return nested discussion chains filtered by card/ballotId.
builder.objectFields(DiscussionType, (t) => ({
  children: t.field({
    type: [DiscussionType],
    nullable: true,
    resolve: async (root: any, _args, ctx, info) => {
      const { discussions } = await import("../resolvers");
      return discussions.getTeamDiscussions(
        root,
        { card: root.card, ballotId: root.ballotId },
        ctx,
        info
      ) as any;
    },
  }),
}));

export const ReactionType = builder.prismaObject("Reaction", {
  fields: (t) => ({
    id: t.exposeID("id", { nullable: true }),
    emoij: t.exposeString("emoij", { nullable: true }),
    user: t.relation("user"),
    discussion: t.relation("discussion", { nullable: true }),
  }),
});

builder.queryField("getTeamDiscussions", (t) =>
  t.field({
    type: [DiscussionType],
    nullable: true,
    authScopes: { loggedIn: true },
    args: {
      card: t.arg.string(),
      ballotId: t.arg.string(),
      teamId: t.arg.string(),
    },
    resolve: async (_root, args, ctx, info) => {
      const { discussions } = await import("../resolvers");
      return discussions.getTeamDiscussions(_root, args, ctx, info) as any;
    },
  })
);

builder.mutationField("postDiscussion", (t) =>
  t.field({
    type: DiscussionType,
    authScopes: { loggedIn: true },
    args: {
      card: t.arg.string(),
      ballotId: t.arg.string(),
      teamId: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
      text: t.arg.string({ required: true }),
    },
    resolve: async (_root, args, ctx, info) => {
      const { discussions } = await import("../resolvers");
      return discussions.postDiscussion(_root, args, ctx, info) as any;
    },
  })
);
