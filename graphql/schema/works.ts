import { builder } from "../builder";

export const WorkType = builder.prismaObject("Work", {
  fields: (t) => ({
    id: t.exposeID("id"),
    text: t.exposeString("text"),
    title: t.exposeString("title"),
    data: t.expose("data", { type: "Json", nullable: true }),
    users: t.relation("users"),
    attachments: t.relation("attachments"),
    card: t.exposeString("card", { nullable: true }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    reactions: t.relation("reactions"),
  }),
});

// TODO Step 8: CRUD — works (ordering + filtering), postWork (createOneWork
//   alias), deleteWork (deleteOneWork alias)
