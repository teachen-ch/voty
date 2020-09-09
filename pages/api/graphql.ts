if (process.env.NODE_ENV === "development") require("nexus").default.reset();
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../util/authentication";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await getSession(req);
  // console.log("User: ", req.headers["x-user-id"], req.headers["x-user-role"]);
  return app.server.handlers.graphql(req, res);
};
