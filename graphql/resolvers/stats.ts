import { FieldResolver } from "@nexus/schema";
import { Role } from "@prisma/client";

export const stats: FieldResolver<"Query", "stats"> = async (
  _root,
  args,
  ctx
) => {
  const db = ctx.db;
  const { from, to } = args;
  const fromDate = from ? new Date(from) : new Date(0);
  const toDate = to ? new Date(to) : new Date();
  const whereDate = { createdAt: { gte: fromDate, lte: toDate } };
  const total = await db.user.count({
    where: whereDate,
  });
  const teachers = await db.user.count({
    where: { ...whereDate, role: Role.Teacher },
  });
  const students = await db.user.count({
    where: { ...whereDate, role: Role.Student },
  });
  const teams = await db.team.count({
    where: { ...whereDate },
  });
  const votes = await db.voted.count();
  const discussions = await db.discussion.count({ where: whereDate });
  const works = await db.work.count({ where: whereDate });
  return {
    stats: {
      Lehrer: teachers,
      SuS: students,
      "Total neue Benutzer": total,
      Klassen: teams,
      "Total Stimmen EVER": votes,
      Diskussionen: discussions,
      Arbeiten: works,
    },
  };
};
