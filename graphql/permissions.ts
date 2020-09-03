import { shield, rule, allow, deny, or } from "nexus-plugin-shield";

// rule caching: "no_cache", "contextual" (relies on context, eg. authentication,
// or "strict": relies on parent or args
const isUser = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    // @ts-ignore
    return ctx.req?.user !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    // @ts-ignore
    return ctx.req?.user?.role === "ADMIN";
  }
);

// team members can view team
const isTeamMember = rule({ cache: "strict" })(
  async (parent, args, ctx: NexusContext, info) => {
    // @ts-ignore
    return ctx.req?.user && ctx.req?.user?.teamId === parent.id;
  }
);

// Teacher may view his students
const isTeacher = rule({ cache: "strict" })(
  async (parent, args, ctx: NexusContext, info) => {
    // @ts-ignore
    if (!ctx.req?.user || ctx.req.user.role !== "TEACHER") return false; // @ts-ignore
    const student = parent.id; // @ts-ignore
    const teacher = ctx.req.user.id;
    const found = await ctx.db.user.findMany({
      where: { id: { equals: student }, team: { teacher: { id: teacher } } },
    });
    // console.log("Teacher? ", student, found.length);
    return found.length ? true : false;
  }
);

// check for parent.id, or parent.schoolId, or parent.teacherId...
const isOwn = (field) =>
  rule(`own-${field}`, { cache: "strict" })(
    async (parent, args, ctx: NexusContext, info) => {
      // console.log("is own...", parent[field] === ctx.req.user.id);
      // @ts-ignore
      if (!ctx.req || !ctx.req.user) return false; // @ts-ignore
      return parent[field] === ctx.req.user.id;
    }
  );

export const permissions = shield({
  rules: {
    Query: {
      "*": isUser,
    },
    Mutation: {
      login: allow,
      createUser: allow,
      emailVerification: allow,
      checkVerification: allow,
      changePassword: isUser,
      "*": isUser,
    },
    School: isUser,
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
      lastname: or(isOwn("id"), isTeacher, isAdmin),
      email: or(isOwn("id"), isTeacher, isAdmin),
      ballots: or(isOwn("id"), isTeacher, isAdmin),
      attachments: or(isOwn("id"), isTeacher, isAdmin),
      threads: or(isOwn("id"), isTeacher, isAdmin),
      reactions: or(isOwn("id"), isTeacher, isAdmin),
    },
    Team: isUser,
    ResponseLogin: allow,
  },
  options: {
    allowExternalErrors: true,
    debug: true,
    fallbackRule: deny,
  },
});
