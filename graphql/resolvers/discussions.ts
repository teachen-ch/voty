import { Role, User, Visibility, ActivityType } from "@prisma/client";
import { FieldResolver } from "@nexus/schema";
import { Context } from "../context";
import { logActivity } from "./activities";

export const getTeamDiscussions: FieldResolver<
  "Query",
  "getTeamDiscussions"
> = async (_root, args, ctx) => {
  const { card, ballotId } = args;
  let { teamId } = args;
  const user = ctx.user;
  if (!user) return [];
  if (!teamId) teamId = String(user.teamId);
  await assertTeam(teamId, user, ctx);

  return await ctx.db.discussion.findMany({
    where: { card: card, ballotId, teamId: String(teamId) },
  });
};

export const postDiscussion: FieldResolver<
  "Mutation",
  "postDiscussion"
> = async (_root, args, ctx) => {
  const { card, ballotId, teamId, title, text } = args;
  const user = ctx.user;
  if (!user) throw new Error("Error.NeedsLogin");
  await assertTeam(teamId, user, ctx);
  if (!title && !text) throw new Error("Error.DiscussionEmpty");

  const discussion = await ctx.db.discussion.create({
    data: {
      card,
      ballot: ballotId ? { connect: { id: ballotId } } : undefined,
      title,
      text,
      user: { connect: { id: user.id } },
      team: { connect: { id: teamId } },
    },
  });
  await logActivity(ctx, {
    discussion: { connect: { id: discussion.id } },
    user: { connect: { id: user.id } },
    team: { connect: { id: teamId } },
    summary: title || text,
    card,
    ballot: ballotId ? { connect: { id: ballotId } } : undefined,
    school: { connect: { id: String(user.schoolId) } },
    visibility: Visibility.Team,
    type: ActivityType.Discussion,
  });
  return discussion;
};

async function assertTeam(teamId: string, user: User, ctx: Context) {
  if (user.role === Role.Admin) return;
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
