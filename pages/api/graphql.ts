import { schema } from "../../graphql/makeschema";
import { ApolloServer } from "apollo-server-micro";
import resolvers from "../../graphql/resolvers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  schema: schema,
  context: (req: Request) => {
    return {
      user: resolvers.users.getSessionUser(req),
    };
  },
});
const handler = server.createHandler({ path: "/api/graphql" });

export default handler;
