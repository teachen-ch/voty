import { Role, User } from "@prisma/client";
import { FieldResolver } from "@nexus/schema";
import { Context } from "../context";

export const getTeamDiscussions: FieldResolver<
  "Query",
  "getTeamDiscussions"
> = async (_root, args, ctx) => {
  const { ref } = args;
  let { teamId } = args;
  const user = ctx.user;
  if (!user) return [];
  if (!teamId) teamId = String(user.teamId);
  await assertTeam(teamId, user, ctx);

  return await ctx.db.discussion.findMany({
    where: { ref, teamId: String(teamId) },
  });
};

export const postDiscussion: FieldResolver<
  "Mutation",
  "postDiscussion"
> = async (_root, args, ctx) => {
  const { ref, teamId, title, text } = args;
  const user = ctx.user;
  if (!user) throw new Error("Error.NeedsLogin");
  await assertTeam(teamId, user, ctx);

  const discussion = await ctx.db.discussion.create({
    data: {
      ref,
      title,
      text,
      user: { connect: { id: user.id } },
      team: { connect: { id: teamId } },
    },
  });
  return discussion;
};

async function assertTeam(teamId: string, user: User, ctx: Context) {
  if (user.role === Role.Teacher) {
    const team = await ctx.db.team.findUnique({ where: { id: teamId } });
    if (!team || team.teacherId !== user.id)
      throw new Error("Error.DiscussionNoTeam");
  } else {
    if (user.teamId !== teamId) {
      throw new Error("Error.DiscussionNoTeam");
    }
  }
}
