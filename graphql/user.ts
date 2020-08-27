import { schema } from "nexus";
import { createUser, getUser, login } from "../util/authentication";
import { stringArg } from "nexus/components/schema";

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

schema.extendType({
  type: "Query",
  definition(t) {
    t.crud.user();
    t.crud.users();

    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (_root, args, ctx) => getUser(ctx.req, ctx.db),
    });
  },
});

schema.extendType({
  type: "Mutation",
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
