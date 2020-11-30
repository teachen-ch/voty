import { FieldResolver } from "nexus/components/schema";
import { Swissvote } from "graphql/types";

export const getSwissvotes: FieldResolver<"Query", "swissvotes"> = async (
  _root,
  args,
  ctx
) => {
  const { keywords, type, result } = args;
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
  if (type) {
    query += `rechtsform=${type} AND `;
  }
  if (result) {
    query += `annahme='${result}' AND `;
  }
  query += "TRUE";
  const votes: Swissvote[] = await db.$queryRaw(query);
  return votes;
};
