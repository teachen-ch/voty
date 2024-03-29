import { users } from "../resolvers";
import {
  stringArg,
  objectType,
  inputObjectType,
  extendType,
  nonNull,
  booleanArg,
  arg,
} from "@nexus/schema";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.model.id();
    t.model.email();
    t.model.name();
    t.model.lastname();
    t.field("shortname", { type: "String", resolve: users.shortname });
    t.model.gender();
    t.model.year();
    t.model.emailVerified();
    t.model.createdAt();
    t.model.image();
    t.nonNull.model.role();
    t.model.locale();
    t.model.campaign();
    t.model.school();
    t.model.team();
    t.model.teaches();
    t.model.ballots();
    t.model.attachments();
    t.model.discussions();
    t.model.reactions();
  },
});

export const ResponseLogin = objectType({
  name: "ResponseLogin",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.string("name"),
      t.string("lastname"),
      t.nonNull.string("email"),
      t.string("password"),
      t.field("role", { type: "Role" }),
      t.string("locale"),
      t.string("campaign"),
      t.string("redirect");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.user();
    t.crud.users({
      ordering: true,
      filtering: true,
    });
    t.field("me", {
      type: "User",
      resolve: async (_root, args, ctx) => users.getUser(ctx),
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        data: nonNull(arg({ type: "UserCreateInput" })),
      },
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
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: users.login,
    });
    t.field("magic", {
      type: "Response",
      args: {
        email: nonNull(stringArg()),
        redirect: stringArg(),
      },
      resolve: users.magic,
    });
    t.field("emailVerification", {
      type: "ResponseLogin",
      args: {
        email: nonNull(stringArg()),
        purpose: nonNull(stringArg()),
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
        email: nonNull(stringArg()),
        password: stringArg(),
        invite: nonNull(stringArg()),
      },
      resolve: users.createInvitedUser,
    });
    t.field("acceptInvite", {
      type: "Team",
      args: {
        invite: nonNull(stringArg()),
        force: booleanArg(),
      },
      resolve: users.acceptInvite,
    });
    t.field("setSchool", {
      type: "User",
      args: {
        school: nonNull(stringArg()),
      },
      resolve: users.setSchool,
    });
    t.field("deleteAccount", {
      type: "Response",
      resolve: users.deleteAccount,
    });
  },
});
