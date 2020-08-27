import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";
import { Request } from "nexus/dist/runtime/schema/schema";
import { sendMail } from "./email";
import { randomBytes, createHash } from "crypto";

const secret = process.env.SESSION_SECRET;
const expires = process.env.SESSION_EXPIRES;

type ResponseLogin = {
  error?: string;
  token?: string;
  user?: User;
};

export async function login(
  email: string,
  password: string,
  prisma: PrismaClient
): Promise<ResponseLogin> {
  try {
    const user = await prisma.user.findOne({ where: { email } });
    if (!user) return { error: "ERR_USER_PASSWORD" };

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) return { error: "ERR_USER_PASSWORD" };

    if (!user.emailVerified) {
      return { error: "ERR_EMAIL_NOT_VERIFIED" };
    }

    return startJWTSession(user);
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

function startJWTSession(user: User): ResponseLogin {
  const expiry = Math.round(Date.now() / 1000) + expires;
  const token: string = jwt.sign({ user, expiry }, secret, {
    expiresIn: expires,
  });
  return { token, user };
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
export async function sendVerificationEmail(
  email: string,
  purpose: string,
  prisma: PrismaClient
) {
  try {
    const from = process.env.EMAIL;
    const site = `voty${
      process.env.NODE_ENV !== "production" ? process.env.NODE_ENV : ""
    }`;
    const token = await createVerificationToken(prisma, email);
    const url = `${process.env.BASE_URL}user/${purpose}?t=${token}`;
    const subjects = {
      verification: "voty: Bitte Email bestätigen",
      reset: "voty: Passwort zurücksetzen?",
      login: "voty: Jetzt anmelden?",
    };
    const subject = subjects[purpose];

    const conf = { email: email.replace(/\./g, " ."), url, site };

    await sendMail(from, email, subject, purpose, conf);
    return { token: "SENT..." };
  } catch (err) {
    console.error("Error sending verification email", err);
    return { error: "ERR_SEND_EMAIL_VERIFICATION" };
  }
}

async function createVerificationToken(prisma: PrismaClient, identifier) {
  const secret = process.env.SESSION_SECRET;
  const maxAge = 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + maxAge);
  const token = randomBytes(32).toString("hex");
  const hashed = createHash("sha256").update(`${token}${secret}`).digest("hex");
  await prisma.verificationRequest.create({
    data: {
      identifier,
      token: hashed,
      expires,
    },
  });
  return token;
}

export async function checkVerification(token: string, prisma: PrismaClient) {
  const found = await verifyToken(token, prisma);
  if (!found) {
    return { error: "ERR_TOKEN_NOT_FOUND" };
  }
  const email = found.identifier;
  const user = await prisma.user.findOne({ where: { email } });
  if (!user) {
    return { error: "ERR_EMAIL_NOT_FOUND" };
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });
  return startJWTSession(user);
}

async function verifyToken(token, prisma: PrismaClient) {
  const secret = process.env.SESSION_SECRET;
  const hashed = createHash("sha256").update(`${token}${secret}`).digest("hex");
  const found = await prisma.verificationRequest.findOne({
    where: { token: hashed },
  });
  if (!found) return false;
  await prisma.verificationRequest.delete({ where: { token: hashed } });
  const maxAge = 24 * 60 * 60 * 1000;
  const expired = new Date(Date.now() - 2 * maxAge);
  await prisma.verificationRequest.deleteMany({
    where: { expires: { lt: expired } },
  });
  if (found.expires.getMilliseconds() > Date.now()) return undefined;
  return found;
}
