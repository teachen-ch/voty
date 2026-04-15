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

// TODO Step 7: queryField/mutationField for:
//   - getBallotRuns, getBallotResults
//   - addBallotRun, removeBallotRun, startBallotRun, endBallotRun
//   - locale replacement wrapper around CRUD ballot/ballots
// TODO Step 8: CRUD ops — ballot, ballots (ordering + filtering + locale wrap),
//   createOneBallot, updateOneBallot, deleteOneBallot
