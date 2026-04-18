import { builder } from "../builder";

export const VoteType = builder.prismaObject("Vote", {
  authScopes: { loggedIn: true },
  fields: (t) => ({
    verify: t.exposeString("verify", { nullable: true }),
    ballot: t.relation("ballot"),
  }),
});

export const Response = builder.objectRef<{
  success?: boolean;
  error?: boolean;
  message?: string;
}>("Response").implement({
  fields: (t) => ({
    success: t.boolean({ nullable: true, resolve: (p) => p.success ?? null }),
    error: t.boolean({ nullable: true, resolve: (p) => p.error ?? null }),
    message: t.string({ nullable: true, resolve: (p) => p.message ?? null }),
  }),
});

import * as ballots from "../resolvers/ballots";

builder.mutationField("vote", (t) =>
  t.prismaField({
    type: "Vote",
    authScopes: { loggedIn: true },
    args: {
      ballotId: t.arg.string({ required: true }),
      vote: t.arg.int({ required: true }),
    },
    resolve: (_query, _root, args, ctx, info) =>
      ballots.vote(_root, args, ctx, info) as any,
  })
);

builder.mutationField("voteCode", (t) =>
  t.field({
    type: Response,
    args: {
      ballotRunId: t.arg.string({ required: true }),
      vote: t.arg.int({ required: true }),
      code: t.arg.string({ required: true }),
    },
    resolve: (_root, args, ctx, info) =>
      ballots.voteCode(_root, args, ctx, info) as any,
  })
);
