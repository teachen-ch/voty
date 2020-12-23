import { FieldResolver } from "@nexus/schema";
import { Work } from "graphql/types";

export const getWorks: FieldResolver<"Query", "works"> = async (
  _root,
  args,
  ctx
) => {
  const { card, teamId, schoolId } = args;
  const works = await ctx.db.work.findMany({});
  return works;
};
