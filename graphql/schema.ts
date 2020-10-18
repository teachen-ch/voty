import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { permissions } from "./permissions";
import { randomBytes } from "crypto";
import resolvers from "./resolvers";
import { intArg, stringArg } from "nexus/components/schema";
import { random } from "lodash";
use(
  prisma({
    features: {
      crud: true,
    },
    /*client: {
      options: { log: ["query", "info", "warn"] },
    },*/
  })
);

use(permissions);

schema.addToContext(({ req }) => {
  return {
    user: resolvers.users.getSessionUser(req as any),
  };
});

schema.objectType({
  name: "School",
  definition(t) {
    t.model.id();
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

schema.objectType({
  name: "Team",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.invite();
    t.model.code();
    t.model.domain();
    t.model.school();
    t.model.teacher();
    t.model.members();
    t.model.ballots();
  },
});

schema.objectType({
  name: "Thread",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.text();
    t.model.user();
    t.model.parent();
    t.model.children();
    t.model.reactions();
    t.model.attachments();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: "Reaction",
  definition(t) {
    t.model.id();
    t.model.emoij();
    t.model.user();
    t.model.thread();
  },
});

schema.objectType({
  name: "Domain",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.approved();
    t.model.schools();
  },
});

schema.objectType({
  name: "Ballot",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.body();
    t.model.start();
    t.model.end();
    t.model.scope();
    t.model.canton();
    // t.model.school();
    // t.model.creator();
    // t.model.createdAt();
    // t.model.updatedAt();

    t.boolean("canVote", {
      resolve: resolvers.ballots.canVote,
    });
    t.boolean("hasVoted", {
      resolve: resolvers.ballots.hasVoted,
    });
  },
});

schema.objectType({
  name: "BallotRun",
  definition(t) {
    t.model.id();
    t.model.ballot();
    t.model.team();
    t.model.start();
    t.model.end();
  },
});

schema.objectType({
  name: "Attachment",
  definition(t) {
    t.model.id();
    t.model.file();
    t.model.user();

    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: "Vote",
  definition(t) {
    t.model.verify();
    t.model.ballot();
  },
});

schema.objectType({
  name: "Response",
  definition(t) {
    t.boolean("success");
    t.boolean("error");
    t.string("message");
  },
});

schema.objectType({
  name: "BallotResults",
  definition(t) {
    t.int("yes");
    t.int("no");
    t.int("abs");
    t.int("total");
  },
});

schema.queryType({
  definition(t) {
    t.crud.school();
    t.crud.schools({
      ordering: true,
      filtering: true,
    });
    t.crud.team();
    t.crud.teams({
      ordering: true,
      filtering: true,
    });

    t.crud.ballot();
    t.crud.ballots({
      ordering: true,
      filtering: true,
    });

    t.field("getBallotRuns", {
      type: "BallotRun",
      list: true,
      args: {
        teamId: stringArg({ required: true }),
      },
      resolve: resolvers.ballots.getBallotRuns,
    });

    t.field("getBallotResults", {
      type: "BallotResults",
      args: {
        ballotId: stringArg({ required: true }),
        ballotRunId: stringArg({ required: false }),
        teamId: stringArg({ required: false }),
        schoolId: stringArg({ required: false }),
        canton: stringArg({ required: false }),
      },
      resolve: resolvers.ballots.getBallotResults,
    });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneSchool();
    t.crud.deleteOneSchool();
    t.crud.createOneTeam({
      computedInputs: {
        invite: () => randomBytes(6).toString("hex"),
        code: () => String(random(10 ** 7, 10 ** 8 - 1)),
      },
    });
    t.crud.deleteOneTeam();

    t.field("vote", {
      type: "Vote",
      args: {
        ballotId: stringArg({ required: true }),
        vote: intArg({ required: true }),
      },
      resolve: resolvers.ballots.vote,
    });

    t.field("voteCode", {
      type: "Response",
      args: {
        ballotRunId: stringArg({ required: true }),
        vote: intArg({ required: true }),
        code: stringArg({ required: true }),
      },
      resolve: resolvers.ballots.voteCode,
    });

    t.field("inviteStudents", {
      type: "Team",
      args: {
        team: stringArg({ required: true }),
        emails: stringArg({ list: true, required: true }),
      },
      resolve: resolvers.teams.inviteStudents,
    });

    t.field("addBallotRun", {
      type: "BallotRun",
      args: {
        ballotId: stringArg({ required: true }),
        teamId: stringArg({ required: true }),
      },
      resolve: resolvers.ballots.addBallotRun,
    });

    t.field("removeBallotRun", {
      type: "Response",
      args: {
        ballotRunId: stringArg({ required: true }),
      },
      resolve: resolvers.ballots.removeBallotRun,
    });

    t.field("startBallotRun", {
      type: "BallotRun",
      args: {
        ballotRunId: stringArg({ required: true }),
      },
      resolve: resolvers.ballots.startBallotRun,
    });

    t.field("endBallotRun", {
      type: "BallotRun",
      args: {
        ballotRunId: stringArg({ required: true }),
      },
      resolve: resolvers.ballots.endBallotRun,
    });
  },
});
