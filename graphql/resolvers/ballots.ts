import { Role, Ballot, BallotScope, User, PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { FieldResolver } from "nexus/components/schema";
import { setCookie, getCookie } from "util/cookies";
import { NextApiRequest, NextApiResponse } from "next";

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
  _root: Ballot,
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
  const ballot = await ctx.db.ballot.findOne({ where: { id: ballotId } });
  const user = await ctx.db.user.findOne({
    where: { id: ctx.user?.id },
    include: { school: true, team: true },
  });
  if (!user) throw new Error("ERR_VOTING_NEEDS_LOGIN");
  if (!ballot) throw new Error("ERR_BALLOT_NOT_FOUND");
  if (!(await votingPermission({ ballot, user, db: ctx.db }))) {
    throw new Error("ERR_VOTING_NOT_ALLOWED");
  }

  // TODO: This should be e.g. the id of the vote hashed client side with users password
  const signature = randomBytes(32).toString("hex");
  if (user) {
    await ctx.db.voted.create({
      data: {
        user: { connect: { id: user.id } },
        team: { connect: { id: user.team?.id } },
        ballot: { connect: { id: ballot.id } },
        signature,
      },
    });
  }

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
  return result;
};

export const voteCode: FieldResolver<"Mutation", "voteCode"> = async (
  _root,
  args,
  ctx
) => {
  const { ballotId, vote, code } = args;
  const ballot = await ctx.db.ballot.findOne({ where: { id: ballotId } });
  const team = await ctx.db.team.findOne({
    where: { code },
    include: { school: true },
  });
  if (!team) throw new Error("ERR_CODE_NOT_FOUND");
  if (!ballot) throw new Error("ERR_BALLOT_NOT_FOUND");

  const exists = await ctx.db.ballotRun.findMany({
    where: { team: { id: team.id }, ballot: { id: ballot.id } },
  });
  if (!exists || !exists.length) throw new Error("ERR_BALLOT_CODE_NOT_FOUND");

  const voted = getCookie((ctx.req as unknown) as NextApiRequest, "voty", {});
  if (typeof voted !== "object") throw new Error("ERR_STRANGE_COOKIE");
  if (ballotId in voted) {
    throw new Error("ERR_ALREADY_VOTED");
  }

  const verify = randomBytes(32).toString("hex");
  const result = await ctx.db.vote.create({
    data: {
      ballot: { connect: { id: ballot.id } },
      vote,
      verify,
      year: team.year,
      canton: team.school?.canton,
      schooltype: team.school?.type,
      school: { connect: { id: team.school.id } },
      team: { connect: { id: team.id } },
    },
    include: { ballot: true },
  });
  if (!result) throw new Error("ERR_VOTE_ERROR");

  voted[ballotId] = Date.now();
  setCookie((ctx.req as unknown) as NextApiResponse, "voty", voted);
  return result;
};

export const addBallotRun: FieldResolver<"Mutation", "addBallotRun"> = async (
  _root,
  args,
  ctx
) => {
  const ballotId = args.ballotId;
  const teamId = args.teamId;

  const ballot = await ctx.db.ballot.findOne({ where: { id: ballotId } });
  const team = await ctx.db.team.findOne({ where: { id: teamId } });
  if (!ballot) throw new Error("ERR_BALLOT_NOT_FOUND");
  if (!team) throw new Error("ERR_TEAM_NOT_FOUND");

  const ballotRun = await ctx.db.ballotRun.create({
    data: {
      ballot: { connect: { id: ballotId } },
      team: { connect: { id: teamId } },
    },
  });
  if (!ballotRun) throw new Error("ERR_CANNOT_CREATE_BALLOTRUN");

  return ballotRun;
};

export const removeBallotRun: FieldResolver<
  "Mutation",
  "removeBallotRun"
> = async (_root, args, ctx) => {
  const ballotRunId = args.ballotRunId;
  const ballotRun = await ctx.db.ballotRun.findOne({
    where: { id: ballotRunId },
  });
  if (!ballotRun) throw new Error("ERR_BALLOTRUN_NOT_FOUND");

  const success = await ctx.db.ballotRun.delete({ where: { id: ballotRunId } });
  if (!success) throw new Error("ERR_BALLOTRUN_CANNOT_REMOVE");

  return ballotRun;
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
  if (!ballotRun) throw new Error("ERR_BALLOTRUN_NOT_FOUND");

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
  if (!ballotRun) throw new Error("ERR_BALLOTRUN_NOT_FOUND");

  return ballotRun;
};

export const getBallotRuns: FieldResolver<"Mutation", "getBallotRuns"> = async (
  _root,
  args,
  ctx
) => {
  const teamId = args.teamId;

  const team = await ctx.db.team.findOne({ where: { id: teamId } });
  if (!team) throw new Error("ERR_TEAM_NOT_FOUND");

  return await ctx.db.ballotRun.findMany({ where: { teamId } });
};

type PermissionArgs = {
  ballot: Ballot;
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
      const team = await db.team.findOne({
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
      const team = await db.team.findOne({
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
