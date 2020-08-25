import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";
import { Request } from "nexus/dist/runtime/schema/schema";

const secret = process.env.SESSION_SECRET;
const expires = process.env.SESSION_EXPIRES;

export async function loginReq(req: NextApiRequest, prisma: PrismaClient) {
  // TODO: disable login via get / req.query
  const email = req.body.email || req.query.email;
  const password = req.body.password || req.query.password;
  return login(email, password, prisma);
}

export async function login(
  email: string,
  password: string,
  prisma: PrismaClient
) {
  try {
    const user = await prisma.user.findOne({ where: { email } });
    if (!user) return null;

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) return null;

    const expiry = Math.round(Date.now() / 1000) + expires;
    const token: string = jwt.sign({ user, expiry }, secret, {
      expiresIn: expires,
    });
    return { token, user };
  } catch (err) {
    console.error(err);
    return err.message;
  }
}

export async function createUserReq(req: NextApiRequest, prisma: PrismaClient) {
  const { email, password, name, lastname, role } = req.body;
  return createUser({ email, password, name, lastname, role }, prisma);
}

export async function createUser(input: any, prisma: PrismaClient) {
  const { email, password, name, lastname, role } = input;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      name,
      lastname,
      email,
      password: hashed,
      role,
    },
  });
  // console.log("User created", user);
  return user;
}

export function getSession(req: NextApiRequest): any {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token && token != "null") return verifyToken(token);
}

export async function getUser(
  req: Request,
  prisma: PrismaClient
): Promise<User> {
  try {
    // @ts-ignore
    if (req.user) {
      // @ts-ignore
      return await prisma.user.findOne({ where: { email: req.user.email } });
    }
  } catch (err) {
    console.log("error calling /me", err);
  }
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log("Error verifying token", err.message, token);
    return null;
  }
}
