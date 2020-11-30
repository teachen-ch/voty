import { schema } from "nexus";
import resolvers from "./resolvers";
import { stringArg, intArg } from "nexus/components/schema";

/*
enum SwissvoteType {
  "Obligatory" = 1,
  "Faculative" = 2,
  "Initiative" = 3,
  "Counter" = 4,
  "Tiebreak" = 5,
}

enum SwissvoteResult {
  "No" = 0,
  "Yes" = 1,
  "NotRequired" = 3,
}*/

schema.objectType({
  name: "Swissvote",
  definition(t) {
    t.int("anr"); // anr
    t.date("datum"); // datum
    t.string("titel_kurz_d"); // titel_kurz_d
    t.string("titel_off_d"); // titel_off_d
    t.string("stichwort"); // stichwort
    t.string("swissvoteslink"); // swissvotes link
    t.int("rechtsform"); // rechtsform (1 - 5)
    t.string("poster_ja"); // poster_ja
    t.string("poster_nein"); // poster_nein
    t.int("annahme"); // annahme (0: no, 1: yes)
    t.int("volk"); // volk (0: no, 1: yes)
    t.int("stand"); // stand (0: no, 1: yes, 3: not required)
    t.string("kategorien"); // d1e1-d3e3
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("swissvotes", {
      type: "Swissvote",
      list: true,
      nullable: true,
      args: {
        keywords: stringArg(),
        type: intArg(),
        result: intArg(),
      },
      resolve: async (_root, args, ctx, info) =>
        resolvers.swissvotes.getSwissvotes(_root, args, ctx, info),
    });
  },
});
