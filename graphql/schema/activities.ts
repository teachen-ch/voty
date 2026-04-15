import { builder, ActivityTypeEnum, VisibilityEnum } from "../builder";

export const ActivityType = builder.prismaObject("Activity", {
  fields: (t) => ({
    id: t.exposeInt("id", { nullable: true }),
    type: t.field({ type: ActivityTypeEnum, resolve: (p) => p.type }),
    card: t.exposeString("card", { nullable: true }),
    ballotId: t.exposeString("ballotId", { nullable: true }),
    workId: t.exposeString("workId", { nullable: true }),
    summary: t.exposeString("summary", { nullable: true }),
    user: t.relation("user"),
    team: t.relation("team"),
    school: t.relation("school"),
    visibility: t.field({ type: VisibilityEnum, resolve: (p) => p.visibility }),
    time: t.expose("time", { type: "DateTime" }),
  }),
});

// TODO Step 8: CRUD — activities (ordering + filtering + pagination, custom
//   resolver wrap), postActivity (createOneActivity alias)
