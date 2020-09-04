import { schema } from "nexus";
import {
  createUser,
  getUser,
  login,
  sendVerificationEmail,
  checkVerification,
  changePassword,
} from "../util/authentication";
import { stringArg } from "nexus/components/schema";

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
        return `${name} ${lastname.substring(0, 1).toUpperCase()}.`;
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
    t.string("error");
    t.field("user", { type: "User" });
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
      resolve: async (_root, args, ctx) => {
        // TODO: only if we add req.user we can check it in permissions.ts
        try {
          console.log("Start");
          const { token, user } = await login(
            args.email,
            args.password,
            ctx.db
          );
          console.log("mor", token, user);
          // @ts-ignore
          ctx.req.user = user;
          return { token, user };
        } catch (error) {
          console.log("som err: ", error);
          throw error;
        }
      },
    });
    t.field("emailVerification", {
      type: "ResponseLogin",
      args: {
        email: stringArg(),
        purpose: stringArg(),
      },
      resolve: async (_root, args, ctx) =>
        sendVerificationEmail(args.email, args.purpose, ctx.db),
    });
    t.field("checkVerification", {
      type: "ResponseLogin",
      args: {
        token: stringArg(),
      },
      resolve: async (_root, args, ctx) =>
        checkVerification(args.token, ctx.db),
    });
    t.field("changePassword", {
      type: "ResponseLogin",
      args: {
        password: stringArg(),
      },
      resolve: async (_root, args, ctx) =>
        changePassword(args.password, ctx.req, ctx.db),
    });
  },
});
