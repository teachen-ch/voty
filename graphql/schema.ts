import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { permissions } from "./permissions";
import { randomBytes } from "crypto";
import { getSessionUser } from "util/authentication";

use(
  prisma({
    features: {
      crud: true,
    },
  })
);

use(permissions);

schema.addToContext(async ({ req, res }) => {
  return {
    user: getSessionUser(req as any),
  };
});

schema.objectType({
  name: "School",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.teams();
    t.model.members();
    t.model.address();
    t.model.city();
    t.model.zip();
    t.model.canton();
  },
});

schema.objectType({
  name: "Team",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.invite();
    t.model.domain();
    t.model.school();
    t.model.teacher();
    t.model.members();
    t.model.ballots();
  },
});

schema.objectType({
  name: "Thread",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.text();
    t.model.user();
    t.model.parent();
    t.model.children();
    t.model.reactions();
    t.model.attachments();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: "Reaction",
  definition(t) {
    t.model.id();
    t.model.emoij();
    t.model.user();
    t.model.thread();
  },
});

schema.objectType({
  name: "Domain",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.approved();
    t.model.schools();
  },
});

schema.objectType({
  name: "Ballot",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.start();
    t.model.end();
    t.model.scope();
    t.model.canton();
    t.model.school();
    t.model.creator();

    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.objectType({
  name: "Attachment",
  definition(t) {
    t.model.id();
    t.model.file();
    t.model.user();

    t.model.createdAt();
    t.model.updatedAt();
  },
});

schema.queryType({
  definition(t) {
    t.crud.school();
    t.crud.schools({
      ordering: true,
      filtering: true,
    });
    t.crud.team();
    t.crud.teams({
      ordering: true,
      filtering: true,
    });

    t.crud.ballot();
    t.crud.ballots({
      ordering: true,
      filtering: true,
    });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneSchool();
    t.crud.deleteOneSchool();
    t.crud.createOneTeam({
      computedInputs: {
        invite: () => randomBytes(6).toString("hex"),
      },
    });
    t.crud.deleteOneTeam();
  },
});
