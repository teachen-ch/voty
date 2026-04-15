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

const schema = builder.toSchema();
process.stdout.write(printSchema(lexicographicSortSchema(schema)));
