import resolvers from "../resolvers";
import { extendType, floatArg, objectType } from "@nexus/schema";

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
        from: floatArg(),
        to: floatArg(),
      },
      resolve: resolvers.stats.stats,
    });
  },
});
