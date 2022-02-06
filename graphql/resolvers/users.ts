import jwt from "jsonwebtoken";
import {
  PrismaClient,
  User,
  Team,
  Role,
  ActivityType,
  Visibility,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendMail } from "../../util/email";
import { randomBytes, createHash } from "crypto";
import logger from "../../util/logger";
import { Context } from "../context";
import { FieldResolver } from "@nexus/schema";
import { NextApiRequest } from "next";
import { promises as fs } from "fs";
import pick from "lodash/pick";
import upperFirst from "lodash/upperFirst";
import { logActivity } from "./activities";
import { translate } from "util/translate";

let secret = process.env.SESSION_SECRET || "";
if (!secret) console.error("No SESSION_SECRET defined in .env");
const expires = process.env.SESSION_EXPIRES || "1d";

if (!secret) {
  logger.warn(".env.SESSION_SECRET is not defined! using random secret");
  secret = randomBytes(32).toString("hex");
}

type ResponseLogin = {
  error?: string;
  token?: string;
  user?: User;
};

export const shortname: FieldResolver<"User", "shortname"> = (_root) => {
  return getShortname(_root);
};

export function getShortname(_root: {
  lastname?: string | null;
  name?: string | null;
  role?: Role | null;
}): string {
  if (!_root.lastname) return String(_root.name);
  if (_root.role === Role.Student)
    return `${_root.name} ${upperFirst(_root.lastname).substr(0, 1)}.`;
  else
    return `${upperFirst(String(_root.name)).substr(0, 1)}. ${_root.lastname}`;
}

export const magic: FieldResolver<"Mutation", "magic"> = async (
  _root,
  args,
  ctx: Context
) => {
  const { email, redirect } = args;
  const user = await ctx.db.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (user && !user.password && user.email) {
    await sendVerificationEmail(user.email, "login", ctx.db, redirect);
    return { success: true, message: "magic" };
  } else
    return {
      success: user ? true : false,
      message: "",
    };
};

export const login: FieldResolver<"Mutation", "login"> = async (
  _root,
  args,
  ctx: Context
): Promise<ResponseLogin> => {
  const user = await ctx.db.user.findUnique({
    where: { email: args.email?.toLowerCase() },
  });
  if (!user) {
    logger.info("Login attempt - User not found", { meta: args.email });
    throw Error("Error.UserPassword"); // generic error, do not say why
  }
  if (!user.password) {
    logger.info("Login attempt - Password not set!", { meta: args.email });
    throw Error("Error.PasswordNotSet");
  }

  const matches = await bcrypt.compare(String(args.password), user.password);
  if (!matches) {
    logger.info("Login attempt - Passwords don't match", { meta: args.email });
    throw Error("Error.UserPassword"); // generic error, do not say why
  }

  if (!user.emailVerified) {
    logger.info("Login attempt - Email not verified", args.email);
    throw Error("Error.EmailNotVerified");
  }
  // logger.mail("a user logged in... " + user.email);
  return startJWTSession(user, ctx);
};

function startJWTSession(user: User, ctx: Context): ResponseLogin {
  const jwtUser: JWTUser = pick(user, [
    "id",
    "email",
    "role",
    "schoolId",
    "teamId",
    "locale",
  ]);

  const token: string = jwt.sign({ user: jwtUser }, secret, {
    expiresIn: expires,
  });

  setRequestUser(user, ctx);
  return { token, user };
}

export function setRequestUser(user: User, ctx: Context): void {
  ctx.user = user;
}

export function getRequestUser(ctx: Context): User | undefined {
  return ctx.user;
}

