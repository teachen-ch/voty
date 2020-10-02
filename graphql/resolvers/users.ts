import jwt from "jsonwebtoken";
import { PrismaClient, User, Team, Role } from "@prisma/client";
import { NextApiRequest } from "next";
import bcrypt from "bcrypt";
import { sendMail } from "../../util/email";
import { randomBytes, createHash } from "crypto";
import logger from "../../util/logger";

let secret = process.env.SESSION_SECRET!;
if (!secret) throw new Error("New SESSION_SECRET defined in .env");
let expires = process.env.SESSION_EXPIRES || "1d";

if (!secret) {
  logger.warn(".env.SESSION_SECRET is not defined! using random secret");
  secret = randomBytes(32).toString("hex");
}

type ResponseLogin = {
  error?: string;
  token?: string;
  user?: User;
};

export async function login(
  _root: any,
  args: any,
  ctx: NexusContext
): Promise<ResponseLogin> {
  try {
    const user = await ctx.db.user.findOne({ where: { email: args.email } });
    if (!user) throw Error("ERR_USER_PASSWORD");

    const matches = await bcrypt.compare(args.password, user.password!);
    if (!matches) throw Error("ERR_USER_PASSWORD");

    if (!user.emailVerified) {
      throw Error("ERR_EMAIL_NOT_VERIFIED");
    }
    // logger.mail("a user logged in... " + user.email);
    return startJWTSession(user, ctx);
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}

function startJWTSession(user: User, ctx: NexusContext): ResponseLogin {
  const token: string = jwt.sign({ user }, secret, {
    expiresIn: expires,
  });

  setRequestUser(user, ctx);
  return { token, user };
}

export function setRequestUser(user: User, ctx: NexusContext) {
  ctx.user = user;
}

export function getRequestUser(ctx: NexusContext): User | undefined {
  return ctx.user;
}

export async function createUser(_root: any, args: any, ctx: NexusContext) {
  try {
    const { email, password, name, lastname, role } = args.data;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    if (role === Role.Admin) throw new Error("NAH");
    const user = await ctx.db.user.create({
      data: {
        name,
        lastname,
        email,
        password: hashed,
        role,
      },
    });

    await sendVerificationEmail(email, "verification", ctx.db);
    logger.mail(`New user created: ${name} ${lastname} <${email}>: ${role}`);
    setRequestUser(user, ctx);
    return user;
  } catch (err) {
    if (err.meta?.target && err.meta.target.indexOf("email") >= 0) {
      throw new Error("ERR_DUPLICATE_EMAIL");
    }
    logger.error(err);
    throw new Error("ERR_CREATE_USER");
  }
}

export async function acceptInvite(_root: any, args: any, ctx: NexusContext) {
  const team = await ctx.db.team.findOne({ where: { invite: args.invite } });
  if (!team) throw new Error("INVITE_NOT_FOUND");
  const user = getRequestUser(ctx);
  if (!user) throw new Error("NEEDS_LOGIN");
  const success = await connectUserTeam(user, team, ctx);
  if (!success) throw new Error("DB_ERROR");
  else return team;
}

export async function connectUserTeam(
  user: User,
  team: Team,
  ctx: NexusContext
) {
  if (user.teamId) throw new Error("ALREADY_IN_TEAM");
  return await ctx.db.user.update({
    where: { id: user.id },
    data: {
      team: { connect: { id: team.id } },
      school: { connect: { id: team.schoolId } },
    },
  });
}

export async function createInvitedUser(
  _root: any,
  args: any,
  ctx: NexusContext
) {
  const team = await ctx.db.team.findOne({ where: { invite: args.invite } });
  if (!team) throw new Error("INVITE_NOT_FOUND");
  const { name, lastname, email, password } = args;
  args.data = {
    name,
    lastname,
    email,
    password,
    role: Role.Student,
  };
  const user = await createUser(_root, args, ctx);
  await connectUserTeam(user, team, ctx);
  return user;
}

export async function updateUser(_root: any, args: any, ctx: NexusContext) {
  // TODO: ensure this is not called with variable args by user
  const user = getRequestUser(ctx);
  const id = args.id || user?.id;
  if (id !== user?.id && user?.role !== Role.Admin)
    throw new Error("ERR_ONLY_UPDATE_SELF");
  if (args.role && user?.role !== Role.Admin) delete args.role;
  const result = await ctx.db.user.update({
    where: { id },
    data: args,
  });
  return result;
}

export function getSessionUser(req: Request): User | undefined {
  // what about req.body.token || req.query.token ?
  // @ts-ignore
  const token = req.headers["x-access-token"];

  if (token && token != "null") {
    const jwt: any = verifyJWT(token);
    return jwt?.user;
  }
}

export async function getUser(ctx: NexusContext): Promise<User | null> {
  try {
    const user = getRequestUser(ctx);
    if (user?.id) {
      return await ctx.db.user.findOne({ where: { id: user?.id } });
    }
    return null;
  } catch (err) {
    logger.info("error calling /me", err);
    return null;
  }
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    logger.info("Error verifying token", err.message, token);
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
    const from = process.env.EMAIL!;
    if (!from)
      throw new Error("Please define EMAIL env variable (sender-email)");

    const site = `voty${
      process.env.NODE_ENV !== "production" ? process.env.NODE_ENV : ""
    }`;
    const token = await createVerificationToken(prisma, email);
    const url = `${process.env.BASE_URL}user/login?t=${token}&p=${purpose}`;
    const subjects: { [key: string]: string } = {
      verification: "voty: Bitte Email bestätigen",
      reset: "voty: Passwort zurücksetzen?",
      login: "voty: Jetzt anmelden?",
    };
    const subject = subjects[purpose];

    const conf = { email: email.replace(/\./g, " ."), url, site };

    await sendMail(from, email, subject, purpose, conf);
    logger.info("Sending verification email for new account: " + email);
    return { token: "SENT..." };
  } catch (err) {
    logger.error("Error sending verification email", err);
    throw Error("ERR_SEND_EMAIL_VERIFICATION");
  }
}

async function createVerificationToken(
  prisma: PrismaClient,
  identifier: string
) {
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

export async function checkVerification(
  _root: any,
  args: any,
  ctx: NexusContext
) {
  const found = await verifyToken(args.token, ctx.db);
  if (!found) {
    throw Error("ERR_TOKEN_NOT_FOUND");
  }
  const email = found.identifier;
  const user = await ctx.db.user.findOne({ where: { email } });
  if (!user) {
    throw Error("ERR_EMAIL_NOT_FOUND");
  }

  await ctx.db.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });
  return startJWTSession(user, ctx);
}

export async function changePassword(_root: any, args: any, ctx: NexusContext) {
  const user = await getUser(ctx);
  if (!user) throw new Error("ERR_USER_NOT_FOUND");
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(args.password, salt);
  const ok = await ctx.db.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });
  if (ok) {
    return startJWTSession(user, ctx);
  } else {
    throw Error("ERR_PASSWORD_CHANGE");
  }
}

async function verifyToken(token: string, prisma: PrismaClient) {
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

async function deleteExpiredTokens(prisma: PrismaClient) {
  const maxAge = 24 * 60 * 60 * 1000;
  const expired = new Date(Date.now() - 2 * maxAge);
  // TODO: deleting old verification requests could be done in cronjob
  await prisma.verificationRequest.deleteMany({
    where: { expires: { lt: expired } },
  });
}
