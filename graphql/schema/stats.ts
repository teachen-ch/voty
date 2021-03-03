import resolvers from "../resolvers";
import { extendType, intArg, objectType } from "@nexus/schema";

export const Stats = objectType({
  name: "Stats",
  definition(t) {
    t.field("stats", { type: "Json" });
  },
});

export const StatsQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("stats", {
      type: "Stats",
      args: {
        from: intArg(),
        to: intArg(),
      },
      resolve: resolvers.stats.stats,
    });
  },
});