export const createUser: FieldResolver<"Mutation", "createUser"> = async (
  _root,
  args,
  ctx: Context
) => {
  try {
    const { password, role, campaign, locale, redirect } = args.data;
    let { name, lastname } = args.data;
    const email = args.data.email?.toLowerCase();
    if (!email) throw new Error("Error.NoEmail");
    if (!name && !lastname) {
      [name, lastname] = extractName(email);
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = password
      ? await bcrypt.hash(String(password), salt)
      : undefined;
    if (role === Role.Admin) throw new Error("NAH");
    const user = await ctx.db.user.create({
      data: {
        name,
        lastname,
        email,
        password: hashed,
        role: role || undefined,
        campaign: campaign || undefined,
        locale: locale || undefined,
      },
    });

    await sendVerificationEmail(
      email,
      "verification",
      ctx.db,
      redirect,
      campaign
    );
    if (role === Role.Teacher)
      logger.mail(`New user created: ${name} ${lastname} <${email}>: ${role}`);

    // TODO: we need some cleanup here...
    // currently, we need to setRequestUser in order to return to the just created user
    // his own data. This goes through graphql-shield which will then check in the header
    // for a user.
    // However: if a logged-in teacher creates student-users, this same method here will be used
    // and we don't want to change the request header in this case...
    const loggedIn = getRequestUser(ctx);
    if (!loggedIn) {
      setRequestUser(user, ctx);
    }
    //setCookie(ctx.res, "NEXT_LOCALE", locale || "de");
    return user;
  } catch (err: any) {
    // eslint-disable-next-line
    if (err.meta?.target && err.meta.target.indexOf("email") >= 0) {
      throw new Error("Error.DuplicateEmail");
    }
    console.error(err);
    logger.error("Error creating user: ", err);
    throw new Error("Error.CreateUser");
  }
};

export const acceptInvite: FieldResolver<"Mutation", "acceptInvite"> = async (
  _root,
  args,
  ctx: Context
): Promise<Team> => {
  const team = await ctx.db.team.findUnique({ where: { invite: args.invite } });
  if (!team) throw new Error("Error.InviteNotFound");
  const user = getRequestUser(ctx);
  if (!user) throw new Error("Error.NeedsLogin");
  if (user.role !== Role.Student) {
    if (!args.force) throw new Error("Error.InviteTeacherRole");
    // update Role to Student, only if «force» argument is present
    await ctx.db.user.update({
      where: { id: user.id },
      data: { role: Role.Student },
    });
  }
  const success = await connectUserTeam(user, team, ctx);
  if (!success) throw new Error("Error.Database");

  await logActivity(ctx, {
    user: { connect: { id: user.id } },
    team: { connect: { id: team.id } },
    school: { connect: { id: String(user.schoolId) } },
    summary: getShortname(user),
    visibility: Visibility.Team,
    type: ActivityType.UserAccept,
  });
  return team;
};

export async function connectUserTeam(
  user: User,
  team: Team,
  ctx: Context
): Promise<User> {
  if (user.teamId) throw new Error("Error.AlreadyInTeam");
  return await ctx.db.user.update({
    where: { id: user.id },
    data: {
      team: { connect: { id: team.id } },
      school: { connect: { id: team.schoolId } },
    },
  });
}

// @ts-ignore: struggling with return type
export const createInvitedUser: FieldResolver<
  "Mutation",
  "createInvitedUser"
> = async (_root, args, ctx, info) => {
  const team = await ctx.db.team.findUnique({ where: { invite: args.invite } });
  if (!team) throw new Error("Error.InviteNotFound");
  const { name, lastname, email, password } = args;
  const newArgs = {
    data: {
      name,
      lastname,
      email: email?.toLowerCase(),
      password,
      role: Role.Student,
    },
  };
  const user = await createUser(_root, newArgs, ctx, info);
  await connectUserTeam(user as User, team, ctx);
  logger.info(`User ${email} created with invite code ${team.name}`);
  return user;
};

export const updateUser: FieldResolver<"Mutation", "updateUser"> = async (
  _root,
  args,
  ctx: Context
) => {
  const user = getRequestUser(ctx);
  const id = args.where.id;
  let data = args.data;
  if (!user || (id !== user.id && user.role !== Role.Admin))
    throw new Error("Error.OnlyUpdateSelf");

  // only allow these fields to be edited by normal users:
  if (user.role !== Role.Admin) {
    data = pick(data, ["name", "lastname", "gender", "year", "school"]);
  }
  const result = await ctx.db.user.update({
    where: { id: id || undefined },
    // @ts-ignore    TODO: this barks on a mismatch in the Gender Enum defined by Nexus and Prisma??!
    data,
  });
  return result;
};

export const deleteUser: FieldResolver<"Mutation", "deleteUser"> = async (
  _root,
  args,
  ctx
) => {
  const user = getRequestUser(ctx);
  const id = args.where.id;
  const deleteUser = await ctx.db.user.findUnique({
    where: { id: String(id) },
    include: { team: true },
  });
  if (!deleteUser) throw new Error("Error.UserNotFound");
  if (deleteUser.team?.teacherId !== user?.id && user?.role !== Role.Admin)
    throw new Error("Error.NoPermission");
  const success = await ctx.db.user.delete({ where: { id: String(id) } });
  if (!success) throw new Error("Error.Database");
  return success;
};
export const setSchool: FieldResolver<"Mutation", "setSchool"> = async (
  _root,
  args,
  ctx,
  info
) => {
  const user = getRequestUser(ctx);
  const updated = await updateUser(
    _root,
    {
      data: { school: { connect: { id: args.school } } },
      where: { id: user?.id },
    },
    ctx,
    info
  );
  return updated;
};

type JWTUser = {
  id: string;
  role: Role;
  locale: string;
  email: string | null;
  schoolId?: string | null;
  teamId?: string | null;
};

export function getSessionUser(req: NextApiRequest): JWTUser | undefined {
  // what about req.body.token || req.query.token ?
  // const token = req.headers.get("x-access-token");
  // @ts-ignore
  // eslint-disable-next-line
  const token = req.headers["x-access-token"];

  if (typeof token === "string" && token != "null") {
    const jwt = verifyJWT(token);
    return jwt?.user;
  }
}

export async function getUser(ctx: Context): Promise<User | null> {
  try {
    const user = getRequestUser(ctx);
    if (user?.id) {
      return await ctx.db.user.findUnique({ where: { id: user?.id } });
    }
    return null;
  } catch (err: any) {
    logger.info("error calling /me", err);
    return null;
  }
}

type JWTSession = {
  user: JWTUser;
};

export function verifyJWT(token: string): JWTSession | undefined {
  try {
    const result = jwt.verify(token, secret, { algorithms: ["HS256"] });
    if (typeof result !== "object") {
      throw new Error("JWT Token was string instead of object");
    }
    if ("user" in result) return result as JWTSession;
    else throw new Error("No user in JWT Session");
  } catch (err: any) {
    if (err.message !== "jwt expired")
      logger.info(`Error verifying token: '${token}'`, err.message);
    return undefined;
  }
}

// purpose: ["verification", "reset", "login", "spielpolitik"]
export async function sendVerificationEmail(
  email: string,
  purpose: string,
  db: PrismaClient,
  redirect?: string | null,
  template?: string | null
): Promise<ResponseLogin> {
  try {
    email = email.toLowerCase();
    const from = process.env.EMAIL;
    if (!from)
      throw new Error("Please define EMAIL env variable (sender-email)");

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      logger.info(`Error sending ${purpose} email to: ${email}`);
      return { token: "MAYBE..." };
    }

    const site = `voty${
      process.env.NODE_ENV !== "production" ? process.env.NODE_ENV : ""
    }`;
    const token = await createVerificationToken(db, email);
    const localePath = user.locale != "de" ? user.locale + "/" : "";
    const base = `${process.env.BASE_URL}${localePath}`;
    let url = `${base}user/verify?t=${token}&p=${purpose}`;
    if (redirect) {
      url += "&redirect=" + encodeURI(redirect);
    }

    const subjects: Record<string, string> = {
      verification: translate("Emails.Subject.Verify", user.locale),
      reset: translate("Emails.Subject.Reset", user.locale),
      login: translate("Emails.Subject.Login", user.locale),
      spielpolitik: translate("Emails.Subject.Spielpolitik", user.locale),
    };
    const subject = template ? subjects[template] : subjects[purpose];
    const conf = { email: email.replace(/\./g, ".&#8203;"), url, site };

    template = template || purpose;

    await sendMail({
      from,
      to: email,
      subject,
      template,
      locale: user.locale,
      data: conf,
    });
    logger.info(`Sending ${template} email to: ${email} `);

    if (process.env.NODE_ENV !== "production") {
      await fs.writeFile("/tmp/voty-verification-url", url);
    }

    return { token: "MAYBE..." };
  } catch (err: any) {
    logger.error(`Error sending ${purpose} email`, err);
    throw Error("Error.SendEmailVerification");
  }
}

