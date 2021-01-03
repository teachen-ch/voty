import { plugin } from "@nexus/schema";
import logger from "util/logger";
import { LOG_GRAPHQL, LOG_INPUT } from "../graphql/makeschema";

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
