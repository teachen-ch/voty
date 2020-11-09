import { schema } from "nexus";
import { users } from "./resolvers";
import { stringArg } from "nexus/components/schema";
import { upperFirst } from "lodash";

schema.objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.string("email", {
      nullable: true,
      resolve({ email }) {
        return email;
      },
    });
    t.model.name();
    t.model.lastname();
    t.string("shortname", {
      resolve({ name, lastname }) {
        if (!lastname) return name;
        return `${name} ${upperFirst(lastname).substr(0, 1)}.`;
      },
    });
    t.model.gender();
    t.model.year();
    t.model.emailVerified();
    t.model.createdAt();
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
  name: "ResponseLogin",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.crud.user();
    t.crud.users({
      ordering: true,
      filtering: true,
    });

    t.field("me", {
      type: "User",
      nullable: true,
      resolve: async (_root, args, ctx) => users.getUser(ctx),
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUser({
      alias: "createUser",
      resolve: users.createUser,
    });
    t.crud.updateOneUser({
      alias: "updateUser",
      resolve: users.updateUser,
    });
    t.crud.deleteOneUser({
      alias: "deleteUser",
      resolve: users.deleteUser,
    });
    t.field("login", {
      type: "ResponseLogin",
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: users.login,
    });
    t.field("emailVerification", {
      type: "ResponseLogin",
      args: {
        email: stringArg({ required: true }),
        purpose: stringArg({ required: true }),
      },
      resolve: async (_root, args, ctx) =>
        users.sendVerificationEmail(args.email, args.purpose, ctx.db),
    });
    t.field("checkVerification", {
      type: "ResponseLogin",
      args: {
        token: stringArg(),
      },
      resolve: users.checkVerification,
    });
    t.field("changePassword", {
      type: "ResponseLogin",
      args: {
        password: stringArg(),
      },
      resolve: users.changePassword,
    });
    t.field("createInvitedUser", {
      type: "User",
      args: {
        name: stringArg(),
        lastname: stringArg(),
        email: stringArg(),
        password: stringArg(),
        invite: stringArg(),
      },
      resolve: users.createInvitedUser,
    });
    t.field("acceptInvite", {
      type: "Team",
      args: {
        invite: stringArg(),
      },
      resolve: users.acceptInvite,
    });
    t.field("setSchool", {
      type: "User",
      args: {
        school: stringArg({ required: true }),
      },
      resolve: users.setSchool,
    });
    t.field("deleteAccount", {
      type: "Response",
      resolve: users.deleteAccount,
    });
  },
});
