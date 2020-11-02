import { makeSchema } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { nexusPrisma } from "nexus-plugin-prisma";
import { permissions } from "./permissions";
import { applyMiddleware } from "graphql-middleware";
import path from "path";

import * as types from "./makeschema";

const prisma = new PrismaClient();

const baseSchema = makeSchema({
  types,
  plugins: [
    nexusPrisma({
      prismaClient: (ctx) => (ctx.db = prisma),
      experimentalCRUD: true,
      shouldGenerateArtifacts: process.env.NODE_ENV === "development",
    }),
  ],

  typegenAutoConfig: {
    debug: true,
    sources: [
      {
        source: require.resolve(".prisma/client/index.d.ts"),
        alias: "prisma",
      },
      {
        source: require.resolve("./context.ts"),
        alias: "ContextModule",
      },
    ],
    contextType: "ContextModule.Context",
  },

  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  shouldExitAfterGenerateArtifacts: process.argv.includes("--nexus-exit"),
  outputs: {
    schema: path.join(__dirname, "../api.graphql"),
    typegen: path.join(__dirname, "../@types/nexus.ts"),
  },
  prettierConfig: path.join(__dirname, "../.prettierrc.js"),
});

export const schema = applyMiddleware(baseSchema, permissions);
