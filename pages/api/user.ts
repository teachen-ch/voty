import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Access denied" });

  /*await prisma.user.create({
    data: {
      firstname: "Stefan",
      lastname: "Niederhauser",
      email: "stefan@teachen.ch",
      password: "lkajsdflkjasdlfkjsadlfkj",
      salt: "lkjsdflkjasdflkjasdflk",
      role: "admin",
    },
  });*/
  const users = await prisma.user.findMany();
  // res.status(200).json({ users });
  res.status(200).json({ session, users });
};
