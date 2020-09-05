import { shield, rule, allow, deny, or } from "nexus-plugin-shield";
import { getUserHeader } from "../util/authentication";

// rule caching: "no_cache", "contextual" (relies on context, eg. authentication,
// or "strict": relies on parent or args
const isUser = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    const { userId, role } = getUserHeader(ctx);
    // TODO: userId = 0 does not work here.
    return userId ? true : false;
  }
);

const isTeacher = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    const { userId, role } = getUserHeader(ctx);
    switch (role) {
      case "TEACHER":
      case "PRINCIPAL":
      case "ADMIN":
        return true;
      default:
        return false;
    }
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    const { userId, role } = getUserHeader(ctx);
    return role === "ADMIN";
  }
);

// team members can view team
const isTeamMember = rule({ cache: "strict" })(
  async (parent, args, ctx: NexusContext, info) => {
    const { userId, role } = getUserHeader(ctx);
    if (!userId) return false;
    const user = await ctx.db.user.findOne({ where: { id: userId } });
    return user && user.teamId === parent.id;
  }
);

// Teacher may view his students
const isTeamTeacher = rule({ cache: "strict" })(
  async (parent, args, ctx: NexusContext, info) => {
    const { userId, role } = getUserHeader(ctx);
    if (!userId || role !== "TEACHER") return false;
    const student = parent.id;
    const teacher = userId;
    const found = await ctx.db.user.findMany({
      where: { id: { equals: student }, team: { teacher: { id: teacher } } },
    });
    return found.length ? true : false;
  }
);

// check for parent.id, or parent.schoolId, or parent.teacherId...
const isOwn = (field) =>
  rule(`own-${field}`, { cache: "strict" })(
    async (parent, args, ctx: NexusContext, info) => {
      const { userId, role } = getUserHeader(ctx);
      if (!userId) return false;
      return parent[field] === userId;
    }
  );

export const permissions = shield({
  rules: {
    Query: {
      user: isAdmin,
      users: isAdmin,
      me: allow,
      school: allow,
      schools: isUser,
      team: allow,
      teams: isUser,
    },
    Mutation: {
      login: allow,
      createUser: allow, // default crud.createOneUser
      createInvitedUser: allow, // create user with invite-code
      emailVerification: allow, // send out email (verification, pw, login)
      checkVerification: allow, // check, wether email code is still valid
      changePassword: isUser, // actual password change
      acceptInvite: isUser, // accept team invite if already logged in
      createOneTeam: or(isTeacher, isAdmin),
      deleteOneTeam: or(isTeamTeacher, isAdmin),
      createOneSchool: isTeacher,
      deleteOneSchool: isAdmin,
    },
    User: {
      id: isUser,
      name: isUser,
      shortname: isUser,
      role: isUser,
      image: isUser,
      gender: isUser,
      school: isUser,
      team: isUser,
      teaches: isUser,
      lastname: or(isOwn("id"), isTeamTeacher, isAdmin),
      email: or(isOwn("id"), isTeamTeacher, isAdmin),
      ballots: or(isOwn("id"), isTeamTeacher, isAdmin),
      attachments: or(isOwn("id"), isTeamTeacher, isAdmin),
      threads: or(isOwn("id"), isTeamTeacher, isAdmin),
      reactions: or(isOwn("id"), isTeamTeacher, isAdmin),
    },
    School: {
      id: allow,
      name: allow,
      city: allow,
      zip: allow,
      teams: allow,
    },
    Team: {
      id: allow,
      name: allow,
      school: allow,
      invite: isOwn("teacherId"),
      "*": isUser,
    },
    ResponseLogin: allow,
  },
  options: {
    allowExternalErrors: true,
    debug: true,
    fallbackRule: deny,
  },
});
