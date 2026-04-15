import { builder, BallotScopeEnum } from "../builder";

export const BallotType = builder.prismaObject("Ballot", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    body: t.exposeString("body"),
    start: t.expose("start", { type: "DateTime" }),
    end: t.expose("end", { type: "DateTime" }),
    scope: t.field({ type: BallotScopeEnum, resolve: (p) => p.scope }),
    canton: t.exposeString("canton", { nullable: true }),
    teamId: t.exposeString("teamId", { nullable: true }),
    schoolId: t.exposeString("schoolId", { nullable: true }),
    originalLocale: t.exposeString("originalLocale"),
    // TODO Step 7: wire canVote + hasVoted via resolvers.ballots.canVote /
    //   hasVoted. Lazy-import the resolvers module inside the resolver fn so
    //   that SDL printing does not pull MDX content through the resolver tree.
    canVote: t.boolean({
      nullable: true,
      resolve: async (root, _args, ctx, info) => {
        const { ballots } = await import("../resolvers");
        return ballots.canVote(root as any, {}, ctx, info);
      },
    }),
    hasVoted: t.boolean({
      nullable: true,
      resolve: async (root, _args, ctx, info) => {
        const { ballots } = await import("../resolvers");
        return ballots.hasVoted(root as any, {}, ctx, info);
      },
    }),
  }),
});

export const BallotRunType = builder.prismaObject("BallotRun", {
  fields: (t) => ({
    id: t.exposeID("id"),
    ballotId: t.exposeString("ballotId"),
    team: t.relation("team"),
    start: t.expose("start", { type: "DateTime", nullable: true }),
    end: t.expose("end", { type: "DateTime", nullable: true }),
  }),
});

export const BallotResults = builder.objectRef<{
  yes?: number;
  no?: number;
  abs?: number;
  total?: number;
}>("BallotResults").implement({
  fields: (t) => ({
    yes: t.int({ nullable: true, resolve: (p) => p.yes ?? null }),
    no: t.int({ nullable: true, resolve: (p) => p.no ?? null }),
    abs: t.int({ nullable: true, resolve: (p) => p.abs ?? null }),
    total: t.int({ nullable: true, resolve: (p) => p.total ?? null }),
  }),
});

import * as ballots from "../resolvers/ballots";
import { Response } from "./votes";

builder.queryField("getBallotRuns", (t) =>
  t.field({
    type: [BallotRunType],
    nullable: true,
    args: {
      teamId: t.arg.string({ required: true }),
      locale: t.arg.string(),
    },
    resolve: (_root, args, ctx, info) =>
      ballots.getBallotRuns(_root, args, ctx, info) as any,
  })
);

builder.queryField("getBallotResults", (t) =>
  t.field({
    type: BallotResults,
    nullable: true,
    args: {
      ballotId: t.arg.string({ required: true }),
      ballotRunId: t.arg.string(),
      teamId: t.arg.string(),
      schoolId: t.arg.string(),
      canton: t.arg.string(),
    },
    resolve: (_root, args, ctx, info) =>
      ballots.getBallotResults(_root, args, ctx, info) as any,
  })
);

builder.mutationField("addBallotRun", (t) =>
  t.prismaField({
    type: "BallotRun",
    args: {
      ballotId: t.arg.string({ required: true }),
      teamId: t.arg.string({ required: true }),
    },
    resolve: (_query, _root, args, ctx, info) =>
      ballots.addBallotRun(_root, args, ctx, info) as any,
  })
);

builder.mutationField("removeBallotRun", (t) =>
  t.field({
    type: Response,
    args: { ballotRunId: t.arg.string({ required: true }) },
    resolve: (_root, args, ctx, info) =>
      ballots.removeBallotRun(_root, args, ctx, info) as any,
  })
);

builder.mutationField("startBallotRun", (t) =>
  t.prismaField({
    type: "BallotRun",
    args: { ballotRunId: t.arg.string({ required: true }) },
    resolve: (_query, _root, args, ctx, info) =>
      ballots.startBallotRun(_root, args, ctx, info) as any,
  })
);

builder.mutationField("endBallotRun", (t) =>
  t.prismaField({
    type: "BallotRun",
    args: { ballotRunId: t.arg.string({ required: true }) },
    resolve: (_query, _root, args, ctx, info) =>
      ballots.endBallotRun(_root, args, ctx, info) as any,
  })
);

// TODO Step 8: CRUD ops — ballot, ballots (ordering + filtering + locale wrap),
//   createOneBallot, updateOneBallot, deleteOneBallot
