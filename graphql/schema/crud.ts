// Step 8 — auto-CRUD ops + handcrafted input types.
// Inputs are deliberately narrow: only the fields the client actually
// references in `gql`-tagged operations across pages/components.

import { randomBytes } from "crypto";
import random from "lodash/random";
import { Prisma } from "@prisma/client";
import { builder, RoleEnum, BallotScopeEnum, GenderEnum } from "../builder";
import { UserType } from "./users";
import { TeamType } from "./teams";
import { SchoolType } from "./schools";
import { BallotType } from "./ballots";
import { WorkType } from "./works";
import { ActivityType as ActivityT } from "./activities";
import { AttachmentType } from "./attachments";
import { canReadUser, canUpdateUser } from "../auth";

// ---------- shared filter scaffolding ----------

const SortOrderEnum = builder.enumType("SortOrder", {
  values: ["asc", "desc"] as const,
});

const StringFilter = builder.inputType("StringFilter", {
  fields: (t) => ({
    equals: t.string(),
    contains: t.string(),
    in: t.stringList(),
    notIn: t.stringList(),
  }),
});

const IntFilter = builder.inputType("IntFilter", {
  fields: (t) => ({
    equals: t.int(),
    gt: t.int(),
    gte: t.int(),
    lt: t.int(),
    lte: t.int(),
  }),
});

const DateTimeFilter = builder.inputType("DateTimeFilter", {
  fields: (t) => ({
    equals: t.field({ type: "DateTime" }),
    gt: t.field({ type: "DateTime" }),
    gte: t.field({ type: "DateTime" }),
    lt: t.field({ type: "DateTime" }),
    lte: t.field({ type: "DateTime" }),
  }),
});

const RoleFilter = builder.inputType("RoleFilter", {
  fields: (t) => ({ equals: t.field({ type: RoleEnum }) }),
});

const BallotScopeFilter = builder.inputType("BallotScopeFilter", {
  fields: (t) => ({ equals: t.field({ type: BallotScopeEnum }) }),
});

const StringSet = builder.inputType("StringFieldUpdateOperationsInput", {
  fields: (t) => ({ set: t.string() }),
});

const IntSet = builder.inputType("IntFieldUpdateOperationsInput", {
  fields: (t) => ({ set: t.int() }),
});

const GenderSet = builder.inputType("EnumGenderFieldUpdateOperationsInput", {
  fields: (t) => ({ set: t.field({ type: GenderEnum }) }),
});

const ConnectById = builder.inputType("WhereByIdInput", {
  fields: (t) => ({ id: t.string({ required: true }) }),
});

const ConnectInput = builder.inputType("UserSchoolUpdateInput", {
  fields: (t) => ({ connect: t.field({ type: ConnectById }) }),
});

// ---------- USER ----------

const UserWhereUniqueInput = builder.inputType("UserWhereUniqueInput", {
  fields: (t) => ({
    id: t.string(),
    email: t.string(),
  }),
});

const UserWhereInput = builder.inputType("UserWhereInput", {
  fields: (t) => ({
    id: t.field({ type: StringFilter }),
    email: t.field({ type: StringFilter }),
    role: t.field({ type: RoleFilter }),
    schoolId: t.field({ type: StringFilter }),
    teamId: t.field({ type: StringFilter }),
    name: t.field({ type: StringFilter }),
    lastname: t.field({ type: StringFilter }),
  }),
});

const UserOrderByInput = builder.inputType("UserOrderByInput", {
  fields: (t) => ({
    createdAt: t.field({ type: SortOrderEnum }),
    email: t.field({ type: SortOrderEnum }),
    name: t.field({ type: SortOrderEnum }),
    lastname: t.field({ type: SortOrderEnum }),
    year: t.field({ type: SortOrderEnum }),
    role: t.field({ type: SortOrderEnum }),
  }),
});

const UserUpdateInput = builder.inputType("UserUpdateInput", {
  fields: (t) => ({
    name: t.field({ type: StringSet }),
    lastname: t.field({ type: StringSet }),
    email: t.field({ type: StringSet }),
    gender: t.field({ type: GenderSet }),
    year: t.field({ type: IntSet }),
    role: t.field({ type: builder.inputType("EnumRoleFieldUpdateOperationsInput", {
      fields: (tt) => ({ set: tt.field({ type: RoleEnum }) }),
    }) }),
    school: t.field({ type: ConnectInput }),
  }),
});

builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    nullable: true,
    authScopes: canReadUser,
    args: { where: t.arg({ type: UserWhereUniqueInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.user.findUnique({ ...query, where: args.where as any }),
  })
);

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    authScopes: { teacher: true },
    args: {
      where: t.arg({ type: UserWhereInput }),
      orderBy: t.arg({ type: [UserOrderByInput] }),
      first: t.arg.int(),
      last: t.arg.int(),
    },
    resolve: (query, _root, args, ctx) =>
      ctx.db.user.findMany({
        ...query,
        where: (args.where as any) ?? undefined,
        orderBy: (args.orderBy as any) ?? undefined,
        take: args.first ?? args.last ?? undefined,
      }),
  })
);

builder.mutationField("updateUser", (t) =>
  t.prismaField({
    type: "User",
    authScopes: canUpdateUser,
    args: {
      data: t.arg({ type: UserUpdateInput, required: true }),
      where: t.arg({ type: UserWhereUniqueInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, info) => {
      const { users } = await import("../resolvers");
      return users.updateUser(_root, args, ctx, info) as any;
    },
  })
);

builder.mutationField("deleteUser", (t) =>
  t.prismaField({
    type: "User",
    authScopes: { teacher: true },
    args: { where: t.arg({ type: UserWhereUniqueInput, required: true }) },
    resolve: async (_query, _root, args, ctx, info) => {
      const { users } = await import("../resolvers");
      return users.deleteUser(_root, args, ctx, info) as any;
    },
  })
);

// ---------- SCHOOL ----------

const SchoolWhereUniqueInput = builder.inputType("SchoolWhereUniqueInput", {
  fields: (t) => ({ id: t.string() }),
});

const SchoolWhereInput = builder.inputType("SchoolWhereInput", {
  fields: (t) => ({
    id: t.field({ type: StringFilter }),
    name: t.field({ type: StringFilter }),
    canton: t.field({ type: StringFilter }),
  }),
});

const SchoolCreateInput = builder.inputType("SchoolCreateInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    type: t.string(),
    address: t.string(),
    zip: t.string(),
    city: t.string(),
    canton: t.string(),
  }),
});

