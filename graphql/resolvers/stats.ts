import { FieldResolver } from "@nexus/schema";

export const stats: FieldResolver<"Query", "stats"> = async (
  _root,
  args,
  ctx
) => {
  const { from, to } = args;
  const fromDate = from ? new Date(from) : new Date(0);
  const toDate = to ? new Date(to) : new Date();
  const users = await ctx.db.user.findMany({
    where: { createdAt: { gte: fromDate, lte: toDate } },
  });
  return { stats: { Users: users.length } };
};
