import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";
import prisma from "../util/prisma";
import { Prisma } from "@prisma/client";
import type PrismaTypes from "./pothos-types";
import type { Context } from "./context";

const JsonScalar = new GraphQLScalarType({
  ...JSONObjectResolver,
  name: "Json",
  description:
    "The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).",
});

export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: {
    DateTime: { Input: Date; Output: Date };
    Json: { Input: unknown; Output: unknown };
  };
}>({
  // @ts-expect-error — runtime-supported option missing from v4 type defs
  defaultFieldNullability: false,
  plugins: [PrismaPlugin, PrismaUtils],
  prisma: {
    client: () => prisma,
    dmmf: Prisma.dmmf,
    exposeDescriptions: false,
    filterConnectionTotalCount: true,
  },
});

builder.addScalarType("DateTime", DateTimeResolver);
builder.addScalarType("Json", JsonScalar);

builder.queryType({});
builder.mutationType({});

// Prisma enums — expose as GraphQL enums so client types match
import {
  Role,
  Gender,
  BallotScope,
  Visibility,
  ActivityType,
} from "@prisma/client";

export const RoleEnum = builder.enumType(Role, { name: "Role" });
export const GenderEnum = builder.enumType(Gender, { name: "Gender" });
export const BallotScopeEnum = builder.enumType(BallotScope, {
  name: "BallotScope",
});
export const VisibilityEnum = builder.enumType(Visibility, {
  name: "Visibility",
});
export const ActivityTypeEnum = builder.enumType(ActivityType, {
  name: "ActivityType",
});

// VotingStatus is not referenced by any Prisma model, so not exported from
// @prisma/client. Declared as a standalone enum to preserve SDL compatibility.
export const VotingStatusEnum = builder.enumType("VotingStatus", {
  values: ["Restricted", "Open", "Voted", "NotStarted", "Closed"] as const,
});
