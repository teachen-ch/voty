import { makeSchema } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { nexusPrisma } from "nexus-plugin-prisma";
import { permissions } from "./permissions";
import { applyMiddleware } from "graphql-middleware";
import path from "path";

import * as types from "./schema";

const prisma = new PrismaClient();

const baseSchema = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      prismaClient: (ctx) => (ctx.db = prisma),
      experimentalCRUD: true,
      shouldGenerateArtifacts: process.env.NODE_ENV === "development",
      outputs: {
        typegen: path.join(process.cwd(), "graphql", "nexus-plugin-prisma.ts"),
      },
    }),
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

  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  shouldExitAfterGenerateArtifacts: process.argv.includes("--nexus-exit"),
  outputs: {
    schema: path.join(process.cwd(), "graphql", "api.graphql"),
    typegen: path.join(process.cwd(), "graphql", "nexus.ts"),
  },
  prettierConfig: path.join(process.cwd(), ".prettierrc.js"),
});

export const schema = applyMiddleware(baseSchema, permissions);
