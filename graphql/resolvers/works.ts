import { FieldResolver } from "@nexus/schema";
import { Role, JsonObject } from "@prisma/client";
/*
export const getWorks: FieldResolver<"Query", "works"> = async (
  _root,
  args,
  ctx
) => {
  if (!args.where) return [];
  const works = await ctx.db.work.findMany({
    where: args.where,
  });
  return works;
};
export const postWork: FieldResolver<"Mutation", "postWork"> = async (
  _root,
  args,
  ctx
) => {
  const { card, title } = args.data;
  let { users } = args.data.users?.connect;
  const data = args.data.data as JsonObject;
  const user = ctx.user;

  // ensure user is logged in and part of team or teacher in same school
  if (!user) throw new Error("Error.NoPermission");
  if (user.teamId !== teamId || user.role === Role.Teacher)
    throw new Error("Error.NoPermission");

  if (!userIds) userIds = [];

  if (userIds.indexOf(user.id) === -1) {
    userIds.unshift(user.id);
  }

  const userMap = userIds?.map((id) => {
    return { id };
  });

  const work = await ctx.db.work.create({
    data: args.data,
  });

  const work = await ctx.db.work.create({
    data: {
      card: card ? card : undefined,
      title: title ? title : undefined,
      team: { connect: { id: String(teamId) } },
      school: { connect: { id: String(user.schoolId) } },
      users: { connect: userMap },
      data,
    },
  }); 
  return work;
};
*/
