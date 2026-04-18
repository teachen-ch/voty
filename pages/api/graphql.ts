import { createYoga } from "graphql-yoga";
import { schema } from "../../graphql/schema";
import prisma from "../../util/prisma";
import resolvers from "../../graphql/resolvers";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
  graphiql: process.env.NODE_ENV !== "production",
  maskedErrors: false,
  context: async ({ req, res }) => {
    // Resolve ctx.user against the DB every request — the JWT payload is
    // frozen at signing time, so schoolId/teamId/role can drift (e.g. after
    // setSchool / acceptInvite) and resolvers that trust ctx.user.schoolId
    // would fail on stale data.
    const jwtUser = resolvers.users.getSessionUser(req);
    const user = jwtUser?.id
      ? (await prisma.user.findUnique({ where: { id: jwtUser.id } })) ??
        undefined
      : undefined;
    return { db: prisma, user, req, res };
  },
});
