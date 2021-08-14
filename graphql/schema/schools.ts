import { extendType, objectType } from "@nexus/schema";

export const School = objectType({
  name: "School",
  definition(t) {
    t.nonNull.model.id();
    t.model.name();
    t.model.type();
    t.model.teams();
    t.model.members();
    t.model.address();
    t.model.city();
    t.model.zip();
    t.model.canton();
  },
});

export const SchoolsQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.school();
    t.crud.schools({
      ordering: true,
      filtering: true,
    });
  },
});

export const SchoolsMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneSchool();
    t.crud.deleteOneSchool();
  },
});
