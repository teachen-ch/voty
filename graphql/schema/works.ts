import resolvers from "../resolvers";
import { extendType, objectType } from "@nexus/schema";

export const Work = objectType({
  name: "Work",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.title();
    t.model.data();
    t.model.users();
    t.model.attachments();
    t.model.card();
    t.model.updatedAt();
    t.model.reactions();
  },
});

export const WorksQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.works({
      ordering: true,
      filtering: true,
      alias: "works",
      resolve: resolvers.works.works,
    });
  },
});

export const WorksMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneWork({
      alias: "postWork",
      resolve: resolvers.works.postWork,
    });
  },
});
