import { builder } from "../builder";

export const Stats = builder.objectRef<{ stats?: unknown }>("Stats").implement({
  fields: (t) => ({
    stats: t.expose("stats", { type: "Json", nullable: true }),
  }),
});

import * as statsResolver from "../resolvers/stats";

builder.queryField("stats", (t) =>
  t.field({
    type: Stats,
    authScopes: { admin: true },
    args: {
      from: t.arg.float(),
      to: t.arg.float(),
    },
    resolve: (_root, args, ctx, info) =>
      statsResolver.stats(_root, args, ctx, info) as any,
  })
);
