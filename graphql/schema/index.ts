import { builder } from "../builder";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "../permissions";

// Importing each module registers its types with the shared builder.
import "./activities";
import "./attachments";
import "./ballots";
import "./cards";
import "./discussions";
import "./schools";
import "./stats";
import "./swissvotes";
import "./teams";
import "./users";
import "./votes";
import "./works";

export const schema = applyMiddleware(builder.toSchema(), permissions);
