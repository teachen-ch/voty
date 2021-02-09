import { FieldResolver } from "@nexus/schema";
import { getTeacherTeams } from "./teams";

export const attachments: FieldResolver<"Query", "attachments"> = async (
  _root,
  args,
  ctx
) => {
  const { where, orderBy, first } = args;
  const user = ctx.user;
  if (!user) throw new Error("Error.NoPermission");
  const teams = await getTeacherTeams(user, ctx.db);

  let attachments = await ctx.db.attachment.findMany({
    // @ts-ignore TODO: not sure what's wrong with the built-in nexus-prisma types here
    where,
    // @ts-ignore
    orderBy,
    take: first || 30,
  });

  // only return activities from own team
  attachments = attachments.filter(
    (act) => act.teamId === user.teamId || teams.indexOf(act.teamId) >= 0
  );
  return attachments;
};
