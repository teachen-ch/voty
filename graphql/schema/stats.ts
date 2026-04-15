import { builder } from "../builder";

export const Stats = builder.objectRef<{ stats?: unknown }>("Stats").implement({
  fields: (t) => ({
    stats: t.expose("stats", { type: "Json", nullable: true }),
  }),
});

// TODO Step 7: queryField for:
//   - stats (from/to float args)
