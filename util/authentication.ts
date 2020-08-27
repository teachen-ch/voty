import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";
import { Request } from "nexus/dist/runtime/schema/schema";
import { sendMail } from "./email";

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
  if (token && token != "null") return verifyJWT(token);
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

export function verifyJWT(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log("Error verifying token", err.message, token);
    return null;
  }
}

// purpose: ["verification", "reset", "login"]
export async function sendVerificationEmail(prisma, email, purpose, subject) {
  const from = process.env.EMAIL;
  const site = "«voty»";
  const token = createVerificationToken(prisma, email);
  const url = `${process.env.BASE_URL}user/{purpose}?t=${token}`;

  const conf = { email: email.replace(/\./g, " ."), url, site };
  return await sendMail(from, email, subject, purpose, conf);
}

async function createVerificationToken(prisma: PrismaClient, identifier) {
  const secret = process.env.SESSION_SECRET;
  const maxAge = 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + maxAge);
  const token = randomString(32);
  const hashed = bcrypt.sign(token, secret);
  await prisma.verificationRequest.create({
    data: {
      identifier,
      token: hashed,
      expires,
    },
  });
  return token;
}

async function verifyToken(prisma, token) {
  const secret = process.env.SESSION_SECRET;
  const hashed = bcrypt.sign(token, secret);
  const found = await prisma.verificationRequest.findOne({
    where: { token: hashed },
  });
  if (!found) return false;
  console.log("Found token: ", found);
  console.log("now: ", Date.now());
  if (found.expires > Date.now()) return false;
  return true;
}

function randomCode(len = 4) {
  return Math.round(Math.random() * 0.9 * 10 ** len) + 10 ** (len - 1);
}

function randomString(len = 10) {
  const ch = "qwertyupasdfghjklzxcvbnmQWERTYUIPASDFGHJKLZXCVBNM23456789!-_";
  const l = ch.length - 1;
  let pw = "";
  while (len > 0) {
    pw += ch[(Math.random() * l).toFixed(0)];
    len -= 1;
  }
  return pw;
}
