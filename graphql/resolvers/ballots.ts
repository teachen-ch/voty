import {
  Role,
  BallotScope,
  User,
  PrismaClient,
  Prisma,
  ActivityType,
  Visibility,
} from "@prisma/client";
import { randomBytes } from "crypto";
import { setCookie, getCookie } from "../../util/cookies";
import {
  FieldResolver,
  RootValue,
} from "@nexus/schema/dist/typegenTypeHelpers";
import { logActivity } from "./activities";

export const canVote: FieldResolver<"Ballot", "canVote"> = async (
  _root,
  args,
  ctx
): Promise<boolean> => {
  const ballot = _root;
  const user = ctx.user;
  return await votingPermission({ ballot, user, db: ctx.db });
};

export const hasVoted: FieldResolver<"Ballot", "hasVoted"> = async (
  _root,
  args,
  ctx
): Promise<boolean> => {
  const ballot = _root;
  const user = ctx.user;
  return await getHasVoted({ ballot, user, db: ctx.db });
};

export const vote: FieldResolver<"Mutation", "vote"> = async (
  _root,
  args,
  ctx
) => {
  const { ballotId, vote } = args;
  const ballot = await ctx.db.ballot.findUnique({ where: { id: ballotId } });
  const user = await ctx.db.user.findUnique({
    where: { id: ctx.user?.id },
    include: { school: true, team: true },
  });
  if (!user) throw new Error("Error.VotingNeedsLogin");
  if (!ballot) throw new Error("Error.BallotNotFound");
  if (!(await votingPermission({ ballot, user, db: ctx.db }))) {
    throw new Error("Error.VotingNotAllowed");
  }

  // TODO: This should be e.g. the id of the vote hashed client side with users password
  const signature = randomBytes(32).toString("hex");
  await ctx.db.voted.create({
    data: {
      user: { connect: { id: user.id } },
      team: { connect: { id: user.team?.id } },
      ballot: { connect: { id: ballot.id } },
      signature,
    },
  });

  // TODO: This should something which allows the user to check his vote was counter
  const verify = randomBytes(32).toString("hex");
  const result = await ctx.db.vote.create({
    data: {
      ballot: { connect: { id: ballot.id } },
      vote,
      verify,
      year: user.year || user.team?.year,
      canton: user.canton || user.school?.canton,
      schooltype: user.school?.type,
      school: { connect: { id: user.school?.id || user.team?.schoolId } },
      team: { connect: { id: user.team?.id } },
    },
    include: { ballot: true },
  });

  await logActivity(ctx, {
    user: { connect: { id: user.id } },
    team: { connect: { id: String(user.team?.id) } },
    school: { connect: { id: String(user.schoolId) } },
    visibility: Visibility.Team,
    type: ActivityType.Vote,
  });
  return result;
};

export const voteCode: FieldResolver<"Mutation", "voteCode"> = async (
  _root,
  args,
  ctx
) => {
  const { ballotRunId, vote, code } = args;
  const ballotRun = await ctx.db.ballotRun.findUnique({
    where: { id: ballotRunId },
    include: {
      team: {
        include: { school: { select: { id: true, type: true, canton: true } } },
      },
      ballot: true,
    },
  });
  if (!ballotRun) throw new Error("Error.BallotrunNotFound");

  const ballot = ballotRun.ballot;
  const user = ctx.user;
  if (user && (await getHasVoted({ ballot, user, db: ctx.db }))) {
    throw new Error("Error.AlreadyVoted");
  }

  const now = new Date();
  const ballotRunStarted = ballotRun.start && ballotRun.start < now;
  const ballotStarted = ballot.start && ballot.start < now;
  const ballotRunEnded = ballotRun.end && ballotRun.end < now;
  const ballotEnded = ballot.end && ballot.end < now;

  if (!ballotRunStarted || !ballotStarted) {
    throw new Error("Error.BallotNotStarted");
  }
  if (ballotRunEnded || ballotEnded) {
    throw new Error("Error.BallotEnded");
  }

  const team = ballotRun?.team;
  if (team.code !== code) throw new Error("Error.BallotcodeWrong");

  const voted = getCookie(ctx.req, "voty", {});
  if (typeof voted !== "object") throw new Error("Error.StrangeCookie");
  if (ballotRunId in voted) {
    throw new Error("Error.AlreadyVoted");
  }

  const verify = randomBytes(32).toString("hex");
  const result = await ctx.db.vote.create({
    data: {
      ballot: { connect: { id: ballotRun.ballotId } },
      ballotRun: { connect: { id: ballotRunId } },
      vote,
      verify,
      year: team.year,
      canton: team.school?.canton,
      schooltype: team.school?.type,
      school: { connect: { id: team.school.id } },
      team: { connect: { id: team.id } },
    },
  });
  if (!result) throw new Error("Error.VotecodeFailed");

  voted[ballotRunId] = Date.now();
  const exp = 10 ** 11; // sometime in roughly 3.17 years...
  setCookie(ctx.res, "voty", voted, {
    maxAge: exp,
  });
  return { success: true, message: "OK_VOTED" };
};

