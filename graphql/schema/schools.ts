import { builder } from "../builder";

export const SchoolType = builder.prismaObject("School", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    type: t.exposeString("type"),
    teams: t.relation("teams"),
    members: t.relation("members", { authScopes: { admin: true } }),
    address: t.exposeString("address"),
    city: t.exposeString("city"),
    zip: t.exposeString("zip"),
    canton: t.exposeString("canton"),
  }),
});

// TODO Step 8: CRUD — school, schools (ordering + filtering),
//   createOneSchool, deleteOneSchool
