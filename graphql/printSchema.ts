import { printSchema, lexicographicSortSchema } from "graphql";
import { builder } from "./builder";

// Register all object types with the shared builder.
import "./schema/activities";
import "./schema/attachments";
import "./schema/ballots";
import "./schema/cards";
import "./schema/discussions";
import "./schema/schools";
import "./schema/stats";
import "./schema/swissvotes";
import "./schema/teams";
import "./schema/users";
import "./schema/votes";
import "./schema/works";
import "./schema/crud";

import { writeFileSync } from "fs";

const schema = builder.toSchema();
const sdl = printSchema(lexicographicSortSchema(schema));
writeFileSync("graphql/api.graphql", sdl);
process.stdout.write(`Wrote ${sdl.length} bytes to graphql/api.graphql\n`);
