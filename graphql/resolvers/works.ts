import { FieldResolver } from "@nexus/schema";
import { ActivityType, Role, Visibility } from "@prisma/client";
import find from "lodash/find";
import { logActivity } from "./activities";
import { getTeacherTeams } from "./teams";

export const works: FieldResolver<"Query", "works"> = async (
  _root,
  args,
  ctx
) => {
  if (!args.where) return [];
  const user = ctx.user;
  const teams = user ? await getTeacherTeams(user, ctx.db) : [];
  let works = await ctx.db.work.findMany({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    where: args.where,
  });

  // only return public works or works from users's school / class
  works = works.filter((work) => {
    if (user?.role === Role.Admin) return true;
    if (work.visibility === Visibility.Public) return true;
    if (work.visibility === Visibility.School)
      return work.schoolId === user?.schoolId;
    if (work.visibility === Visibility.Team)
      return work.teamId === user?.teamId || teams.indexOf(work.teamId) >= 0;
  });
  return works;
};
export const postWork: FieldResolver<"Mutation", "postWork"> = async (
  _root,
  args,
  ctx
) => {
  let users = args.data.users?.connect;
  const user = ctx.user;
  const teamId = args.data.team.connect?.id;
  const schoolId = args.data.school.connect?.id;

  // ensure user is logged in and part of team or teacher in same school
  if (!user) throw new Error("Error.NoPermission");
  if (!teamId || !schoolId) throw new Error("Error.NoTeamSchool");
  if (user.schoolId !== schoolId) throw new Error("Error.NoPermission");
  if (user.teamId !== teamId && user.role === Role.Student)
    throw new Error("Error.NoPermission");

  if (!users) users = [{ id: user.id }];

  // the posting user always needs to be in works.users (traceability)
  if (!find(users, (u) => u.id === user.id)) {
    users.unshift({ id: user.id });
  }

  const work = await ctx.db.work.create({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    data: args.data,
  });

  await logActivity(ctx, {
    card: args.data.card,
    work: { connect: { id: work.id } },
    user: { connect: { id: user.id } },
    team: { connect: { id: teamId } },
    summary: work.title || work.text,
    school: { connect: { id: String(user.schoolId) } },
    visibility: args.data.visibility || Visibility.Team,
    type: ActivityType.Work,
  });
  return work;
};

export const deleteWork: FieldResolver<"Mutation", "deleteWork"> = async (
  _root,
  args,
  ctx
) => {
  const id = String(args.where?.id);
  const user = ctx.user;

  const work = await ctx.db.work.findFirst({
    where: { id },
    include: { users: true, team: true },
  });

  if (!work) throw new Error("Error.NotFound");
  if (!user) throw new Error("Error.NoPermission");

  if (user.role === Role.Student && !find(work.users, { id: user.id }))
    throw new Error("Error.NoPermission");
  if (user.role === Role.Teacher && user.id !== work.team.teacherId)
    throw new Error("Error.NoPermission");

  const deleted = await ctx.db.work.delete({ where: { id } });
  return deleted;
};
