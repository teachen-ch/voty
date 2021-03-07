import { createUser, connectUserTeam } from "./users";
import { FieldResolver } from "@nexus/schema";
import { Role, PrismaClient, Visibility, ActivityType } from "@prisma/client";
import { upperFirst, find, uniq, findIndex } from "lodash";
import { User as PrismaUser } from "@prisma/client";
import { fetchMails } from "../../util/imap";
import logger from "../../util/logger";
import { logActivity } from "./activities";
import type { User, ProgressCard, ProgressStudent } from "graphql/types";

export const inviteStudents: FieldResolver<
  "Mutation",
  "inviteStudents"
> = async (_root, args, ctx) => {
  const { team: id, emails } = args;
  const user = ctx.user;
  let failed: string[] = [];
  const created: string[] = [];
  const duplicated: string[] = [];

  let team = await ctx.db.team.findUnique({ where: { id } });
  if (!team) throw Error("Error.TeamNotFound");
  if (!user) throw Error("Error.NeedsLogin");
  if (team.teacherId !== user.id) throw Error("Error.NotYourTeam");

  for (let i = 0; i < emails.length; ++i) {
    const email = emails[i];
    const [name, lastname] = email.substring(0, email.indexOf("@")).split(".");

    const args = {
      data: {
        email,
        name: upperFirst(name),
        lastname: upperFirst(lastname),
        role: Role.Student,
        password: "", // login is not possible with empty password, but we can send user magic link
      },
    };
    try {
      const invited = await createUser(_root, args, ctx, undefined as any);
      await connectUserTeam(invited as PrismaUser, team, ctx);
      created.push(email);
    } catch (err) {
      if (err.message === "Error.DuplicateEmail") {
        duplicated.push(email);
      } else {
        failed.push(email);
      }
    }
  }

  team = await ctx.db.team.findUnique({
    where: { id },
    include: { members: true, school: true },
  });

  // wait for a few seconds, then fetch all error-msgs from imap since last 20 seconds
  // but skip this, if we haven't sent any emails
  if (process.env.SMTP_PASSWORD) {
    const wait = 5 + 0.5 * emails.length;
    await sleep(wait);
    const fetchedErrors = await fetchErrors(emails, ctx.db, 2 * wait);
    failed = failed.concat(fetchedErrors);
  }

  if (created.length > 0) {
    await logActivity(ctx, {
      user: { connect: { id: user.id } },
      team: { connect: { id: String(team?.id) } },
      school: { connect: { id: String(user.schoolId) } },
      summary:
        created.length === 1 ? "eine Person" : `${created.length} Personen`,
      visibility: Visibility.Team,
      type: ActivityType.UserInvite,
    });
  }
  logger.mail(`New users invited for ${team?.id}:\n
    ## Created:
    ${created.join(", ")}

    ## Failed:
    ${failed.join(", ")}

    ## Duplicated:
    ${duplicated.join(", ")}`);
  return { created, failed, duplicated, team };
};

async function fetchErrors(emails: string[], db: PrismaClient, since: number) {
  try {
    const failed: string[] = [];
    // find all messages from the last 60 seconds from mailer-daemon
    const messages = await fetchMails({
      // from: "MAILER-DAEMON@mistral2.metanet.ch",
      since,
    });
    for (const msg of messages) {
      const match = msg.body.match(/Final-Recipient: rfc822; (.*?)\r\n/gs);
      if (!match || match.length < 1) {
        logger.warn(`Can't find Final-Recipient in mail ${msg.header.date}`);
        continue;
      }
      const email = match[0].replace(/.*?; (.*?)\r\n/, "$1");
      if (emails.indexOf(email) === -1) {
        continue;
      }

      const user = await db.user.findUnique({ where: { email } });
      if (!user || !user.email) {
        logger.warn(`handleErrorMessage: Can't find user ${email}`);
        continue;
      }
      await db.user.delete({ where: { email } });
      failed.push(user.email);
    }
    return failed;
  } catch (err) {
    console.error(err);
    logger.warn("Error fetching email", err);
    return [];
  }
}

export const deleteOneTeam: FieldResolver<"Mutation", "deleteOneTeam"> = async (
  _root,
  args,
  ctx
) => {
  const { where } = args;
  const id = String(where.id);
  const user = ctx.user;
  const team = await ctx.db.team.findFirst({ where: { id } });
  if (!user || (user.role !== Role.Admin && team?.teacherId !== user.id))
    throw new Error("Error.NoPermission");
  const success = ctx.db.team.delete({ where: { id } });
  return success;
};

export const setPrefs: FieldResolver<"Mutation", "setPrefs"> = async (
  _root,
  args,
  ctx
) => {
  const { teamId } = args;
  const team = await ctx.db.team.update({
    where: { id: teamId },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: { prefs: args.prefs },
  });
  return team;
};

export const setNotes: FieldResolver<"Mutation", "setNotes"> = async (
  _root,
  args,
  ctx
) => {
  const { teamId } = args;
  const team = await ctx.db.team.update({
    where: { id: teamId },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: { notes: args.notes },
  });
  return team;
};

export const progress: FieldResolver<"Query", "progress"> = async (
  _root,
  args,
  ctx
) => {
  const { teamId } = args;
  const user = ctx.user;
  const team = await ctx.db.team.findFirst({
    where: { id: teamId },
    include: { members: true },
  });

  if (!user || !team) throw new Error("Error.NoPermission");

  if (user.id !== team?.teacherId || user.role === Role.Admin)
    throw new Error("Error.NoPermission");

  // load all works for this team
  const works = await ctx.db.work.findMany({
    where: { team: { id: teamId } },
    include: { users: true },
  });
  const teamCards = team.cards.split(" ");
  const cards: ProgressCard[] = [];
  const students: ProgressStudent[] = [];

  // initialize students
  team.members.forEach((user) =>
    students.push({ id: user.id, email: user.email, done: [], due: [] })
  );

  // initialize cards
  teamCards.forEach((card) =>
    cards.push({
      id: card,
      done: [] as User[],
      due: [] as User[],
    })
  );

  works.forEach((work) => {
    const item = find(cards, { id: work.card });
    work.users.forEach((user) => {
      item?.done?.push((user as any) as User);
      const student = find(students, { id: user.id });
      student?.done?.push(work.card);
    });
  });
  // quite hacky type juggling...
  // we compute card.due from all students which don't have the card.id in their student.done
  cards.forEach((card) => {
    card.due = students
      .filter((student) => student.done?.indexOf(String(card.id)) === -1)
      .map((user) => {
        return { id: user.id, email: user.email, role: Role.Student };
      }) as User[];
    // filter out duplicate students
    card.done = card.done?.filter(
      (s, i) =>
        findIndex(card.done, (t) => t?.id === s?.id) === i && s?.id !== user.id
    );
  });
  // likewise we compute student.due
  students.forEach((student) => {
    student.due = teamCards.filter(
      (card) => student.done?.indexOf(card) === -1
    );
  });
  return { cards, students };
};

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

export async function getTeacherTeams(
  user: PrismaUser,
  db: PrismaClient
): Promise<string[]> {
  const teams = await db.team.findMany({ where: { teacherId: user.id } });
  return teams.map((team) => team.id);
}
