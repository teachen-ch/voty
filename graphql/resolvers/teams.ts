import { createUser, connectUserTeam } from "./users";
import { Role } from "@prisma/client";
import { randomBytes } from "crypto";
import { upperFirst } from "lodash";
import { FieldResolver } from "nexus/components/schema";
import { User } from "@prisma/client";

export const inviteStudents: FieldResolver<
  "Mutation",
  "inviteStudents"
> = async (_root, args, ctx) => {
  const { team: id, emails } = args;
  const user = ctx.user;
  const errors: string[] = [];
  const success: string[] = [];

  let team = await ctx.db.team.findOne({ where: { id } });
  if (!team) throw Error("ERR_TEAM_NOT_FOUND");
  if (!user) throw Error("ERR_NEEDS_LOGIN");
  if (team.teacherId !== user.id) throw Error("ERR_NOT_YOUR_TEAM");

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
      success.push(email);
    } catch (err) {
      errors.push(email);
    }
  }

  team = await ctx.db.team.findOne({
    where: { id },
    include: { members: true, school: true },
  });
  return team;
};
