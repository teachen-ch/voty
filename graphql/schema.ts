import { schema, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import { rule } from "nexus-plugin-shield";
import { permissions } from "./permissions";
import { createUser, getUser, login } from "../util/authentication";
import { stringArg } from "nexus/components/schema";

use(
  prisma({
    features: {
      crud: true,
    },
  })
);

use(permissions);

schema.objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.lastname();
    t.model.gender();
    t.model.image();
    t.model.role();
    t.model.school();
    t.model.team();
    t.model.teaches();
    t.model.ballots();
    t.model.attachments();
    t.model.threads();
    t.model.reactions();
  },
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

schema.objectType({
  name: "MinUser",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("lastname");
    t.string("gender");
  },
});
schema.objectType({
  name: "ResponseLogin",
  definition(t) {
    t.string("token");

    t.field("user", { type: "MinUser" });
  },
});

schema.queryType({
  definition(t) {
    t.crud.school();
    t.crud.schools({
      ordering: true,
      filtering: true,
    });
    t.crud.user();
    t.crud.users();

    t.crud.team();
    t.crud.teams();

    t.crud.ballot();
    t.crud.ballots();

    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (_root, args, ctx) => getUser(ctx.req, ctx.db),
    });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneUser({
      alias: "createUser",
      resolve: async (_root, args, ctx) => {
        return createUser(args.data, ctx.db);
      },
    });
    t.field("login", {
      type: "ResponseLogin",
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_root, args, ctx) =>
        login(args.email, args.password, ctx.db),
    });
    t.crud.createOneSchool();
    t.crud.deleteOneSchool();
  },
});
