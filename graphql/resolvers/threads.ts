import { Role, User } from "@prisma/client";
import { FieldResolver } from "@nexus/schema";
import { Context } from "../context";

export const getTeamThreads: FieldResolver<"Query", "getTeamThreads"> = async (
  _root,
  args,
  ctx
) => {
  const { ref } = args;
  let { teamId } = args;
  const user = ctx.user;
  if (!user) return [];
  if (!teamId) teamId = String(user.teamId);
  await assertTeam(teamId, user, ctx);

  return await ctx.db.thread.findMany({
    where: { ref, teamId: String(teamId) },
  });
};

export const postThread: FieldResolver<"Mutation", "postThread"> = async (
  _root,
  args,
  ctx
) => {
  const { ref, teamId, title, text } = args;
  const user = ctx.user;
  if (!user) throw new Error("Error.NeedsLogin");
  await assertTeam(teamId, user, ctx);

  const thread = await ctx.db.thread.create({
    data: {
      ref,
      title,
      text,
      user: { connect: { id: user.id } },
      team: { connect: { id: teamId } },
    },
  });
  return thread;
};

async function assertTeam(teamId: string, user: User, ctx: Context) {
  if (user.role === Role.Teacher) {
    const team = await ctx.db.team.findOne({ where: { id: teamId } });
    if (!team || team.teacherId !== user.id)
      throw new Error("Error.ThreadNoTeam");
  } else {
    if (user.teamId !== teamId) {
      throw new Error("Error.ThreadNoTeam");
    }
  }
}