export const addBallotRun: FieldResolver<"Mutation", "addBallotRun"> = async (
  _root,
  args,
  ctx
) => {
  const ballotId = args.ballotId;
  const teamId = args.teamId;

  const ballot = await ctx.db.ballot.findUnique({ where: { id: ballotId } });
  const team = await ctx.db.team.findUnique({ where: { id: teamId } });
  if (!ballot) throw new Error("Error.BallotNotFound");
  if (!team) throw new Error("Error.TeamNotFound");

  const ballotRun = await ctx.db.ballotRun.upsert({
    create: {
      ballot: { connect: { id: ballotId } },
      team: { connect: { id: teamId } },
    },
    update: {
      ballot: { connect: { id: ballotId } },
      team: { connect: { id: teamId } },
    },
    where: {
      ballotId_teamId: { ballotId, teamId },
    },
  });
  if (!ballotRun) throw new Error("Error.CannotCreateBallotrun");

  return ballotRun;
};

export const removeBallotRun: FieldResolver<
  "Mutation",
  "removeBallotRun"
> = async (_root, args, ctx) => {
  const ballotRunId = args.ballotRunId;
  const ballotRun = await ctx.db.ballotRun.findUnique({
    where: { id: ballotRunId },
  });
  if (!ballotRun) throw new Error("Error.BallotrunNotFound");

  const success = await ctx.db.ballotRun.delete({
    where: { id: ballotRunId },
    include: { ballot: true },
  });

  if (!success) throw new Error("Error.BallotrunCannotRemove");
  return { success: true };
};

export const startBallotRun: FieldResolver<
  "Mutation",
  "startBallotRun"
> = async (_root, args, ctx) => {
  const ballotRunId = args.ballotRunId;

  const ballotRun = await ctx.db.ballotRun.update({
    data: { start: new Date() },
    where: { id: ballotRunId },
  });
  if (!ballotRun) throw new Error("Error.BallotrunNotFound");

  return ballotRun;
};

export const endBallotRun: FieldResolver<"Mutation", "endBallotRun"> = async (
  _root,
  args,
  ctx
) => {
  const ballotRunId = args.ballotRunId;

  const ballotRun = await ctx.db.ballotRun.update({
    data: { end: new Date() },
    where: { id: ballotRunId },
  });
  if (!ballotRun) throw new Error("Error.BallotrunNotFound");

  return ballotRun;
};

export const getBallotRuns: FieldResolver<"Query", "getBallotRuns"> = async (
  _root,
  args,
  ctx
) => {
  const teamId = args.teamId;

  const team = await ctx.db.team.findUnique({ where: { id: teamId } });
  if (!team) throw new Error("Error.TeamNotFound");

  return await ctx.db.ballotRun.findMany({ where: { teamId } });
};

