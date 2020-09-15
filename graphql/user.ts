import { schema } from "nexus";
import { users } from "./resolvers";
import { stringArg, intArg } from "nexus/components/schema";

schema.objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.string("email", {
      nullable: true,
      resolve({ email }, args, ctx) {
        return email;
      },
    });
    t.model.name();
    t.model.lastname();
    t.string("shortname", {
      resolve({ name, lastname }, args, ctx) {
        return `${name} ${(lastname || "").substring(0, 1).toUpperCase()}.`;
      },
    });
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
        school: intArg(),
      },
      resolve: async (_root, { school }, ctx) => {
        const user = await users.updateUser(
          _root,
          { school: { connect: { id: school } } },
          ctx
        );
        return user;
      },
    });
  },
});
