import resolvers from "../resolvers";
import { extendType, objectType } from "@nexus/schema";

export const Activity = objectType({
  name: "Activity",
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.card();
    t.model.ballotId();
    t.model.workId();
    t.model.summary();
    t.model.user();
    t.model.team();
    t.model.school();
    t.model.visibility();
    t.model.time();
  },
});

export const ActivitiesQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.activities({
      ordering: true,
      filtering: true,
      alias: "activities",
      pagination: true,
      resolve: resolvers.activities.activities,
    });
  },
});

export const ActivitiesMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneActivity({
      alias: "postActivity",
      resolve: resolvers.activities.postActivity,
    });
  },
});