builder.queryField("school", (t) =>
  t.prismaField({
    type: "School",
    nullable: true,
    args: { where: t.arg({ type: SchoolWhereUniqueInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.school.findUnique({ ...query, where: args.where as any }),
  })
);

builder.queryField("schools", (t) =>
  t.prismaField({
    type: ["School"],
    authScopes: { loggedIn: true },
    args: { where: t.arg({ type: SchoolWhereInput }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.school.findMany({
        ...query,
        where: (args.where as any) ?? undefined,
      }),
  })
);

builder.mutationField("createOneSchool", (t) =>
  t.prismaField({
    type: "School",
    authScopes: { teacher: true },
    args: { data: t.arg({ type: SchoolCreateInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.school.create({ ...query, data: args.data as any }),
  })
);

builder.mutationField("deleteOneSchool", (t) =>
  t.prismaField({
    type: "School",
    authScopes: { admin: true },
    args: { where: t.arg({ type: SchoolWhereUniqueInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.school.delete({ ...query, where: args.where as any }),
  })
);

// ---------- TEAM ----------

const TeamWhereUniqueInput = builder.inputType("TeamWhereUniqueInput", {
  fields: (t) => ({
    id: t.string(),
    invite: t.string(),
    code: t.string(),
  }),
});

const SimpleIdRelationFilter = builder.inputType("IdRelationFilter", {
  fields: (t) => ({
    id: t.field({ type: StringFilter }),
  }),
});

const TeamWhereInput = builder.inputType("TeamWhereInput", {
  fields: (t) => ({
    id: t.field({ type: StringFilter }),
    name: t.field({ type: StringFilter }),
    teacherId: t.field({ type: StringFilter }),
    schoolId: t.field({ type: StringFilter }),
    teacher: t.field({ type: SimpleIdRelationFilter }),
  }),
});

const TeamOrderByInput = builder.inputType("TeamOrderByInput", {
  fields: (t) => ({
    createdAt: t.field({ type: SortOrderEnum }),
    name: t.field({ type: SortOrderEnum }),
  }),
});

const TeamCreateInput = builder.inputType("TeamCreateInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    school: t.field({ type: ConnectInput, required: true }),
    teacher: t.field({ type: ConnectInput, required: true }),
  }),
});

builder.queryField("team", (t) =>
  t.prismaField({
    type: "Team",
    nullable: true,
    args: { where: t.arg({ type: TeamWhereUniqueInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.team.findUnique({ ...query, where: args.where as any }),
  })
);

builder.queryField("teams", (t) =>
  t.prismaField({
    type: ["Team"],
    authScopes: { loggedIn: true },
    args: {
      where: t.arg({ type: TeamWhereInput }),
      orderBy: t.arg({ type: [TeamOrderByInput] }),
    },
    resolve: (query, _root, args, ctx) =>
      ctx.db.team.findMany({
        ...query,
        where: (args.where as any) ?? undefined,
        orderBy: (args.orderBy as any) ?? undefined,
      }),
  })
);

builder.mutationField("createOneTeam", (t) =>
  t.prismaField({
    type: "Team",
    authScopes: { teacher: true },
    args: { data: t.arg({ type: TeamCreateInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.team.create({
        ...query,
        data: {
          ...(args.data as any),
          invite: randomBytes(6).toString("hex"),
          code: String(random(10 ** 7, 10 ** 8 - 1)),
        },
      }),
  })
);

builder.mutationField("deleteOneTeam", (t) =>
  t.prismaField({
    type: "Team",
    authScopes: { teacher: true },
    args: { where: t.arg({ type: TeamWhereUniqueInput, required: true }) },
    resolve: async (_query, _root, args, ctx, info) => {
      const { teams } = await import("../resolvers");
      return (teams as any).deleteOneTeam(_root, args, ctx, info);
    },
  })
);

// ---------- BALLOT ----------

const BallotWhereUniqueInput = builder.inputType("BallotWhereUniqueInput", {
  fields: (t) => ({ id: t.string() }),
});

const BallotRunRelationFilter = builder.inputType("BallotRunRelationFilter", {
  fields: (t) => ({
    some: t.field({ type: builder.inputType("BallotRunWhereInput", {
      fields: (tt) => ({
        teamId: tt.field({ type: StringFilter }),
        ballotId: tt.field({ type: StringFilter }),
      }),
    }) }),
  }),
});

const BallotWhereInput = builder.inputType("BallotWhereInput", {
  fields: (t) => ({
    id: t.field({ type: StringFilter }),
    scope: t.field({ type: BallotScopeFilter }),
    schoolId: t.field({ type: StringFilter }),
    teamId: t.field({ type: StringFilter }),
    canton: t.field({ type: StringFilter }),
    ballotRuns: t.field({ type: BallotRunRelationFilter }),
  }),
});

const BallotCreateInput = builder.inputType("BallotCreateInput", {
  fields: (t) => ({
    title: t.string(),
    description: t.string(),
    body: t.string(),
    titlede: t.string(),
    descriptionde: t.string(),
    bodyde: t.string(),
    titlefr: t.string(),
    descriptionfr: t.string(),
    bodyfr: t.string(),
    titleit: t.string(),
    descriptionit: t.string(),
    bodyit: t.string(),
    originalLocale: t.string(),
    start: t.field({ type: "DateTime" }),
    end: t.field({ type: "DateTime" }),
    scope: t.field({ type: BallotScopeEnum }),
    canton: t.string(),
  }),
});

const BallotUpdateInput = builder.inputType("BallotUpdateInput", {
  fields: (t) => ({
    title: t.field({ type: StringSet }),
    description: t.field({ type: StringSet }),
    body: t.field({ type: StringSet }),
    titlede: t.field({ type: StringSet }),
    descriptionde: t.field({ type: StringSet }),
    bodyde: t.field({ type: StringSet }),
    titlefr: t.field({ type: StringSet }),
    descriptionfr: t.field({ type: StringSet }),
    bodyfr: t.field({ type: StringSet }),
    titleit: t.field({ type: StringSet }),
    descriptionit: t.field({ type: StringSet }),
    bodyit: t.field({ type: StringSet }),
    canton: t.field({ type: StringSet }),
    start: t.field({ type: builder.inputType("DateTimeFieldUpdateOperationsInput", {
      fields: (tt) => ({ set: tt.field({ type: "DateTime" }) }),
    }) }),
    end: t.field({ type: builder.inputType("DateTimeFieldUpdateOperationsInput2", {
      fields: (tt) => ({ set: tt.field({ type: "DateTime" }) }),
    }) }),
  }),
});

async function ballotLocale(ctx: any, b: any) {
  if (!b) return b;
  const { ballots } = await import("../resolvers");
  const locale = ctx.req?.headers?.["accept-language"];
  ballots.replaceLocale(b, locale);
  return b;
}

builder.queryField("ballot", (t) =>
  t.prismaField({
    type: "Ballot",
    nullable: true,
    args: { where: t.arg({ type: BallotWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, ctx) => {
      const b = await ctx.db.ballot.findUnique({
        ...query,
        where: args.where as any,
      });
      return ballotLocale(ctx, b);
    },
  })
);

builder.queryField("ballots", (t) =>
  t.prismaField({
    type: ["Ballot"],
    args: { where: t.arg({ type: BallotWhereInput }) },
    resolve: async (query, _root, args, ctx) => {
      const list = await ctx.db.ballot.findMany({
        ...query,
        where: (args.where as any) ?? undefined,
      });
      for (const b of list) await ballotLocale(ctx, b);
      return list;
    },
  })
);

builder.mutationField("createOneBallot", (t) =>
  t.prismaField({
    type: "Ballot",
    authScopes: { admin: true },
    args: { data: t.arg({ type: BallotCreateInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.ballot.create({
        ...query,
        data: {
          ...(args.data as any),
          start: args.data.start ?? new Date(),
          end: args.data.end ?? new Date(),
        },
      }),
  })
);

builder.mutationField("updateOneBallot", (t) =>
  t.prismaField({
    type: "Ballot",
    authScopes: { admin: true },
    args: {
      data: t.arg({ type: BallotUpdateInput, required: true }),
      where: t.arg({ type: BallotWhereUniqueInput, required: true }),
    },
    resolve: (query, _root, args, ctx) =>
      ctx.db.ballot.update({
        ...query,
        where: args.where as any,
        data: args.data as any,
      }),
  })
);

builder.mutationField("deleteOneBallot", (t) =>
  t.prismaField({
    type: "Ballot",
    authScopes: { admin: true },
    args: { where: t.arg({ type: BallotWhereUniqueInput, required: true }) },
    resolve: (query, _root, args, ctx) =>
      ctx.db.ballot.delete({ ...query, where: args.where as any }),
  })
);

// ---------- ACTIVITY ----------

const ActivityWhereInput = builder.inputType("ActivityWhereInput", {
  fields: (t) => ({
    id: t.field({ type: IntFilter }),
    teamId: t.field({ type: StringFilter }),
    schoolId: t.field({ type: StringFilter }),
    userId: t.field({ type: StringFilter }),
    card: t.field({ type: StringFilter }),
    ballotId: t.field({ type: StringFilter }),
    workId: t.field({ type: StringFilter }),
    ballot: t.field({ type: SimpleIdRelationFilter }),
    type: t.field({ type: builder.inputType("ActivityTypeFilter", {
      fields: (tt) => ({ equals: tt.field({ type: "ActivityType" as any }) }),
    }) }),
    time: t.field({ type: DateTimeFilter }),
  }),
});

const ActivityOrderByInput = builder.inputType("ActivityOrderByInput", {
  fields: (t) => ({
    time: t.field({ type: SortOrderEnum }),
    id: t.field({ type: SortOrderEnum }),
  }),
});

builder.queryField("activities", (t) =>
  t.prismaField({
    type: [ActivityT],
    authScopes: { loggedIn: true },
    args: {
      where: t.arg({ type: ActivityWhereInput }),
      orderBy: t.arg({ type: [ActivityOrderByInput] }),
      first: t.arg.int(),
      last: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx, info) => {
      const { activities } = await import("../resolvers");
      const cargs = {
        where: args.where ?? undefined,
        orderBy: args.orderBy ?? undefined,
        first: args.first ?? undefined,
        last: args.last ?? undefined,
      };
      return (activities as any).activities(_root, cargs, ctx, info);
    },
  })
);

const ActivityCreateInput = builder.inputType("ActivityCreateInput", {
  fields: (t) => ({
    type: t.field({ type: "ActivityType" as any, required: true }),
    visibility: t.field({ type: "Visibility" as any, required: true }),
    card: t.string(),
    summary: t.string(),
    user: t.field({ type: ConnectInput, required: true }),
    team: t.field({ type: ConnectInput, required: true }),
    school: t.field({ type: ConnectInput, required: true }),
  }),
});

builder.mutationField("postActivity", (t) =>
  t.prismaField({
    type: ActivityT,
    authScopes: { loggedIn: true },
    args: { data: t.arg({ type: ActivityCreateInput, required: true }) },
    resolve: async (_query, _root, args, ctx, info) => {
      const { activities } = await import("../resolvers");
      return (activities as any).postActivity(_root, args, ctx, info);
    },
  })
);

// ---------- ATTACHMENT ----------

const AttachmentWhereInput = builder.inputType("AttachmentWhereInput", {
  fields: (t) => ({
    id: t.field({ type: StringFilter }),
    card: t.field({ type: StringFilter }),
    teamId: t.field({ type: StringFilter }),
    userId: t.field({ type: StringFilter }),
    discussionId: t.field({ type: StringFilter }),
    workId: t.field({ type: StringFilter }),
  }),
});

builder.queryField("attachments", (t) =>
  t.prismaField({
    type: [AttachmentType],
    authScopes: { loggedIn: true },
    args: { where: t.arg({ type: AttachmentWhereInput }) },
    resolve: async (_query, _root, args, ctx, info) => {
      const { attachments } = await import("../resolvers");
      return (attachments as any).attachments(_root, args, ctx, info);
    },
  })
);

// ---------- WORK ----------

const WorkWhereUniqueInput = builder.inputType("WorkWhereUniqueInput", {
  fields: (t) => ({ id: t.string() }),
});

const VisibilityFilter = builder.inputType("VisibilityFilter", {
  fields: (t) => ({ equals: t.field({ type: "Visibility" as any }) }),
});

const WorkWhereInput = builder.inputType("WorkWhereInput", {
  fields: (t) => ({
    id: t.field({ type: StringFilter }),
    card: t.field({ type: StringFilter }),
    teamId: t.field({ type: StringFilter }),
    schoolId: t.field({ type: StringFilter }),
    visibility: t.field({ type: VisibilityFilter }),
  }),
});

const WorkCreateInput = builder.inputType("WorkCreateInput", {
  fields: (t) => ({
    title: t.string(),
    text: t.string(),
    card: t.string(),
    data: t.field({ type: "Json" }),
    visibility: t.field({ type: "Visibility" as any }),
    users: t.field({ type: builder.inputType("UserConnectListInput", {
      fields: (tt) => ({ connect: tt.field({ type: [UserWhereUniqueInput] }) }),
    }) }),
    team: t.field({ type: ConnectInput }),
    school: t.field({ type: ConnectInput }),
  }),
});

builder.queryField("works", (t) =>
  t.prismaField({
    type: [WorkType],
    authScopes: { loggedIn: true },
    args: { where: t.arg({ type: WorkWhereInput }) },
    resolve: async (_query, _root, args, ctx, info) => {
      const { works } = await import("../resolvers");
      return (works as any).works(_root, args, ctx, info);
    },
  })
);

builder.mutationField("postWork", (t) =>
  t.prismaField({
    type: WorkType,
    authScopes: { loggedIn: true },
    args: { data: t.arg({ type: WorkCreateInput, required: true }) },
    resolve: async (_query, _root, args, ctx, info) => {
      const { works } = await import("../resolvers");
      return (works as any).postWork(_root, args, ctx, info);
    },
  })
);

builder.mutationField("deleteWork", (t) =>
  t.prismaField({
    type: WorkType,
    authScopes: { loggedIn: true },
    args: { where: t.arg({ type: WorkWhereUniqueInput, required: true }) },
    resolve: async (_query, _root, args, ctx, info) => {
      const { works } = await import("../resolvers");
      return (works as any).deleteWork(_root, args, ctx, info);
    },
  })
);

void Prisma;
void UserType;
void TeamType;
void SchoolType;
void BallotType;
