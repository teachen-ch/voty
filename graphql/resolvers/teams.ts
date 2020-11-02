// @ts-nocheck
import { createUser, connectUserTeam } from "./users";
import { Role } from "@prisma/client";
import { randomBytes } from "crypto";
import { upperFirst } from "lodash";
import { User } from "@prisma/client";

export const inviteStudents = async (_root, args, ctx) => {
  const { team: id, emails } = args;
  const user = ctx.user;
  const failed: string[] = [];
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
        password: randomBytes(16).toString("hex"),
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
  return { created, failed, duplicated, team };
};
