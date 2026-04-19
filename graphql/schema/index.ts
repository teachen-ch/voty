import { builder } from "../builder";

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
import "./crud";

export const schema = builder.toSchema();
