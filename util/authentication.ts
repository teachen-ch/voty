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
  const token: string = jwt.sign({ user }, secret, {
    expiresIn: "1d",
  });
  return { token, user };
}

export async function createUser(input: any, prisma: PrismaClient) {
  try {
    const { email, password, name, lastname, role } = input;
    console.log("Trying... ", email, password);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log(hashed);
    const user = await prisma.user.create({
      data: {
        name,
        lastname,
        email,
        password: hashed,
        role,
      },
    });

    await sendVerificationEmail(email, "verification", prisma);
    return user;
  } catch (err) {
    if (err.meta?.target && err.meta.target.indexOf("email") >= 0) {
      throw new Error("ERR_DUPLICATE_EMAIL");
    }
    console.error(err);
    throw new Error("ERR_CREATE_USER");
  }
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
    // console.log("Error verifying token", err.message, token);
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
    const url = `${process.env.BASE_URL}user/login?t=${token}&p=${purpose}`;
    const subjects = {
      verification: "voty: Bitte Email bestätigen",
      reset: "voty: Passwort zurücksetzen?",
      login: "voty: Jetzt anmelden?",
    };
    const subject = subjects[purpose];

    const conf = { email: email.replace(/\./g, " ."), url, site };

    await sendMail(from, email, subject, purpose, conf);
    console.log("SEND SUCCESSFUL", email);
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

export async function changePassword(
  password: string,
  req: Request,
  prisma: PrismaClient
) {
  console.log("password Change... check user");
  const user = await getUser(req, prisma);
  console.log("user: ", user);
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  const ok = await prisma.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });
  if (ok) {
    return startJWTSession(user);
  } else {
    return { error: "ERR_PASSWORD_CHANGE" };
  }
}

async function verifyToken(token, prisma: PrismaClient) {
  const secret = process.env.SESSION_SECRET;
  const hashed = createHash("sha256").update(`${token}${secret}`).digest("hex");
  const found = await prisma.verificationRequest.findOne({
    where: { token: hashed },
  });
  if (!found) return false;
  if (found.expires.getMilliseconds() > Date.now()) return undefined;
  deleteExpiredTokens(prisma);
  return found;
}

async function deleteExpiredTokens(prisma) {
  const maxAge = 24 * 60 * 60 * 1000;
  const expired = new Date(Date.now() - 2 * maxAge);
  // TODO: deleting old verification requests could be done in cronjob
  await prisma.verificationRequest.deleteMany({
    where: { expires: { lt: expired } },
  });
}
