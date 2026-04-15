# DATA.md — Data Model & GraphQL Surface

## Part 1 — Prisma data model

Source of truth: `prisma/schema.prisma`. Postgres. All PKs are `cuid()` except `Activity` (int autoincrement) and `Swissvote` (`anr` natural key).

### Enums

- `Role`: User, Admin, Student, Teacher, Principal
- `Gender`: Unkown (sic), Male, Female, Other
- `BallotScope`: Public, National, Cantonal, School, Team
- `VotingStatus`: Restricted, Open, Voted, NotStarted, Closed
- `Visibility`: Private, Team, School, Public
- `ActivityType`: Discussion, Attachment, Vote, Test, Work, UserAccept, UserInvite

### Models (high level)

| Model | Purpose | Key fields / relations |
|---|---|---|
| **User** | Teachers, students, admins, principals | email (unique), password (bcrypt), role, locale, gender, year, canton, school?, team? (membership), teaches[] (Team), campaign |
| **VerificationRequest** | Magic-link / email verification tokens | identifier, token (unique), expires |
| **Team** | A class | name, invite (unique), code (unique, for voting), cards (CSV string), prefs/notes (Json), school, teacher, members[] |
| **School** | Schools | name, city, canton, zip, address, type, domain?, teams[], members[] |
| **Domain** | Email domain → school mapping | name (unique), approved, schools[] |
| **Ballot** | A voting topic | title/description/body × {de,fr,it, base}, start/end, scope, canton?, creator?, school?, team?, options[], ballotRuns[] |
| **BallotRun** | Team-scoped ballot window | unique (ballotId, teamId), start/end |
| **Option** | Answer option on a ballot | vote (int), title, ballot |
| **Voted** | Proof a user voted (no choice stored) | user, ballot, team?, school?, signature (encrypted) |
| **Vote** | Anonymous choice | vote (int; 0=abstain), verify, year, canton, schooltype, locale, ballot, ballotRun?, team?, school? |
| **Discussion** | In-class post | title, text, card?, user, team, school?, ballot?, reactions[], attachments[] |
| **Work** | Student submission | title, text, data (Json), card?, visibility, team, school, users[], reactions[], attachments[] |
| **Reaction** | Emoji / stars / feedback on Discussion or Work | emoij (sic), stars, feedback, user |
| **Attachment** | Uploaded file | file (unique), title, type, card?, user, team, school?, discussion?, ballot?, work? |
| **Activity** | Event feed entry | type, visibility, card?, summary, user, team, school, optional refs to discussion/work/ballot |
| **Swissvote** | Read-only historic Swiss ballots | anr (PK), datum, titles, rechtsform, results |

### Relationship highlights

- User ↔ Team: `members` (n:1 join, field `team`) + `teaches` (1:n named relation `Teacher`).
- User ↔ School: one `school` per user (optional).
- Ballot is polymorphic-ish via optional `schoolId`/`teamId`/`creatorId` + `scope` enum.
- **Vote anonymity** is modeled by two disjoint tables: `Voted` (who) and `Vote` (what). No FK between them.
- BallotRun creates a (ballot, team) instance with its own time window — team votes are keyed to BallotRun.
- Discussion/Work/Activity form an overlapping "activity feed" layer; Activity is a denormalized projection for stream rendering.

---

## Part 2 — GraphQL surface (Nexus + nexus-plugin-prisma)

Built in `graphql/makeschema.ts` with `@nexus/schema`. CRUD auto-exposed via `nexusPrisma({ experimentalCRUD: true })`. Auth layered on with `graphql-middleware` + `graphql-shield` (`graphql/permissions.ts`).

### `t.model.*` usage (Nexus object type ↔ Prisma model projection)

Each Nexus type in `graphql/schema/*.ts` uses `t.model.<field>()` to expose Prisma model fields as GraphQL fields without manually typing them. Typical pattern:

```ts
schema.objectType({
  name: "User",
  definition(t) {
    t.model.id(); t.model.email(); t.model.name(); t.model.role(); …
  }
});
```

Fields covered span every scalar + relation across User, Team, School, Ballot, Option, Vote, Voted, Discussion, Work, Reaction, Attachment, Activity, Domain, Swissvote. This is what we lose when ripping out the plugin — every `t.model.x()` must become an explicit field resolver (usually one line each, since Prisma defaults suffice).

### `t.crud.*` usage (auto-generated queries + mutations)

Discovered in `graphql/schema/`:

**Queries (auto-CRUD):**
- `user`, `users`
- `team`, `teams`
- `school`, `schools`
- `ballot`, `ballots`
- `activities`
- `attachments`
- `works`

