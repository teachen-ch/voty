import resolvers from "../resolvers";
import {
  extendType,
  list,
  nonNull,
  objectType,
  arg,
  stringArg,
} from "@nexus/schema";
import { randomBytes } from "crypto";
import { random } from "lodash";

export const Team = objectType({
  name: "Team",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.invite();
    t.model.code();
    t.model.prefs();
    t.model.notes();
    t.model.domain();
    t.model.school();
    t.model.teacher();
    t.model.teacherId();
    t.model.members();
    t.model.ballots();
    t.model.cards();
  },
});

export const ProgressCard = objectType({
  name: "ProgressCard",
  definition(t) {
    t.string("id");
    t.list.field("done", { type: "User" });
    t.list.field("due", { type: "User" });
  },
});

export const ProgressStudent = objectType({
  name: "ProgressStudent",
  definition(t) {
    t.string("id");
    t.string("email");
    t.list.string("done");
    t.list.string("due");
  },
});

export const ResponseProgress = objectType({
  name: "ResponseProgress",
  definition(t) {
    t.list.field("cards", { type: "ProgressCard" });
    t.list.field("students", { type: "ProgressStudent" });
  },
});

export const TeamsQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.team();
    t.crud.teams({
      ordering: true,
      filtering: true,
    });
    t.field("progress", {
      type: "ResponseProgress",
      args: {
        teamId: nonNull(stringArg()),
      },
      resolve: resolvers.teams.progress,
    });
  },
});

export const TeamsMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneTeam({
      computedInputs: {
        invite: () => randomBytes(6).toString("hex"),
        code: () => String(random(10 ** 7, 10 ** 8 - 1)),
      },
    });
    t.crud.deleteOneTeam({
      resolve: resolvers.teams.deleteOneTeam,
    });
    t.field("inviteStudents", {
      type: "InviteResponse",
      args: {
        team: nonNull(stringArg()),
        emails: nonNull(list(nonNull(stringArg()))),
      },
      resolve: resolvers.teams.inviteStudents,
    });
    t.field("setPrefs", {
      type: "Team",
      args: {
        teamId: nonNull(stringArg()),
        prefs: nonNull(arg({ type: "Json" })),
      },
      resolve: resolvers.teams.setPrefs,
    });
    t.field("setNotes", {
      type: "Team",
      args: {
        teamId: nonNull(stringArg()),
        notes: nonNull(arg({ type: "Json" })),
      },
      resolve: resolvers.teams.setNotes,
    });
  },
});
