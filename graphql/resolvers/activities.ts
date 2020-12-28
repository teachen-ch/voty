import { FieldResolver } from "@nexus/schema";
import { Activity, Prisma, Role } from "@prisma/client";
import { Context } from "graphql/context";

export const activities: FieldResolver<"Query", "activities"> = async (
  _root,
  args,
  ctx
) => {
  const { where, orderBy, first } = args;
  const act = await ctx.db.activity.findMany({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    where,
    // @ts-ignore
    orderBy,
    take: first || 10,
  });
  return act;
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
