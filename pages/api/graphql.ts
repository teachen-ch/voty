if (process.env.NODE_ENV === "development") require("nexus").default.reset();
import { NextApiRequest, NextApiResponse } from "next";

const app = require("nexus").default;
const settings = require("nexus").settings;

settings.change({
  server: { path: "/api/graphql" },
  logger: { filter: { level: "error" } },
});

settings.change({ server: { corse: false } });

// Require your nexus modules here.
// Do not write them inline, since the Nexus API is typed `any` because of `require` import.
// require('...')
require("../../graphql/schema");
require("../../graphql/user");

app.assemble();

/*type NextApiRequestWithUser = NextApiRequest & {
  user?: User;
};*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //const reqWithUser: NextApiRequestWithUser = req;
  //const user = await getSessionUser(req);
  //reqWithUser.user = user;
  return app.server.handlers.graphql(req, res);
};
