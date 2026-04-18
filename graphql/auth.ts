import { Role, User, Team } from "@prisma/client";
import type { Context } from "./context";

// True when the current teacher teaches the given student user.
// Runs a DB query, so callers should treat this as async.
async function teachesStudent(
  student: Pick<User, "id">,
  ctx: Context
): Promise<boolean> {
  if (!ctx.user) return false;
  const { id, role } = ctx.user;
  if (role !== Role.Teacher) return false;
  if (student.id === id) return true;
  const found = await ctx.db.user.findMany({
    where: { id: student.id, team: { teacher: { id } } },
  });
  return found.length > 0;
}

// Field-level authScopes helpers. Each returns a boolean (or Promise<boolean>)
// — scope-auth treats truthy as "granted", falsy as "denied".

// User-type fields exposing personal details (email, lastname, ballots, …).
// Allowed to self, to the teacher of this student, or to admins.
export const canViewUserDetails = async (
  parent: User,
  _args: unknown,
  ctx: Context
): Promise<boolean> => {
  if (ctx.user?.role === Role.Admin) return true;
  if (parent.id === ctx.user?.id) return true;
  return teachesStudent(parent, ctx);
};

// Query.user — admin or teacher-of-student, checked against args.where.id.
export const canReadUser = async (
  _parent: unknown,
  args: { where?: { id?: string | null } | null },
  ctx: Context
): Promise<boolean> => {
  if (ctx.user?.role === Role.Admin) return true;
  const id = args.where?.id;
  if (!id) return false;
  return teachesStudent({ id }, ctx);
};

// Mutation.updateUser — the user themselves, or admin.
export const canUpdateUser = (
  _parent: unknown,
  args: { where?: { id?: string | null } | null },
  ctx: Context
): boolean => {
  if (ctx.user?.role === Role.Admin) return true;
  return !!ctx.user && ctx.user.id === args.where?.id;
};

// Team.invite / Team.code — only the team's teacher or admins.
export const isTeamTeacherOrAdmin = (
  parent: Team,
  _args: unknown,
  ctx: Context
): boolean => {
  if (ctx.user?.role === Role.Admin) return true;
  return parent.teacherId === ctx.user?.id;
};

// Team.members — members of the team, the teacher, or admins.
export const isTeamMemberOrAdmin = (
  parent: Team,
  _args: unknown,
  ctx: Context
): boolean => {
  if (!ctx.user) return false;
  if (ctx.user.role === Role.Admin) return true;
  if (ctx.user.teamId === parent.id) return true;
  if (ctx.user.id === parent.teacherId) return true;
  return false;
};
