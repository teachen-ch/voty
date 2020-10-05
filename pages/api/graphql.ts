// this is the require-style from nexus docs
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV === "development") require("nexus").default.reset();
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require("nexus").default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
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

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  return app.server.handlers.graphql(req, res);
};
