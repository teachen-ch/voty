import { builder, RoleEnum, GenderEnum } from "../builder";
// getShortname is imported directly (no MDX/content dependency in users.ts).
import { getShortname } from "../resolvers/users";

export const UserType = builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email", { nullable: true }),
    name: t.exposeString("name", { nullable: true }),
    lastname: t.exposeString("lastname", { nullable: true }),
    shortname: t.string({
      nullable: true,
      resolve: (parent) => getShortname(parent as any),
    }),
    gender: t.field({
      type: GenderEnum,
      nullable: true,
      resolve: (parent) => parent.gender,
    }),
    year: t.exposeInt("year", { nullable: true }),
    emailVerified: t.expose("emailVerified", {
      type: "DateTime",
      nullable: true,
    }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    image: t.exposeString("image", { nullable: true }),
    role: t.field({
      type: RoleEnum,
      resolve: (parent) => parent.role,
    }),
    locale: t.exposeString("locale"),
    campaign: t.exposeString("campaign", { nullable: true }),
    school: t.relation("school", { nullable: true }),
    team: t.relation("team", { nullable: true }),
    teaches: t.relation("teaches"),
    ballots: t.relation("ballots"),
    attachments: t.relation("attachments"),
    discussions: t.relation("discussions"),
    reactions: t.relation("reactions"),
  }),
});

export const ResponseLogin = builder
  .objectRef<{ token?: string | null; user?: unknown }>("ResponseLogin")
  .implement({
    fields: (t) => ({
      token: t.string({ nullable: true, resolve: (p) => p.token ?? null }),
      user: t.field({
        type: UserType,
        nullable: true,
        resolve: (p) => p.user as any,
      }),
    }),
  });

import * as users from "../resolvers/users";
import { Response } from "./votes";

const UserCreateInput = builder.inputType("UserCreateInput", {
  fields: (t) => ({
    name: t.string(),
    lastname: t.string(),
    email: t.string({ required: true }),
    password: t.string(),
    role: t.field({ type: RoleEnum }),
    locale: t.string(),
    campaign: t.string(),
    redirect: t.string(),
  }),
});

builder.queryField("me", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    resolve: (_query, _root, _args, ctx) => users.getUser(ctx) as any,
  })
);

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    args: { data: t.arg({ type: UserCreateInput, required: true }) },
    resolve: (_query, _root, args, ctx, info) =>
      users.createUser(_root, args, ctx, info) as any,
  })
);

builder.mutationField("login", (t) =>
  t.field({
    type: ResponseLogin,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: (_root, args, ctx, info) =>
      users.login(_root, args, ctx, info) as any,
  })
);

builder.mutationField("magic", (t) =>
  t.field({
    type: Response,
    args: {
      email: t.arg.string({ required: true }),
      redirect: t.arg.string(),
    },
    resolve: (_root, args, ctx, info) =>
      users.magic(_root, args, ctx, info) as any,
  })
);

builder.mutationField("emailVerification", (t) =>
  t.field({
    type: ResponseLogin,
    args: {
      email: t.arg.string({ required: true }),
      purpose: t.arg.string({ required: true }),
    },
    resolve: (_root, args, ctx) =>
      users.sendVerificationEmail(args.email, args.purpose, ctx.db) as any,
  })
);

builder.mutationField("checkVerification", (t) =>
  t.field({
    type: ResponseLogin,
    args: { token: t.arg.string() },
    resolve: (_root, args, ctx, info) =>
      users.checkVerification(_root, args, ctx, info) as any,
  })
);

builder.mutationField("changePassword", (t) =>
  t.field({
    type: ResponseLogin,
    args: { password: t.arg.string() },
    resolve: (_root, args, ctx, info) =>
      users.changePassword(_root, args, ctx, info) as any,
  })
);

builder.mutationField("createInvitedUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string(),
      lastname: t.arg.string(),
      email: t.arg.string({ required: true }),
      password: t.arg.string(),
      invite: t.arg.string({ required: true }),
    },
    resolve: (_query, _root, args, ctx, info) =>
      users.createInvitedUser(_root, args, ctx, info) as any,
  })
);

builder.mutationField("acceptInvite", (t) =>
  t.prismaField({
    type: "Team",
    args: {
      invite: t.arg.string({ required: true }),
      force: t.arg.boolean(),
    },
    resolve: (_query, _root, args, ctx, info) =>
      users.acceptInvite(_root, args, ctx, info) as any,
  })
);

builder.mutationField("setSchool", (t) =>
  t.prismaField({
    type: "User",
    args: { school: t.arg.string({ required: true }) },
    resolve: (_query, _root, args, ctx, info) =>
      users.setSchool(_root, args, ctx, info) as any,
  })
);

builder.mutationField("deleteAccount", (t) =>
  t.field({
    type: Response,
    resolve: (_root, args, ctx, info) =>
      users.deleteAccount(_root, args, ctx, info) as any,
  })
);

// TODO Step 8: CRUD — user (findUnique), users (findMany + ordering + filtering)
//   updateUser, deleteUser, createOneSchool, etc.
