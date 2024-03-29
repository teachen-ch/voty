import { shield, rule, allow, or } from "graphql-shield";
import { User, Role } from "@prisma/client";
import { ballots } from "./resolvers";
import { NexusGenFieldTypes } from "graphql/nexus";
import type { Context } from "./context";

// rule caching: "no_cache", "contextual" (relies on context, eg. authentication,
// or "strict": relies on parent or args
const isUser = rule({ cache: "contextual" })((parent, args, ctx: Context) => {
  return ctx.user?.id !== undefined;
});

const isTeacher = rule({ cache: "contextual" })(
  (parent, args, ctx: Context) => {
    switch (ctx.user?.role) {
      case Role.Teacher:
      case Role.Principal:
      case Role.Admin:
        return true;
      default:
        return false;
    }
  }
);

const isAdmin = rule({ cache: "contextual" })((parent, args, ctx: Context) => {
  return ctx.user?.role === Role.Admin;
});

// team members can view team
const isTeamMember = rule({ cache: "strict" })((parent, args, ctx: Context) => {
  if (!ctx.user) return false;
  const { id, teamId } = ctx.user;
  // check if student is part of team
  if (teamId === parent.id) return true;
  // check if teacher teaches this team
  if (id === parent.teacherId) return true;
  return false;
});

// Teacher may view his students
const teachesStudent = rule({ cache: "strict" })(
  async (parent: User, args, ctx: Context) => {
    const { id, role } = ctx.user || {};
    if (!id || role !== Role.Teacher) return false;
    if (!parent.role)
      throw new Error("teachesStudent can only be applied to Users");
    const student = parent.id;
    const teacher = id;
    if (student === teacher) return true;
    const found = await ctx.db.user.findMany({
      where: { id: { equals: student }, team: { teacher: { id: teacher } } },
    });
    return found.length ? true : false;
  }
);

// check for parent.id, or parent.schoolId, or parent.teacherId...
const isOwn = (field: string) =>
  rule(`own-${field}`, { cache: "strict" })((parent, args, ctx: Context) => {
    if (!ctx.user) return false;
    const { id } = ctx.user;
    if (field in parent) {
      // eslint-disable-next-line
      return parent[field] === id;
    } else return false;
  });

const isOwnId = isOwn("id");
const isTeamTeacher = isOwn("teacherId");

const updateUserCheck = rule({ cache: "strict" })(
  (parent, args, ctx: Context) => {
    if (ctx.user?.role === Role.Admin) return true;
    if (ctx.user && ctx.user.id === args.where?.id) return true;
    else return false;
  }
);

export const canViewBallot = rule({ cache: "strict" })(
  async (parent: NexusGenFieldTypes["Ballot"], args, ctx: Context) => {
    if (ctx.user?.role === Role.Admin) return true;
    return await ballots.viewPermission({
      ballot: parent,
      user: ctx.user,
      db: ctx.db,
    });
  }
);

export const permissions = shield(
  {
    Query: {
      user: or(isAdmin, teachesStudent),
      users: or(isAdmin, isTeacher),
      me: allow,
      school: allow,
      schools: isUser,
      team: allow,
      teams: isUser,
      ballot: allow,
      ballots: allow,
      getBallotRuns: allow,
      getBallotResults: allow,
      getTeamDiscussions: isUser,
      swissvotes: allow,
      cards: allow,
      attachments: isUser, // is filtered according to user's team(s)
      works: isUser, // is already filtered according to work.visibility and user's school / team
      activities: isUser, // is filtered according to user's team(s)
      progress: or(isAdmin, isTeacher),
      stats: isAdmin,
    },
    Mutation: {
      login: allow,
      magic: allow,
      createUser: allow, // default crud.createOneUser
      createInvitedUser: allow, // create user with invite-code
      emailVerification: allow, // send out email (verification, pw, login)
      checkVerification: allow, // check, wether email code is still valid
      changePassword: isUser, // actual password change
      acceptInvite: isUser, // accept team invite if already logged in
      createOneTeam: or(isTeacher, isAdmin),
      deleteOneTeam: or(isTeacher, isAdmin),
      createOneSchool: isTeacher,
      deleteOneSchool: isAdmin,
      updateUser: or(updateUserCheck, isAdmin),
      setSchool: isUser,
      vote: isUser,
      voteCode: allow,
      inviteStudents: isTeacher,
      addBallotRun: isTeacher,
      removeBallotRun: isTeacher,
      startBallotRun: isTeacher,
      endBallotRun: isTeacher,
      deleteAccount: isUser,
      deleteUser: or(isAdmin, isTeacher),
      postDiscussion: isUser,
      setCards: isTeacher,
      postWork: isUser,
      deleteWork: isUser,
      postActivity: isUser,
      setPrefs: or(isTeacher, isAdmin),
      setNotes: or(isTeacher, isAdmin),
      createOneBallot: isAdmin,
      deleteOneBallot: isAdmin,
      updateOneBallot: isAdmin,
    },
    User: {
      id: isUser,
      name: isUser,
      shortname: isUser,
      role: isUser,
      image: isUser,
      gender: isUser,
      year: isUser,
      school: isUser,
      team: isUser,
      teaches: isUser,
      emailVerified: isUser,
      locale: isUser,
      campaign: isUser,
      lastname: or(isOwnId, teachesStudent, isAdmin),
      email: or(isOwnId, teachesStudent, isAdmin),
      ballots: or(isOwnId, teachesStudent, isAdmin),
      attachments: or(isOwnId, teachesStudent, isAdmin),
      discussions: or(isOwnId, teachesStudent, isAdmin),
      reactions: or(isOwnId, teachesStudent, isAdmin),
      createdAt: isAdmin,
    },
    School: {
      id: allow,
      name: allow,
      type: allow,
      address: allow,
      city: allow,
      zip: allow,
      canton: allow,
      teams: allow,
      members: isAdmin,
    },
    Team: {
      id: allow,
      name: allow,
      school: allow,
      cards: allow,
      prefs: allow,
      notes: allow,
      teacherId: allow, // needed to check if invite is by own teacher
      invite: or(isTeamTeacher, isAdmin),
      code: or(isTeamTeacher, isAdmin),
      members: or(isTeamMember, isAdmin),
      "*": isUser,
    },
    Discussion: allow,
    Attachment: allow,
    Ballot: allow, //canViewBallot : if we want to protect class/school Ballots
    BallotRun: allow,
    BallotResults: allow,
    ResponseLogin: allow,
    InviteResponse: allow,
    Response: allow,
    Vote: isUser,
    Swissvote: allow,
    Card: allow,
    Work: allow,
    Activity: allow,
    ResponseProgress: allow,
    ProgressCard: allow,
    ProgressStudent: allow,
  },
  {
    allowExternalErrors: true,
    debug: true,
    fallbackRule: isAdmin,
  }
);
