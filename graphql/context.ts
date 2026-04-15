import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { GraphQLResolveInfo } from "graphql";

export type Context = {
  db: PrismaClient;
  user?: User;
  req: NextApiRequest;
  res: NextApiResponse;
};

export type FieldResolver<_P extends string, _F extends string> = (
  root: any,
  args: any,
  ctx: Context,
  info: GraphQLResolveInfo
) => any;
