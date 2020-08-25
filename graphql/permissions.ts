import { shield, rule, allow, deny, and, or } from "nexus-plugin-shield";

const isUser = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    console.log("IS USER???", ctx.req.user);
    if (!ctx.req || !ctx.req.user) return true;
    console.log(ctx.req.user);
    return ctx.req.user !== null;
  }
);
const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx: NexusContext, info) => {
    return false;
    return ctx.req.user.role === "ADMIN";
  }
);

export const permissions = shield({
  rules: {
    Query: {
      schools: allow,
      school: allow,
      teams: allow,
    },
    School: allow,
    User: isUser,
    Team: allow,
  },
  options: {
    fallbackRule: deny,
  },
});
