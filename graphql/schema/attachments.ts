import resolvers from "../resolvers";
import { extendType, objectType } from "@nexus/schema";

export const Attachment = objectType({
  name: "Attachment",
  definition(t) {
    t.nonNull.model.id();
    t.model.file();
    t.nonNull.model.title();
    t.nonNull.model.user();
    t.nonNull.model.type();

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
