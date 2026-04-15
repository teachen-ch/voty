import { builder } from "../builder";

export const VoteType = builder.prismaObject("Vote", {
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

// TODO Step 7: mutationField for:
//   - vote (resolvers.ballots.vote), voteCode (resolvers.ballots.voteCode)
