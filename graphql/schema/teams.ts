import { builder } from "../builder";
import { UserType } from "./users";
import { isTeamTeacherOrAdmin, isTeamMemberOrAdmin } from "../auth";

export const TeamType = builder.prismaObject("Team", {
  // Unlisted fields default to loggedIn (matches permissions.ts "*": isUser).
  authScopes: { loggedIn: true },
  fields: (t) => ({
    id: t.exposeID("id", { skipTypeScopes: true }),
    name: t.exposeString("name", { skipTypeScopes: true }),
    invite: t.exposeString("invite", {
      nullable: true,
      skipTypeScopes: true,
      authScopes: isTeamTeacherOrAdmin,
    }),
    code: t.exposeString("code", {
      nullable: true,
      skipTypeScopes: true,
      authScopes: isTeamTeacherOrAdmin,
    }),
    prefs: t.expose("prefs", {
      type: "Json",
      nullable: true,
      skipTypeScopes: true,
    }),
    notes: t.expose("notes", {
      type: "Json",
      nullable: true,
      skipTypeScopes: true,
    }),
    school: t.relation("school", { skipTypeScopes: true }),
    teacher: t.relation("teacher"),
    teacherId: t.exposeString("teacherId", { skipTypeScopes: true }),
    members: t.relation("members", {
      skipTypeScopes: true,
      authScopes: isTeamMemberOrAdmin,
    }),
    ballots: t.relation("ballots"),
    cards: t.exposeString("cards", { skipTypeScopes: true }),
  }),
});

export const InviteResponse = builder
  .objectRef<{
    created?: string[];
    failed?: string[];
    duplicated?: string[];
    team?: unknown;
  }>("InviteResponse")
  .implement({
    fields: (t) => ({
      created: t.stringList({
        nullable: true,
        resolve: (p) => p.created ?? null,
      }),
      failed: t.stringList({ nullable: true, resolve: (p) => p.failed ?? null }),
      duplicated: t.stringList({
        nullable: true,
        resolve: (p) => p.duplicated ?? null,
      }),
      team: t.field({
        type: TeamType,
        nullable: true,
        resolve: (p) => p.team as any,
      }),
    }),
  });

export const ProgressCard = builder
  .objectRef<{ id?: string; done?: unknown[]; due?: unknown[] }>("ProgressCard")
  .implement({
    fields: (t) => ({
      id: t.string({ nullable: true, resolve: (p) => p.id ?? null }),
      done: t.field({
        type: [UserType],
        nullable: true,
        resolve: (p) => (p.done as any) ?? null,
      }),
      due: t.field({
        type: [UserType],
        nullable: true,
        resolve: (p) => (p.due as any) ?? null,
      }),
    }),
  });

export const ProgressStudent = builder
  .objectRef<{
    id?: string;
    email?: string;
    done?: string[];
    due?: string[];
  }>("ProgressStudent")
  .implement({
    fields: (t) => ({
      id: t.string({ nullable: true, resolve: (p) => p.id ?? null }),
      email: t.string({ nullable: true, resolve: (p) => p.email ?? null }),
      done: t.stringList({ nullable: true, resolve: (p) => p.done ?? null }),
      due: t.stringList({ nullable: true, resolve: (p) => p.due ?? null }),
    }),
  });

export const ResponseProgress = builder
  .objectRef<{ cards?: unknown[]; students?: unknown[] }>("ResponseProgress")
  .implement({
    fields: (t) => ({
      cards: t.field({
        type: [ProgressCard],
        nullable: true,
        resolve: (p) => (p.cards as any) ?? null,
      }),
      students: t.field({
        type: [ProgressStudent],
        nullable: true,
        resolve: (p) => (p.students as any) ?? null,
      }),
    }),
  });

import * as teams from "../resolvers/teams";

builder.queryField("progress", (t) =>
  t.field({
    type: ResponseProgress,
    authScopes: { teacher: true },
    args: { teamId: t.arg.string({ required: true }) },
    resolve: (_root, args, ctx, info) =>
      teams.progress(_root, args, ctx, info) as any,
  })
);

builder.mutationField("inviteStudents", (t) =>
  t.field({
    type: InviteResponse,
    authScopes: { teacher: true },
    args: {
      team: t.arg.string({ required: true }),
      emails: t.arg.stringList({ required: true }),
    },
    resolve: (_root, args, ctx, info) =>
      teams.inviteStudents(_root, args, ctx, info) as any,
  })
);

builder.mutationField("setPrefs", (t) =>
  t.prismaField({
    type: "Team",
    authScopes: { teacher: true },
    args: {
      teamId: t.arg.string({ required: true }),
      prefs: t.arg({ type: "Json", required: true }),
    },
    resolve: (_query, _root, args, ctx, info) =>
      teams.setPrefs(_root, args, ctx, info) as any,
  })
);

builder.mutationField("setNotes", (t) =>
  t.prismaField({
    type: "Team",
    authScopes: { teacher: true },
    args: {
      teamId: t.arg.string({ required: true }),
      notes: t.arg({ type: "Json", required: true }),
    },
    resolve: (_query, _root, args, ctx, info) =>
      teams.setNotes(_root, args, ctx, info) as any,
  })
);

// TODO Step 8: CRUD — team, teams, createOneTeam (computed invite/code),
//   deleteOneTeam
