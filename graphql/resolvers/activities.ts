import { FieldResolver } from "@nexus/schema";
import { Activity, Prisma, Role } from "@prisma/client";
import { Context } from "graphql/context";
import { truncate } from "lodash";
import { getTeacherTeams } from "./teams";

const MAX_SUMMARY = 30;

export const activities: FieldResolver<"Query", "activities"> = async (
  _root,
  args,
  ctx
) => {
  const { where, orderBy, first } = args;
  const user = ctx.user;
  if (!user) throw new Error("Error.NoPermission");
  const teams = await getTeacherTeams(user, ctx.db);

  let activities = await ctx.db.activity.findMany({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    where,
    // @ts-ignore
    orderBy,
    take: first || 10,
  });

  // only return activities from own team
  activities = activities.filter(
    (act) => act.teamId === user.teamId || teams.indexOf(act.teamId) >= 0
  );
  return activities;
};

export const postActivity: FieldResolver<"Mutation", "logActivity"> = async (
  _root,
  args,
  ctx
) => {
  // eslint-disable-next-line
  const data = args.data;
  return logActivity(ctx, data);
};

export async function logActivity(
  ctx: Context,
  data: Prisma.ActivityCreateInput
): Promise<Activity> {
  const user = ctx.user;
  const teamId = data.team.connect?.id;
  const schoolId = data.school.connect?.id;
  data.summary = data.summary
    ? truncate(data.summary, { length: MAX_SUMMARY, separator: " " })
    : undefined;

  // ensure user is logged in and part of team or teacher in same school
  if (!user) throw new Error("Error.NoPermission");
  if (!teamId || !schoolId) throw new Error("Error.NoTeamSchool");
  if (schoolId && user.schoolId !== schoolId)
    throw new Error("Error.NoPermission");
  if (teamId && user.teamId !== teamId && user.role === Role.Student)
    throw new Error("Error.NoPermission");

  const activity = await ctx.db.activity.create({
    data,
  });
  return activity;
}
