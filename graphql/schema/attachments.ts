import resolvers from "../resolvers";
import { extendType, objectType } from "@nexus/schema";

export const Attachment = objectType({
  name: "Attachment",
  definition(t) {
    t.model.id();
    t.model.file();
    t.model.title();
    t.model.user();
    t.model.type();

    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const AttachmentQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.attachments({
      ordering: true,
      filtering: true,
      resolve: resolvers.attachments.attachments,
    });
  },
});
