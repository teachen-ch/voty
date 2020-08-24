import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, name, lastname, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  console.log("Salt: ", salt);
  const hashed = await bcrypt.hash(password, salt);
  console.log("Hashed: ", hashed);
  const user = await prisma.user.create({
    data: {
      name,
      lastname,
      email,
      password: hashed,
      role,
    },
  });
  console.log("User created", user);

  res.status(200).json({ success: true, user });
};