**Mutations (auto-CRUD):**
- `createOneUser` *(note: signup uses custom `createUser`, not CRUD)*
- `createOneTeam`, `createOneSchool`, `createOneBallot`, `createOneActivity`, `createOneWork`
- `updateOneUser`, `updateOneBallot`
- `deleteOneUser`, `deleteOneTeam`, `deleteOneSchool`, `deleteOneBallot`, `deleteOneWork`

Each is wrapped with graphql-shield rules (e.g. `deleteOneBallot` → `isAdmin`, `updateOneUser` → `isOwnId or isAdmin`). Some accept `filtering`/`ordering` args configured via plugin options.

### Custom queries (hand-written in `graphql/schema/` + `resolvers/`)

`me`, `cards`, `progress`, `stats`, `teachers`, `adminUsers`, `schoolsWithMembers`, `swissvotes`, `teamByCode`, `teamByInvite`, `teamUser`, `teamTeacher`, `teamAnon`, `userBallots`, `getBallotRuns`, `getBallotResults`, `getTeamDiscussions`.

### Custom mutations (hand-written)

- **Auth**: `login`, `magic` (passwordless), `emailVerification`, `checkVerification`, `changePassword`, `createUser`, `createInvitedUser`, `acceptInvite`, `inviteStudents`, `deleteAccount`, `deleteUser`, `updateUser`, `setSchool`
- **Teams**: `setCards`, `setPrefs`, `setNotes`
- **Ballots**: `addBallotRun`, `startBallotRun`, `endBallotRun`, `removeBallotRun`, `vote`, `voteCode`
- **Content**: `postDiscussion`, `postWork`, `deleteWork`

### Permissions shape (shield)

Rules live in `graphql/permissions.ts`. Categories:
- `isUser`, `isTeacher`, `isAdmin`, `isPrincipal`, `isTeamMember`, `teachesStudent`, `isOwnId`
- Cache modes: `contextual` (user-scoped), `strict` (args-scoped), `no_cache`
- Applied at Query/Mutation field level and at object-type field level (e.g. `Team.members` is gated).
- Custom `canViewBallot` computes visibility from scope + user context.

### Scalars & plugins

- `DateTime` ← `graphql-scalars` `DateTimeResolver`
- `Json` ← custom wrapper on `JSONObjectResolver` (named `"Json"`)
- Custom `LoggerPlugin` (in `util/nexusLogger`) logs all ops when `LOG_GRAPHQL=true`

### Generated artifacts (checked in)

- `graphql/api.graphql` — SDL (regenerate with `yarn nexus:reflection`)
- `graphql/nexus.ts` — Nexus core typegen
- `graphql/nexus-plugin-prisma.ts` — Prisma-aware typegen

### Client-side operations catalog (inline `gql`-tagged docs, by surface)

**Auth / user (pages/user/…, pages/i/[invite])**
- mutations: `login`, `magic`, `emailVerification`, `checkVerification`, `changePassword`, `createUser`, `createInvitedUser`, `acceptInvite`, `deleteAccount`, `updateUser`, `setSchool`
- queries: `me`

**Teacher / team management**
- mutations: `createOneTeam`, `deleteOneTeam`, `setCards`, `setPrefs`, `setNotes`, `inviteStudents`, `deleteUser`
- queries: `teams`, `teamByCode`, `teamByInvite`, `teamUser`, `teamTeacher`, `teamAnon`, `getTeamDiscussions`, `progress`

**Ballots / voting**
- mutations: `createOneBallot`, `updateOneBallot`, `deleteOneBallot`, `addBallotRun`, `startBallotRun`, `endBallotRun`, `removeBallotRun`, `vote`, `voteCode`
- queries: `ballot`, `ballots`, `userBallots`, `getBallotRuns`, `getBallotResults`, `swissvotes`

**Discussion / work / activity**
- mutations: `postDiscussion`, `postWork`, `deleteWork`, `createOneActivity`, `createOneWork`, `deleteOneWork`
- queries: `activities`, `works`, `attachments`, `cards`

**Admin**
- mutations: `createOneSchool`, `deleteOneSchool`, `updateOneUser`, `deleteOneUser`
- queries: `users`, `adminUsers`, `teachers`, `schools`, `schoolsWithMembers`, `stats`

---

## Part 3 — What `nexus-plugin-prisma` actually gives us

