import {
  objectType,
  mutationType,
  stringArg,
  intArg,
  nonNull,
} from "@nexus/schema";
import resolvers from "../resolvers";

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

export const Mutation = mutationType({
  definition(t) {
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
  },
});
