import { FieldResolver } from "@nexus/schema";
import { Role } from "@prisma/client";

export const activities: FieldResolver<"Query", "activities"> = async (
  _root,
  args,
  ctx
) => {
  if (!args.where) return [];
  const activities = await ctx.db.activity.findMany({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    where: args.where,
  });
  return activities;
};
export const logActivity: FieldResolver<"Mutation", "logActivity"> = async (
  _root,
  args,
  ctx
) => {
  const data = args.data;
  const user = ctx.user;
  const teamId = args.data.team.connect?.id;
  const schoolId = args.data.school.connect?.id;

  // ensure user is logged in and part of team or teacher in same school
  if (!user) throw new Error("Error.NoPermission");
  if (!teamId || !schoolId) throw new Error("Error.NoTeamSchool");
  if (user.schoolId !== schoolId) throw new Error("Error.NoPermission");
  if (user.teamId !== teamId && user.role === Role.Student)
    throw new Error("Error.NoPermission");

  const activity = await ctx.db.activity.create({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    data,
  });
  return activity;
};
