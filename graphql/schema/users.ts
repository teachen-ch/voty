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

// TODO Step 7: port queryField/mutationField for:
//   - me, createUser, updateUser, deleteUser, login, magic
//   - emailVerification, checkVerification, changePassword
//   - createInvitedUser, acceptInvite, setSchool, deleteAccount
//
// TODO Step 8: CRUD — user (findUnique), users (findMany + ordering + filtering)
