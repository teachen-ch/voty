import { builder } from "../builder";

export const SwissvoteType = builder.prismaObject("Swissvote", {
  fields: (t) => ({
    anr: t.exposeString("anr", { nullable: true }),
    datum: t.string({
      nullable: true,
      resolve: (p) => (p.datum ? String(p.datum) : null),
    }),
    titel_kurz_d: t.exposeString("titel_kurz_d", { nullable: true }),
    titel_off_d: t.exposeString("titel_off_d", { nullable: true }),
    stichwort: t.exposeString("stichwort", { nullable: true }),
    swissvoteslink: t.exposeString("swissvoteslink", { nullable: true }),
    rechtsform: t.exposeInt("rechtsform", { nullable: true }),
    poster_ja: t.exposeString("poster_ja", { nullable: true }),
    poster_nein: t.exposeString("poster_nein", { nullable: true }),
    annahme: t.exposeInt("annahme", { nullable: true }),
    volk: t.exposeInt("volk", { nullable: true }),
    stand: t.exposeInt("stand", { nullable: true }),
    kategorien: t.exposeString("kategorien", { nullable: true }),
  }),
});

// TODO Step 7: queryField for swissvotes — uses $queryRawUnsafe in resolver,
//   arg list: keywords, type, result, hasPosters, limit, offset, sort
