import { Prisma } from "@prisma/client";
import { FieldResolver } from "../context";
import type { Swissvote } from "@prisma/client";

export const swissvotes: FieldResolver<"Query", "swissvotes"> = async (
  _root,
  args,
  ctx
) => {
  const { keywords, type, result, hasPosters, limit, offset, sort } = args;
  const conditions: Prisma.Sql[] = [Prisma.sql`TRUE`];
  if (keywords) {
    const words = keywords
      .replace(/\*/g, "%")
      .split(/[\s.,:-]+/)
      .filter(Boolean);
    for (const word of words) {
      const pattern = `%${word}%`;
      conditions.push(
        Prisma.sql`(titel_kurz_d ILIKE ${pattern} OR stichwort ILIKE ${pattern} OR kategorien ILIKE ${pattern})`
      );
    }
  }
  if (type != null) conditions.push(Prisma.sql`rechtsform = ${type}`);
  if (result != null) conditions.push(Prisma.sql`annahme = ${result}`);
  if (hasPosters)
    conditions.push(
      Prisma.sql`(LENGTH(poster_ja) > 1 OR LENGTH(poster_nein) > 1)`
    );
  const where = Prisma.join(conditions, " AND ");
  const orderBy =
    sort === "random"
      ? Prisma.sql`RANDOM()`
      : sort === "oldest"
      ? Prisma.sql`datum ASC`
      : Prisma.sql`datum DESC`;
  return ctx.db.$queryRaw<Swissvote[]>(
    Prisma.sql`SELECT * FROM swissvotes WHERE ${where} ORDER BY ${orderBy} LIMIT ${limit ?? 20} OFFSET ${offset ?? 0}`
  );
};
