import resolvers from "../resolvers";
import { extendType, nonNull, objectType, stringArg } from "@nexus/schema";

export const Ballot = objectType({
  name: "Ballot",
  definition(t) {
    t.nonNull.model.id();
    t.nonNull.model.title();
    t.model.description();
    t.model.body();
    t.model.start();
    t.model.end();
    t.model.scope();
    t.model.canton();
    t.model.teamId();
    t.model.schoolId();
    t.boolean("canVote", {
      resolve: resolvers.ballots.canVote,
    });
    t.boolean("hasVoted", {
      resolve: resolvers.ballots.hasVoted,
    });
  },
});

export const BallotRun = objectType({
  name: "BallotRun",
  definition(t) {
    t.nonNull.model.id();
    t.nonNull.model.ballot();
    t.model.team();
    t.model.start();
    t.model.end();
  },
});

export const BallotResults = objectType({
  name: "BallotResults",
  definition(t) {
    t.int("yes");
    t.int("no");
    t.int("abs");
    t.int("total");
  },
});

export const BallotsQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.ballot();
    t.crud.ballots({
      ordering: true,
      filtering: true,
    });

    t.list.field("getBallotRuns", {
      type: "BallotRun",
      args: {
        teamId: nonNull(stringArg()),
      },
      resolve: resolvers.ballots.getBallotRuns,
    });

    t.field("getBallotResults", {
      type: "BallotResults",
      args: {
        ballotId: nonNull(stringArg()),
        ballotRunId: stringArg(),
        teamId: stringArg(),
        schoolId: stringArg(),
        canton: stringArg(),
      },
      resolve: resolvers.ballots.getBallotResults,
    });
  },
});

export const BallotsMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addBallotRun", {
      type: "BallotRun",
      args: {
        ballotId: nonNull(stringArg()),
        teamId: nonNull(stringArg()),
      },
      resolve: resolvers.ballots.addBallotRun,
    });

    t.field("removeBallotRun", {
      type: "Response",
      args: {
        ballotRunId: nonNull(stringArg()),
      },
      resolve: resolvers.ballots.removeBallotRun,
    });

    t.field("startBallotRun", {
      type: "BallotRun",
      args: {
        ballotRunId: nonNull(stringArg()),
      },
      resolve: resolvers.ballots.startBallotRun,
    });

    t.field("endBallotRun", {
      type: "BallotRun",
      args: {
        ballotRunId: nonNull(stringArg()),
      },
      resolve: resolvers.ballots.endBallotRun,
    });
  },
});