async function createVerificationToken(
  prisma: PrismaClient,
  identifier: string
) {
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

export const checkVerification: FieldResolver<
  "Mutation",
  "checkVerification"
> = async (_root, args, ctx): Promise<ResponseLogin> => {
  if (!args.token) throw new Error("Error.NoToken");
  const found = await verifyToken(args.token, ctx.db);

  if (!found) {
    throw Error("Error.TokenNotFound");
  }
  const email = found.identifier;
  const user = await ctx.db.user.findUnique({ where: { email } });
  const wasVerified = user?.emailVerified;

  if (!user) {
    throw Error("Error.EmailNotFound");
  }

  if (!wasVerified) {
    await ctx.db.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    if (user.role === Role.Teacher) {
      const from = String(process.env.EMAIL);
      const subject = "Willkommen bei voty.ch";
      await sendMail({
        from,
        to: email,
        subject,
        template: "welcome_teacher",
        locale: user.locale,
      });
      logger.info(`Sending welcome email to teacher: ${email} `);
    }

    if (user.teamId) {
      ctx.user = user;
      await logActivity(ctx, {
        user: { connect: { id: user.id } },
        team: { connect: { id: user.teamId } },
        school: { connect: { id: String(user.schoolId) } },
        visibility: Visibility.Team,
        type: ActivityType.UserAccept,
      });
    }
  }
  return startJWTSession(user, ctx);
};

export const changePassword: FieldResolver<
  "Mutation",
  "changePassword"
> = async (_root, args, ctx): Promise<ResponseLogin> => {
  const user = await getUser(ctx);
  if (!user) throw new Error("Error.UserNotFound");
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(String(args.password), salt);
  const ok = await ctx.db.user.update({
    where: { id: user.id },
    data: { password: hashed },
  });
  if (ok) {
    return startJWTSession(user, ctx);
  } else {
    throw Error("Error.PasswordChange");
  }
};

async function verifyToken(token: string, prisma: PrismaClient) {
  const hashed = createHash("sha256").update(`${token}${secret}`).digest("hex");
  const found = await prisma.verificationRequest.findUnique({
    where: { token: hashed },
  });
  if (!found) return undefined;
  if (found.expires.getMilliseconds() > Date.now()) return undefined;
  void deleteExpiredTokens(prisma);
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

export const deleteAccount: FieldResolver<"Mutation", "deleteAccount"> = async (
  _root,
  args,
  ctx: Context
) => {
  try {
    const user = await getUser(ctx);
    if (!user) throw new Error("Error.NeedsLogin");

    // delete classes (with BallotRuns) from this teacher
    if (user.role === Role.Teacher) {
      await ctx.db.ballotRun.deleteMany({
        where: { team: { teacherId: user.id } },
      });
      await ctx.db.team.deleteMany({ where: { teacherId: user.id } });
    }

    // delete things the user has contributed
    await ctx.db.voted.deleteMany({ where: { userId: user.id } });
    await ctx.db.attachment.deleteMany({ where: { userId: user.id } });
    await ctx.db.reaction.deleteMany({ where: { userId: user.id } });
    await ctx.db.discussion.deleteMany({ where: { userId: user.id } });

    const deleted = await ctx.db.user.delete({ where: { id: user.id } });
    if (!deleted) throw new Error("Error.CannotDeleteAccount");
    return { success: true };
  } catch (err: any) {
    logger.warn("Error deleting user: ", err);
    throw new Error("Error.CannotDeleteAccount");
  }
};

export function extractName(email: string): [string, string] {
  const [name, lastname] = email.substring(0, email.indexOf("@")).split(".");
  return [upperFirst(name), upperFirst(lastname)];
}
