import { FieldResolver } from "@nexus/schema";
import { Swissvote } from "graphql/types";

export const getSwissvotes: FieldResolver<"Query", "swissvotes"> = async (
  _root,
  args,
  ctx
) => {
  const { keywords, type, result, hasPosters, limit, offset, sort } = args;
  const db = ctx.db;
  let query = "SELECT * FROM swissvotes WHERE ";
  if (keywords) {
    for (const word of keywords.split(/\s*\W\s*/)) {
      query += "(";
      for (const field of ["titel_kurz_d", "stichwort", "kategorien"]) {
        query += `${field} ILIKE '%${word}%' OR `;
      }
      query += "FALSE) AND ";
    }
  }
  if (type !== undefined) {
    query += `rechtsform=${type} AND `;
  }
  if (result !== undefined) {
    query += `annahme='${result}' AND `;
  }
  if (hasPosters) {
    query += `(LENGTH (poster_ja ) > 1 OR (LENGTH (poster_nein) > 1)) AND `;
  }
  query += "TRUE ";
  if (sort === "random") query += "ORDER BY RANDOM() ";
  else if (sort === "oldest") query += "ORDER BY datum ASC ";
  else query += "ORDER BY datum DESC ";
  query += `LIMIT ${limit ?? 20} OFFSET ${offset ?? 0}`;
  const votes: Swissvote[] = await db.$queryRaw(query);
  return votes;
};
