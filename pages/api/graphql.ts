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
  context: ({ req, res }) => ({
    db: prisma,
    user: resolvers.users.getSessionUser(req),
    req,
    res,
  }),
});
