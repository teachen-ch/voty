import { schema } from "../../graphql/makeschema";
import { ApolloServer } from "apollo-server-micro";
import resolvers from "../../graphql/resolvers";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient(/* { log: ["query"] } */);

const server = new ApolloServer({
  schema,
  context: ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {
    return {
      user: resolvers.users.getSessionUser(req),
      db: prisma,
      req: req,
      res: res,
    };
  },
  engine: {
    reportSchema: false,
    apiKey: undefined,
  },
});

export default server.createHandler({
  path: "/api/graphql",
});
