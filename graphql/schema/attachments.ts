import { builder } from "../builder";

export const AttachmentType = builder.prismaObject("Attachment", {
  fields: (t) => ({
    id: t.exposeID("id"),
    file: t.exposeString("file"),
    title: t.exposeString("title"),
    user: t.relation("user"),
    type: t.exposeString("type"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
  }),
});

// TODO Step 8: CRUD — attachments (ordering + filtering, custom resolver wrap)
