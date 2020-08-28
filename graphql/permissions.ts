import { shield, rule, allow, deny, and, or } from "nexus-plugin-shield";

const isUser = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    // @ts-ignore
    if (!ctx.req || !ctx.req.user) return false; // @ts-ignore
    return ctx.req.user !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    return false; // @ts-ignore
    return ctx.req.user.role === "ADMIN";
  }
);

const isOwn = rule({ cache: "strict" })(
  async (parent, args, ctx: NexusContext, info) => {
    // @ts-ignore
    if (!ctx.req || !ctx.req.user) return false; // @ts-ignore
    return ctx.req.user !== null;
  }
);

export const permissions = shield({
  rules: {
    Query: {
      schools: isUser,
      school: isUser,
      teams: isUser,
      me: allow,
    },
    Mutation: {
      login: allow,
      createUser: allow,
      emailVerification: allow,
      checkVerification: allow,
      changePassword: isUser,
    },
    School: isUser,
    MinUser: allow,
    User: or(isOwn, isAdmin),
    Team: isUser,
    ResponseLogin: allow,
  },
  options: {
    allowExternalErrors: true,
    debug: process.env.NODE_ENV !== "production",
    fallbackRule: deny,
  },
});
