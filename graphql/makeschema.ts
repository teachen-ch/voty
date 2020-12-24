import { makeSchema, plugin } from "@nexus/schema";
import { PrismaClient } from "@prisma/client";
import { nexusPrisma } from "nexus-plugin-prisma";
import { permissions } from "./permissions";
import { applyMiddleware } from "graphql-middleware";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
import path from "path";
import logger from "util/logger";

import * as types from "./schema";
import { GraphQLScalarType } from "graphql";

const prisma = new PrismaClient();

const LOG_INPUT = process.env.LOG_INPUT || false;
const LOG_GRAPHQL = process.env.LOG_GRAPHQL || true;

export const LoggerPlugin = plugin({
  name: "LogMutationTimePlugin",
  onCreateFieldResolver(config) {
    const type = config.parentTypeConfig.name;
    if (type !== "Mutation" && type !== "Query") return;
    if (!LOG_GRAPHQL) return;
    return async (root, args, ctx, info, next) => {
      const name = info.operation.name?.value;
      const user = ctx.user ? `${ctx.user.role} ${ctx.user.id}` : "anon";
      if (LOG_INPUT && info.variableValues)
        logger.info(JSON.stringify(info.variableValues));
      const startTimeMs = new Date().valueOf();
      // eslint-disable-next-line
      const value = await next(root, args, ctx, info);
      const endTimeMs = new Date().valueOf();
      logger.info(
        `graphql ${type} «${name}» (${endTimeMs - startTimeMs}ms) [${user}]`
      );
      // eslint-disable-next-line
      return value;
    };
  },
});

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

  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  shouldExitAfterGenerateArtifacts: process.argv.includes("--nexus-exit"),
  outputs: {
    schema: path.join(process.cwd(), "graphql", "api.graphql"),
    typegen: path.join(process.cwd(), "graphql", "nexus.ts"),
  },
  prettierConfig: path.join(process.cwd(), ".prettierrc.js"),
});

export const schema = applyMiddleware(baseSchema, permissions);
