// @ts-nocheck
import { createUser, connectUserTeam } from "./users";
import { Role, PrismaClient } from "@prisma/client";
import { upperFirst } from "lodash";
import { User } from "@prisma/client";
import { fetchMails } from "../../util/imap";
import logger from "../../util/logger";

export const inviteStudents = async (_root, args, ctx) => {
  const { team: id, emails } = args;
  const user = ctx.user;
  let failed: string[] = [];
  const created: string[] = [];
  const duplicated: string[] = [];

  let team = await ctx.db.team.findOne({ where: { id } });
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
      await connectUserTeam(invited as User, team, ctx);
      created.push(email);
    } catch (err) {
      if (err.message === "Error.DuplicateEmail") {
        duplicated.push(email);
      } else {
        failed.push(email);
      }
    }
  }

  team = await ctx.db.team.findOne({
    where: { id },
    include: { members: true, school: true },
  });

  // wait for a few seconds, then fetch all error-msgs from imap since last 20 seconds
  // but skip this, if we haven't sent any emails
  if (process.env.SMTP_PASSWORD) {
    const wait = 5 + 1 * emails.length;
    await sleep(wait);
    const fetchedErrors = await fetchErrors(emails, ctx.db, 2 * wait);
    failed = failed.concat(fetchedErrors);
  }

  return { created, failed, duplicated, team };
};

async function fetchErrors(emails: string[], db: PrismaClient, since: number) {
  try {
    const failed: string[] = [];
    // find all messages from the last 60 seconds from mailer-daemon
    const messages = await fetchMails({
      from: "MAILER-DAEMON@mistral2.metanet.ch",
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

      const user = await db.user.findOne({ where: { email } });
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

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}
