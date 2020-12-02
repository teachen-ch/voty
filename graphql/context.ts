import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export type Context = {
  db: PrismaClient;
  user?: User;
  req: NextApiRequest;
  res: NextApiResponse;
};
