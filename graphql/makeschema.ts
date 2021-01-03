import { makeSchema } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { nexusPrisma } from "nexus-plugin-prisma";
import { permissions } from "./permissions";
import { applyMiddleware } from "graphql-middleware";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
import path from "path";

import * as types from "./schema";
import { GraphQLScalarType } from "graphql";
import { isLocal } from "util/isBrowser";
import { LoggerPlugin } from "util/nexusLogger";

const prisma = new PrismaClient();

export const LOG_INPUT = process.env.LOG_INPUT || false;
export const LOG_GRAPHQL = process.env.LOG_GRAPHQL || true;

const baseSchema = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      prismaClient: (ctx) => (ctx.db = prisma),
      experimentalCRUD: true,
      shouldGenerateArtifacts: isLocal(),
      outputs: {
        typegen: path.join(process.cwd(), "graphql", "nexus-plugin-prisma.ts"),
      },
      scalars: {
        DateTime: DateTimeResolver,
        Json: new GraphQLScalarType({
          ...JSONObjectResolver,
          name: "Json",
          description:
            "The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).",
        }),
      },
    }),
    LoggerPlugin,
  ],

  typegenAutoConfig: {
    debug: false,
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: path.join(process.cwd(), "graphql", "context.ts"),
        alias: "ContextModule",
      },
    ],
    contextType: "ContextModule.Context",
  },

  shouldGenerateArtifacts: isLocal(),
  shouldExitAfterGenerateArtifacts: process.argv.includes("--nexus-exit"),
  outputs: {
    schema: path.join(process.cwd(), "graphql", "api.graphql"),
    typegen: path.join(process.cwd(), "graphql", "nexus.ts"),
  },
  prettierConfig: path.join(process.cwd(), ".prettierrc.js"),
});

export const schema = applyMiddleware(baseSchema, permissions);
