import { Role, Ballot, BallotScope, User, PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { FieldResolver } from "nexus/components/schema";

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
  const id = args.ballot;
  const vote = args.vote;
  const ballot = await ctx.db.ballot.findOne({ where: { id } });
  const user = await ctx.db.user.findOne({
    where: { id: ctx.user?.id },
    include: { school: true, team: true },
  });
  const db = ctx.db;

  if (!ballot) throw new Error("ERR_BALLOT_NOT_FOUND");
  if (!user) throw new Error("ERR_VOTING_NEEDS_LOGIN");
  if (!votingPermission({ ballot, user, db })) {
    throw new Error("ERR_VOTING_NOT_ALLOWED");
  }

  // TODO: This should be e.g. the id of the vote hashed client side with users password
  const signature = randomBytes(32).toString("hex");
  await db.voted.create({
    data: {
      user: { connect: { id: user.id } },
      ballot: { connect: { id: ballot.id } },
      signature,
    },
  });

  // TODO: This should something which allows the user to check his vote was counter
  const verify = randomBytes(32).toString("hex");
  const result = await db.votes.create({
    data: {
      ballot: { connect: { id: ballot.id } },
      vote,
      verify,
      year: user.year || user.team?.year,
      canton: user.canton || user.school?.canton,
      schooltype: user.school?.type,
    },
    include: { ballot: true },
  });
  return result;
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
