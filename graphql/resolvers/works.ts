import { FieldResolver } from "@nexus/schema";
import { ActivityType, Role, Visibility } from "@prisma/client";
import { find } from "lodash";
import { logActivity } from "./activities";

export const works: FieldResolver<"Query", "works"> = async (
  _root,
  args,
  ctx
) => {
  if (!args.where) return [];
  const works = await ctx.db.work.findMany({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    where: args.where,
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
    work: { connect: { id: work.id } },
    user: { connect: { id: user.id } },
    team: { connect: { id: teamId } },
    school: { connect: { id: String(user.schoolId) } },
    visibility: args.data.visibility || Visibility.Team,
    type: ActivityType.Work,
  });
  return work;
};