1. **`t.model.<field>()`** — one-line projection of a Prisma model field onto the GraphQL type (scalars + relations, incl. nullability, enums, pagination args on lists).
2. **`t.crud.<op>()`** — auto-generated CRUD ops: `findUnique`, `findMany` (with `where`/`orderBy`/`skip`/`take`/`cursor`), `createOne`, `updateOne`, `deleteOne`, `upsertOne`, plus aggregate types.
3. **Generated input types**: `UserWhereInput`, `UserCreateInput`, `UserUpdateInput`, `UserOrderByInput`, `*WhereUniqueInput`, enums, etc. These are consumed both server-side and by `graphql-codegen` client-side.
4. **Scalar mapping**: `DateTime`, `Json`, Prisma enums → GraphQL enums.

**Scope of work to replace**: ~13 auto-CRUD operations + ~50 distinct `t.model.*` field exposures + all generated input types. Most of this is mechanical boilerplate.

---

## Part 4 — Replacement options

### Option A — Migrate to REST (Next API routes)

**Pros**
- Simplest to implement — Next pages router already has `pages/api/*.ts`.
- Zero GraphQL runtime; one less moving part; no codegen.
- Easy caching, HTTP semantics, observability.
- Aligns with eventual App Router / RSC direction.

**Cons**
- ~60+ ops to port; client-side must be refactored to fetch/SWR/react-query.
- Lose typed end-to-end schema (though `zod` + a shared types package recover most of it).
- graphql-shield authorization must be re-implemented per route (middleware helpers).
- Largest UI-side churn: every Apollo hook replaced.

**Effort**: HIGH (backend + frontend rewrite of every data access).

### Option B — Next.js App Router + RSC + Server Actions

**Pros**
- Modern, aligned with Next 14/15. Drops GraphQL entirely.
- Excellent DX for new work; co-located server fns with components.
- Natural fit for Prisma (server-only calls, no transport layer).

**Cons**
- Requires **migrating 40+ pages from Pages Router to App Router** — huge refactor.
- Breaks theme-ui 0.3 (needs RSC-compatible styling anyway → Tailwind/CSS-modules).
- All client components need "use client" triage; forms (Formik) need revisiting.
- Highest overall rewrite surface. The user explicitly wants *least effort* → this is the opposite.

**Effort**: VERY HIGH. Rejected as a primary path.

### Option C — Stay with GraphQL, swap the tooling

Replace `nexus-plugin-prisma` + `@nexus/schema` + `apollo-server-micro` with a modern equivalent on the same schema + resolvers:

- **Schema**: **Pothos** (`@pothos/core` + `@pothos/plugin-prisma`) — actively maintained, modern spiritual successor to Nexus. `t.prismaField` / `t.relation` / `t.prismaObject` replace `t.model.*`; `prismaFieldWithInput` / generated CRUD via `@pothos/plugin-prisma-utils` replace `t.crud.*`.
- **Server**: **GraphQL Yoga** (`graphql-yoga`) or **Apollo Server 4** on a Next API route.
- **Auth**: keep `graphql-shield` + `graphql-middleware` (both work with Yoga/AS4).
- **Codegen**: keep `@graphql-codegen/*`, update plugins.
- **Client**: Apollo Client 3 stays — no UI changes.

**Pros**
- **Keeps entire client surface untouched** (Apollo hooks, gql tags, codegen).
- Replaces only the ~13 schema files + permissions wrapping.
- Pothos + Prisma plugin covers most of what nexus-plugin-prisma did, with better maintenance.
- Incremental: can port file-by-file behind a feature flag during cutover.

**Cons**
- Writing explicit CRUD for ~13 operations (Pothos has helpers; still ~1 day of typing).
- Still on GraphQL complexity, still running codegen.
- Pothos input-type generation for CRUD is less magical than nexus-plugin-prisma — some manual input objects.

**Effort**: MEDIUM. Highest ROI for "least churn".

---

## Initial recommendation

**Go with Option C (Pothos + GraphQL Yoga).**

Rationale:
- The user has stated the goal is **least effort** and **good maintainability** with no major changes planned for months.
- The GraphQL client code (~60 ops, 50+ components) is the biggest asset and the most expensive thing to touch. Option C leaves it alone.
- Pothos is the canonical 2024+ replacement for Nexus, with an active Prisma plugin that mirrors `t.model.*` semantics.
- Yoga runs cleanly on Next 14/15 API routes and removes the Apollo Server 2 EOL risk.
- This also unblocks Prisma 5 + Next 14 + React 18, since the only thing pinning us today is the abandoned Nexus plugin.

See **MIGRATION_PLAN.md** for concrete steps.
