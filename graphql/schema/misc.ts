import {
  objectType,
  queryType,
  mutationType,
  stringArg,
  intArg,
  nonNull,
} from "@nexus/schema";
import resolvers from "../resolvers";

export const School = objectType({
  name: "School",
  definition(t) {
    t.nonNull.model.id();
    t.model.name();
    t.model.type();
    t.model.teams();
    t.model.members();
    t.model.address();
    t.model.city();
    t.model.zip();
    t.model.canton();
  },
});

export const Domain = objectType({
  name: "Domain",
  definition(t) {
    t.nonNull.model.id();
    t.model.name();
    t.model.approved();
    t.model.schools();
  },
});
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

export const Vote = objectType({
  name: "Vote",
  definition(t) {
    t.model.verify();
    t.model.ballot();
  },
});

export const Response = objectType({
  name: "Response",
  definition(t) {
    t.boolean("success");
    t.boolean("error");
    t.string("message");
  },
});

export const InviteResponse = objectType({
  name: "InviteResponse",
  definition(t) {
    t.list.string("created");
    t.list.string("failed");
    t.list.string("duplicated");
    t.field("team", { type: "Team" });
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

export const Query = queryType({
  definition(t) {
    t.crud.school();
    t.crud.schools({
      ordering: true,
      filtering: true,
    });

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

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneSchool();
    t.crud.deleteOneSchool();

    t.field("vote", {
      type: "Vote",
      args: {
        ballotId: nonNull(stringArg()),
        vote: nonNull(intArg()),
      },
      resolve: resolvers.ballots.vote,
    });

    t.field("voteCode", {
      type: "Response",
      args: {
        ballotRunId: nonNull(stringArg()),
        vote: nonNull(intArg()),
        code: nonNull(stringArg()),
      },
      resolve: resolvers.ballots.voteCode,
    });

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