/*
 * Returns number of yes/no/abs/total votes on a ballot, can be filtered on:
 * - no filter: AUTH: depends on Ballot.scope. Anon for National / Cantonal
 * - ballotRunId: everyone participating anonymously with a login code. AUTH: team teacher!
 * - teamId: filter votes by team. AUTH: team teacher or team member
 * - schoolId: filter. AUTH: school member
 * - canton: filter by canton. AUTH: anon
 */
export const getBallotResults: FieldResolver<
  "Query",
  "getBallotResults"
> = async (_root, args, ctx) => {
  const { ballotId, ballotRunId, canton, teamId, schoolId } = args;
  const user = ctx.user;
  let ballotRun;
  const where: Prisma.VoteWhereInput = {};

  if (ballotRunId) {
    ballotRun = await ctx.db.ballotRun.findUnique({
      where: { id: ballotRunId },
      include: { team: { select: { teacherId: true } } },
    });
    if (!ballotRun) throw new Error("Error.BallotrunNotFound");
    if (ballotRun.team.teacherId !== user?.id)
      throw new Error("Error.NoPermission");
    where.ballotRunId = ballotRunId;
    where.ballotId = ballotRun.ballotId;
  } else {
    if (!ballotId) throw new Error("Error.NoBallotSpecified");
    where.ballotId = ballotId;
  }

  if (teamId) {
    where.teamId = teamId;
  }
  if (schoolId) {
    where.schoolId = schoolId;
  }
  if (canton) {
    where.canton = canton;
  }
  const yes = await ctx.db.vote.count({
    where: { ...where, vote: 1 },
  });
  const no = await ctx.db.vote.count({
    where: { ...where, vote: 2 },
  });
  const abs = await ctx.db.vote.count({
    where: { ...where, vote: 0 },
  }); // abstentions
  const total = yes + no + abs;

  return { yes, no, abs, total };
};

// TODO: FIXME... can't get this type correctly imported

type PermissionArgs = {
  ballot: RootValue<"Ballot"> /*{
    scope: "School" | "Team" | "Cantonal" | "National" | "Public";
    schoolId?: string | null;
    teamId?: string | null;
    start: Date;
    end: Date;
    id: string;
  }*/;
  user?: User;
  db: PrismaClient;
};

// everyone can view public/national/cantonal, but only students can vote
export async function viewPermission({
  ballot,
  user,
  db,
}: PermissionArgs): Promise<boolean> {
  switch (ballot.scope) {
    case BallotScope.Public:
    case BallotScope.National:
    case BallotScope.Cantonal:
      return true;
    case BallotScope.School:
      return ballot.schoolId === user?.schoolId;
    case BallotScope.Team: {
      // for students:
      if (ballot.teamId === user?.teamId) return true;
      // for teacher:
      const team = await db.team.findUnique({
        where: { id: ballot.teamId || undefined },
      });
      return team?.teacherId === user?.id;
    }
    default:
      return false;
  }
}

// everyone can view public/national/cantonal, but only students can vote
export async function votingPermission({
  ballot,
  user,
  db,
}: PermissionArgs): Promise<boolean> {
  const isStudent = user?.role === Role.Student;
  const now = new Date();
  if (ballot.start > now || ballot.end < now) {
    return false;
  }
  const voted = await getHasVoted({ ballot, user, db });
  if (voted) return false;

  switch (ballot.scope) {
    case BallotScope.Public:
    case BallotScope.National:
    case BallotScope.Cantonal:
      return isStudent ? true : false;
    case BallotScope.School:
      return ballot.schoolId === user?.schoolId;
    case BallotScope.Team: {
      // for students:
      if (ballot.teamId === user?.teamId) return true;
      // for teacher:
      const team = await db.team.findUnique({
        where: { id: ballot.teamId || undefined },
      });
      return team?.teacherId === user?.id;
    }
    default:
      return false;
  }
}

export async function getHasVoted({
  ballot,
  user,
  db,
}: PermissionArgs): Promise<boolean> {
  const voted = await db.voted.findMany({
    where: {
      ballot: { id: { equals: ballot.id } },
      user: { id: { equals: user?.id } },
    },
  });
  return voted.length > 0 ? true : false;
}
