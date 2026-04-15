# MIGRATION_PLAN.md

Goal: rip out `nexus-plugin-prisma` + `@nexus/schema` + Apollo Server 2; upgrade Next.js 12 → latest; keep the client-side GraphQL surface intact to minimize churn. Stated constraint: **least effort, good maintainability, no major feature work planned for months.**

## Chosen direction

**Option C from DATA.md: Pothos + GraphQL Yoga on the existing schema/resolver split, Apollo Client stays.**

Why: the React/Apollo client code (hundreds of `gql`-tagged ops across pages and components) is by far the largest artifact — any option that rewrites it is disproportionate effort. Pothos + Yoga replaces only the ~15 server-side files and leaves client, codegen, and shield rules largely intact.

---

## Migration phases

### Phase 0 — Safety net — DONE

- `pre-migration-baseline` git tag created on the pre-Phase-1 commit.
- Cypress E2E **cannot** be run against pure Prisma 2.22 on arm64 macOS (the bundled x86_64 engine hangs). Baseline was therefore taken after Phase 1; prod remains the behavioral reference for the pre-Phase-1 state.

### Phase 1 — Prisma 2 → 3 + Nexus package rename — DONE

**What was actually changed (differs from the original plan):**

- `@prisma/client` + `prisma`: `2.22.1` → `3.15.2`. Going to 5.x in one step is blocked because `nexus-plugin-prisma` never supported Prisma 4+. 3.15.2 is the minimum Prisma with native arm64-darwin support.
- `nexus-plugin-prisma`: `0.26.0-next.1` → `0.35.0`. Starting at 0.30 the plugin's peer dep switched from `@nexus/schema` to the renamed `nexus` package, so this forces a parallel package rename.
- Added `nexus@1.3.0`, removed `@nexus/schema`. Import paths rewritten across ~24 files (`graphql/schema/*`, `graphql/resolvers/*`, `util/nexusLogger.ts`, `graphql/makeschema.ts`) — mechanical `sed` replace. `nexus` is the renamed successor to `@nexus/schema` with compatible APIs (`objectType`, `makeSchema`, `FieldResolver`, etc.).
- `graphql/resolvers/swissvotes.ts`: `db.$queryRaw(query)` → `db.$queryRawUnsafe(query)` (Prisma 3 API).
- `prisma/schema.prisma`: added `binaryTargets = ["native", "debian-openssl-1.1.x"]` to the client generator so prod linux deploys still work.
- Plugin logs a non-fatal warning: `nexus-plugin-prisma@0.35.0 does not support @prisma/client@3.15.2. The supported range is: 2.23.x.` — behaviour is fine in practice, and this whole stack is ripped out in Phase 2 anyway.

**Cypress baseline after Phase 1**: 9/14 specs pass (login, signup clean; teacher 3/4; student 1/2; ballots/admin/panels 0/1). Failures are deferred — to be investigated alongside or after Phase 2.

**Still to do in the upgrade as originally scoped (moved to a new Phase 1b below):** Prisma 3 → 5.x. Blocked until Nexus is removed.

### Phase 1b — Prisma 3 → 5 (bundled with Phase 2)

Do this in the same PR as Phase 2, since Pothos + `@pothos/plugin-prisma` require Prisma ≥ 4. Sequence inside the PR: remove Nexus → upgrade Prisma to 5.x → regenerate → fix call-site diffs.

Known Prisma 3→5 diffs to watch for in this codebase:
- `$queryRaw` tagged-template vs `$queryRawUnsafe` (already on Unsafe — keep).
- `Prisma.JsonNull` / `Prisma.DbNull` semantics for `prefs` / `notes` / `data` Json fields.
- Referential action defaults changed in Prisma 5 — verify cascade behaviour on `Team.members`, `Ballot.options`, `BallotRun`.
- Node 14/16 dropped in Prisma 5 — already fine (Node 20).

### Phase 2 — Big-bang: Prisma 5 + Pothos + Yoga (all-in)

**Strategy shift (2026-04-15)**: after a failed cautious attempt (see "2026-04-15 session findings" below), the plan is now deliberately monolithic. Intermediate build state is expected to be broken for days. Do everything on branch `next-upgrade` (or a fresh sibling), commit freely with broken TS/build, only require green build at the end.

**Target end state (single PR):**

- Prisma 5.x (client + CLI)
- `@pothos/core@4` + `@pothos/plugin-prisma@4` + `@pothos/plugin-prisma-utils@1` (all require Prisma ≥ 4 and `graphql@16`)
- `graphql-yoga@5`, `graphql@16`
- Nexus stack fully removed (`nexus`, `nexus-plugin-prisma`, `nexus-plugin-shield`, `apollo-server-micro`)
- `graphql-shield` + `graphql-middleware` retained and applied to Pothos schema
- All client `gql` ops in `*.tsx` still work unchanged (SDL diff against `graphql/api.graphql` must be clean by end)

**Execution steps** (don't try to keep the app running between them):

1. **Branch prep** — delete `graphql/schema/`, `graphql/makeschema.ts`, `graphql/nexus.ts`, `graphql/nexus-plugin-prisma.ts`, `util/nexusLogger.ts`. Delete `graphql/api.graphql`, `graphql/types.ts`, `graphql/modules.d.ts` (all regenerated later). Accept: 60+ frontend files now have broken imports — that's fine.

2. **Upgrade deps** —
   ```bash
   yarn remove @nexus/schema nexus nexus-plugin-prisma nexus-plugin-shield apollo-server-micro
   yarn add @prisma/client@^5 graphql@^16
   yarn add --dev prisma@^5 @pothos/core@^4 @pothos/plugin-prisma@^4 \
     @pothos/plugin-prisma-utils@^1 graphql-yoga@^5 prisma-generator-pothos-codegen
   ```

3. **Prisma 5 migration** — `schema.prisma`: add Pothos codegen generator, keep `binaryTargets`. Run `npx prisma generate`. Fix call-site diffs in `graphql/resolvers/*` (Json null semantics, referential action defaults if any test fails).

4. **Strip nexus type annotations** — `graphql/resolvers/*` use `FieldResolver<"Query", "…">` from nexus. Replace with `any`-typed shim in `graphql/context.ts`:
   ```ts
   export type FieldResolver<_P extends string, _F extends string> = (
     root: any, args: any, ctx: Context, info: GraphQLResolveInfo
   ) => any;
   ```
   `graphql/permissions.ts` uses `NexusGenFieldTypes["Ballot"]` — replace with `Ballot` from `@prisma/client`.

5. **Build Pothos builder** — `graphql/builder.ts`:
   - `new SchemaBuilder<{ Context: Context, PrismaTypes: PrismaTypes, Scalars: { DateTime: ..., Json: ... } }>({ plugins: [PrismaPlugin, PrismaUtils], prisma: { client: prisma } })`
   - Register `DateTime` + `Json` scalars (from `graphql-scalars` — already a dep).

6. **Port all 16 `prismaObject` types** — one file per model under `graphql/schema/` (reuse old path). Relation fields (`t.relation("team")`), exposed fields (`t.exposeString(...)`), custom computed fields (e.g. `User.shortname`). Use `authScopes`/`nullable` as needed but don't enforce auth here — `graphql-shield` does that.

7. **Port custom queries/mutations** — every op in `graphql/resolvers/` becomes `builder.queryField` / `builder.mutationField`. Wire existing resolver functions as-is. Custom types (ResponseLogin, InviteResponse, ResponseProgress, BallotResults, ProgressCard, ProgressStudent, Response) defined via `builder.objectRef` / `builder.inputRef`.

8. **Recreate auto-CRUD ops** — the ~13 ops from `t.crud.*` (see DATA.md). Use `@pothos/plugin-prisma-utils` to generate `*WhereInput` / `*OrderByInput` / `*CreateInput` / `*UpdateInput` types. Name them to match what the Apollo Client already references in `graphql/types.ts` (e.g. `UserWhereUniqueInput`, `TeamCreateInput`). This is the highest-risk step — iterate with SDL diffs against the old `api.graphql` (pull from git: `git show pre-phase-2:graphql/api.graphql`).

9. **Compose + apply shield** —
   ```ts
   import { applyMiddleware } from "graphql-middleware";
   import { permissions } from "./permissions";
   export const schema = applyMiddleware(builder.toSchema(), permissions);
   ```

10. **Swap to Yoga** — `pages/api/graphql.ts`:
    ```ts
    import { createYoga } from "graphql-yoga";
    import { schema } from "../../graphql/schema";
    const prisma = new PrismaClient();
    export default createYoga({
      schema,
      context: ({ request }) => ({
        db: prisma,
        user: resolvers.users.getSessionUser(request as any),
        req: request, res: null as any,
      }),
      graphqlEndpoint: "/api/graphql",
      graphiql: process.env.NODE_ENV !== "production",
    });
    export const config = { api: { bodyParser: false } };
    ```
    Keep `x-access-token` extraction; adapt `getSessionUser` for Fetch `Request` if needed.

11. **Regenerate + codegen** — `tsx graphql/printSchema.ts > graphql/api.graphql` (new small script using `printSchema` from graphql). Then `yarn graphql` regenerates `graphql/types.ts` + `graphql/modules.d.ts`. Run `yarn check:ts` — fix any residual type mismatches in pages/components (expect some — argument shape drift is the main risk).

12. **SDL diff gate** — `diff <(git show pre-phase-2:graphql/api.graphql) graphql/api.graphql`. Any structural change breaks a client op. Iterate step 8 until diff is cosmetic only.

13. **Cypress smoke** — `yarn test`. Baseline is 9/14 from Phase 1. Target: ≥ 9/14.

### Phase 4 — Next.js 12 → 14 (Pages Router) + React 17 → 18 (2–3 days)

Intentionally staying on **Pages Router** (Option C's core premise). Next 14 still supports it fully.

- `next@14`, `react@18`, `react-dom@18`, `@types/react@18`.
- `next.config.js`: migrate to new options (swcMinify default, `images` config, drop deprecated flags).
- `@next/mdx` → latest (still MDX 1-compatible option exists; defer MDX 2/3 upgrade).
- React 18: wrap `_app.tsx`'s Recoil root; check `useEffect` hydration mismatches; audit `findDOMNode` / old refs usage in rebass/theme-ui.
- **theme-ui 0.3 risk**: it's not officially React 18 compatible. Two fallbacks:
  - (a) Pin React to 18 and accept theme-ui warnings (likely works in practice).
  - (b) Upgrade theme-ui to latest (0.16) — introduces breaking prop changes in rebass-land; scope creep.
  - Recommendation: (a) for now, mark theme-ui replacement as separate future track.
- Replace Recoil with Jotai — optional, low-effort (one atom pair), drop `recoil@0.3` warning.
- Cypress: verify webpack 5 / turbopack interactions; most tests should just work.

### Phase 5 — Cleanup (0.5 day)

- Delete `graphql/nexus.ts`, `graphql/nexus-plugin-prisma.ts`, `graphql/makeschema.ts` (replaced by `graphql/schema.ts` Pothos builder).
- Remove nexus-related scripts (`nexus:reflection`).
- Regenerate `graphql/api.graphql` with Pothos (`tsx graphql/printSchema.ts > graphql/api.graphql`) and commit.
- Re-run `yarn graphql` codegen against new SDL — verify generated hooks are byte-compatible.
- Update `CLAUDE.md`, `DATA.md` to reflect new stack.

### Phase 6 — Defer (flagged, not in scope)

- MDX 1 → 3
- theme-ui 0.3 / rebass → Tailwind or styled-components
- App Router / RSC migration
- Pages → App Router refactor

These are independently large. The codebase will be in a maintainable state after Phase 5, which is the stated goal.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Pothos-generated SDL diverges from Nexus SDL, breaks client | SDL diff gate at end of Phase 2; hand-tune input types until match |
| Prisma 5 query API breaks a resolver | Scratch-DB smoke + Cypress |
| graphql-shield incompatible with Yoga | `graphql-middleware` + Yoga is a supported combo; verified in Phase 3 spike |
| theme-ui + React 18 runtime warnings | Accept for now; document as known issue |
| Apollo Client 3 incompatibility with Yoga responses | None — wire format is identical |
| Lost auto-CRUD input types break generated client hooks | Enumerate the ~13 ops and re-create their input types explicitly in Pothos |

## Rough effort

~7–12 engineering days end-to-end, single developer, excluding deferred UI work. Phase 1 consumed ~0.5 day.

## Current status (2026-04-15)

- ✅ Phase 0 — baseline tag
- ✅ Phase 1 — Prisma 3 + nexus rename, native arm64 dev loop
- 🟨 Phase 2 — **skeleton landed** (steps 1–6, 9, 10 done; 7, 8, 11, 12, 13 outstanding — see "session 2" below)
- ⏳ Phase 3 — Apollo Server → Yoga (merged into Phase 2)
- ⏳ Phase 4 — Next 14 + React 18
- ⏳ Phase 5 — cleanup
- 🔧 Deferred — fix 5 failing Cypress specs; theme-ui / MDX / App Router replacement

## 2026-04-15 session findings (why Phase 2 was re-planned as big-bang)

A first attempt to do Phase 2 incrementally on `next-upgrade` was abandoned and fully reverted. Documenting what happened so the next attempt doesn't repeat the mistakes.

**What was attempted:**
- Installed `@pothos/core@4.12`, `@pothos/plugin-prisma@4.14`, `@pothos/plugin-prisma-utils@1.3`, `graphql-yoga@5.21`, `graphql@16.13`, `prisma-generator-pothos-codegen@0.7`.
- Upgraded `@prisma/client` + `prisma` to 5.22.
- Removed `nexus`, `nexus-plugin-prisma`, `nexus-plugin-shield`, `apollo-server-micro`.
- Deleted `graphql/nexus.ts`, `graphql/nexus-plugin-prisma.ts`, `graphql/makeschema.ts`, `util/nexusLogger.ts`.
- `sed`-replaced `from "nexus"` → `from "./context"` across `graphql/resolvers/*` and added a `FieldResolver` shim to `graphql/context.ts`.

**Why it was reverted:**
1. **`graphql/schema/*.ts` are structurally un-adaptable by small edits** — they use Nexus DSL (`extendType`, `objectType`, `t.model.*`, `t.crud.*`) that has no drop-in Pothos equivalent. Each file needs a full rewrite, not a patch.
2. **`graphql/api.graphql` is 8772 lines** — mostly auto-generated Nexus CRUD input types. Reproducing byte-compatible SDL requires enumerating every input used by every client op; `@pothos/plugin-prisma-utils` needs explicit per-type declarations. Estimated 200+ lines of Pothos input-type code per CRUD'd model.
3. **`graphql/types.ts` and `graphql/modules.d.ts` are imported by 60+ frontend files** (every `pages/` and `components/` file using `gql`). Deleting them breaks the whole frontend until `yarn graphql` regenerates against a working new schema. An intermediate "partially working" schema state leaves the client in a non-compiling state for hours.
4. **Cautious chunking doesn't actually work** — there is no natural seam between "Nexus partially" and "Pothos partially" on the same branch. Prisma 5 breaks `nexus-plugin-prisma`; removing it breaks all `graphql/schema/*.ts` at once; any new Pothos schema needs Prisma 5; any new SDL breaks all 60+ client imports. So you're either on the old stack or on the new stack.

**What the right approach looks like (incorporated into the plan above):**
- Accept broken build state for the duration of Phase 2.
- Do everything on one branch in one sitting (or a few consecutive sittings with deliberately-broken WIP commits).
- Don't try to run dev/cypress until the end.
- SDL diff vs `pre-phase-2` git tag is the only meaningful progress signal until the finish.

**Rough effort (revised):** Phase 2 as a big-bang is ~5–8 solid engineering days. The input-type recreation (step 8 above) is the long pole.

## Next step

Create a `pre-phase-2` git tag on the current `next-upgrade` HEAD, then execute steps 1–13 of Phase 2 as a single monolithic effort. No intermediate "is it still working?" checks until step 11.

## 2026-04-15 session 2 — Phase 2 skeleton landed

Scoped subset of the big-bang: steps 1–5, 6 (scaffolding only), 9, 10 complete. Steps 7, 8, 11, 12, 13 deferred to next session.

### What was done

- `pre-phase-2` git tag created on pre-session HEAD.
- **Deleted**: `graphql/schema/*`, `graphql/makeschema.ts`, `graphql/nexus.ts`, `graphql/nexus-plugin-prisma.ts`, `util/nexusLogger.ts`, `graphql/api.graphql`, `graphql/types.ts`, `graphql/modules.d.ts`.
- **Removed deps**: `nexus`, `nexus-plugin-prisma`, `nexus-plugin-shield`, `apollo-server-micro`.
- **Added deps**: `@prisma/client@5.22`, `prisma@5.22`, `graphql@16.13`, `@pothos/core@4.12`, `@pothos/plugin-prisma@4.14`, `@pothos/plugin-prisma-utils@1.3`, `graphql-yoga@5.21`, `prisma-generator-pothos-codegen@0.7`, `tsx@4.21`, `typescript@5.9` (bumped from 4.3 — required by pothos/plugin-prisma).
- **Prisma 5**: `schema.prisma` gains `generator pothos { provider = "prisma-pothos-types"; output = "../graphql/pothos-types.ts" }`. `npx prisma generate` produces both clients cleanly.
- **FieldResolver shim**: `graphql/context.ts` now exports a local `FieldResolver<P,F>` type alias (`(root:any, args:any, ctx:Context, info) => any`). All 9 resolver files rewritten to import it from `../context` instead of `nexus`. `graphql/resolvers/ballots.ts` had an extra `RootValue` import from `nexus/dist/typegenTypeHelpers`, replaced with a local `type RootValue<_T> = any`.
- **permissions.ts**: `NexusGenFieldTypes["Ballot"]` → `Ballot` from `@prisma/client`. All other shield rules untouched.
- **Pothos builder** (`graphql/builder.ts`): SchemaBuilder wired with Prisma + PrismaUtils plugins, `DateTime` + `Json` scalars via `graphql-scalars`, `PrismaTypes` imported from generated `./pothos-types`. Enum refs exported: `RoleEnum`, `GenderEnum`, `BallotScopeEnum`, `VisibilityEnum`, `ActivityTypeEnum`, `VotingStatusEnum` (last one declared manually since no Prisma model uses VotingStatus → Prisma tree-shakes it). `Prisma.dmmf` passed to the plugin per v4 requirement.
- **Yoga handler** (`pages/api/graphql.ts`): replaces `ApolloServer`. `getSessionUser(req)` call signature unchanged (still takes `NextApiRequest`-shaped object). `bodyParser: false` preserved.
- **16 prismaObject types scaffolded** — one file per model under `graphql/schema/`, each exporting a `*Type` ref:
  - `UserType`, `TeamType`, `SchoolType`, `BallotType`, `BallotRunType`, `VoteType`, `DiscussionType`, `ReactionType`, `AttachmentType`, `WorkType`, `ActivityType`, `SwissvoteType`.
  - Custom types as `builder.objectRef<Shape>(name).implement(...)`: `ResponseLogin`, `InviteResponse`, `ProgressCard`, `ProgressStudent`, `ResponseProgress`, `BallotResults`, `Response`, `Card`, `Stats`.
  - `Discussion.children` self-ref attached via `builder.objectFields` after declaration.
  - `Ballot.canVote`/`hasVoted` and `Discussion.children` use dynamic `await import("../resolvers")` to avoid dragging MDX content imports through the schema-build tree.
- **Shield middleware** (`graphql/schema/index.ts`): re-exports `applyMiddleware(builder.toSchema(), permissions)` as `schema`. All 12 schema modules imported in sequence for side-effect registration.
- **printSchema script** (`graphql/printSchema.ts`): new — `node --import tsx graphql/printSchema.ts > graphql/api.graphql`. Also exposed as `yarn schema:print` (replacing the old `nexus:reflection` script). Uses `lexicographicSortSchema` for stable output.
- **Three resolver files** still imported generated types from `graphql/types`; those are replaced with local type definitions:
  - `resolvers/swissvotes.ts`: `Swissvote` → `@prisma/client`.
  - `resolvers/cards.ts`: `Card` is now a local `export type Card = {...}` (keep in sync with `schema/cards.ts`).
  - `resolvers/teams.ts`: `ProgressCard`/`ProgressStudent`/`User` → local types + `@prisma/client`.

### Current state

- **Server-side TS**: clean. `tsc --noEmit` reports 0 errors in `graphql/**`, `pages/api/graphql.ts`, `util/**`.
- **SDL generation**: `yarn schema:print` produces 275 lines. Baseline is 8772. The 8500-line gap is entirely missing `Query`/`Mutation` fields + auto-CRUD `WhereInput`/`OrderByInput`/`CreateInput`/`UpdateInput` types. This is Steps 7 + 8, the known long pole.
- **Frontend TS**: 163 errors, all in `pages/**` and `components/**`, all tracing back to `graphql/types` missing. This is the *expected* intermediate broken state per the revised plan — fixes automatically once codegen runs against a complete Pothos SDL (Step 11).
- **Dev/build/cypress**: not attempted. Cannot run until steps 7–11 close the schema.

### Resumption checklist — what's left

Pick up on branch `next-upgrade`, tag `pre-phase-2` for reference.

#### Step 7 — Custom queryField / mutationField wiring

Every `graphql/schema/*.ts` file ends in a `// TODO Step 7:` comment listing the ops to wire. Resolver functions already exist and are exported from `graphql/resolvers/*` — this step is re-wiring only, no business-logic changes. Shape:

```ts
builder.queryField("me", (t) =>
  t.field({
    type: UserType,
    nullable: true,
    resolve: (_root, _args, ctx) => users.getUser(ctx),
  })
);

builder.mutationField("login", (t) =>
  t.field({
    type: ResponseLogin,
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: (_root, args, ctx, info) =>
      users.login(_root, args, ctx, info),
  })
);
```

Full list (from deleted `graphql/schema/*` — reconstructible from `git show pre-phase-2:graphql/schema/...`):
- **users.ts**: `me`, `login`, `magic`, `emailVerification`, `checkVerification`, `changePassword`, `createInvitedUser`, `acceptInvite`, `setSchool`, `deleteAccount`, `createUser` (custom, not plain CRUD — wraps `users.createUser`).
- **teams.ts**: `progress`, `inviteStudents`, `setPrefs`, `setNotes`.
- **ballots.ts**: `getBallotRuns`, `getBallotResults`, `addBallotRun`, `removeBallotRun`, `startBallotRun`, `endBallotRun`. Plus the locale-replacement wrapper around CRUD `ballot`/`ballots` — in Pothos this becomes `resolve: async (...) => { const b = await prisma.ballot.findUnique(...); replaceLocale(b, ctx.req.headers['accept-language']); return b; }`. Yoga passes `req` as a Fetch `Request`; confirm `ctx.req.headers['accept-language']` still works or switch to `ctx.req.headers.get?.('accept-language')`.
- **votes.ts**: `vote`, `voteCode`.
- **discussions.ts**: `getTeamDiscussions`, `postDiscussion`.
- **cards.ts**: `cards` (with `keywords`/`age`/`type` args), `setCards`.
- **stats.ts**: `stats` (`from`/`to` float args).
- **swissvotes.ts**: `swissvotes` (with `keywords`/`type`/`result`/`hasPosters`/`limit`/`offset`/`sort` args). Uses `db.$queryRawUnsafe` — already Prisma-5-compatible.
- **works.ts**: no non-CRUD custom ops (all via `postWork`/`deleteWork` aliases — Step 8).
- **activities.ts**: no non-CRUD custom ops (via `postActivity` alias — Step 8).

#### Step 8 — Auto-CRUD ops (the long pole)

The ~13 CRUD ops reference generated Nexus input types (`UserWhereUniqueInput`, `TeamCreateInput`, etc.) that client operations rely on. These must be re-created via `@pothos/plugin-prisma-utils`:

```ts
const UserWhereUniqueInput = builder.prismaWhereUnique("User", {
  fields: { id: "String", email: "String" },
});
const UserOrderBy = builder.prismaOrderBy("User", { ... });
// etc.
```

CRUD ops to re-create (from DATA.md + deleted schema files):
- `user` (findUnique), `users` (findMany + ordering + filtering).
- `school` (findUnique), `schools` (findMany + ordering + filtering), `createOneSchool`, `deleteOneSchool`.
- `team` (findUnique), `teams` (findMany + ordering + filtering), `createOneTeam` (with `computedInputs` — in Pothos, pass `invite: randomBytes(6).toString("hex")` and `code: String(random(...))` via a wrapper resolver that injects them into `data` before `prisma.team.create`), `deleteOneTeam`.
- `ballot` (findUnique, locale-wrapped), `ballots` (findMany, locale-wrapped + ordering + filtering), `createOneBallot`, `updateOneBallot`, `deleteOneBallot`.
- `activities` (findMany + ordering + filtering + pagination), `postActivity` (createOne alias).
- `attachments` (findMany + ordering + filtering, custom resolver wrap — already in `resolvers.attachments.attachments`).
- `works` (findMany + ordering + filtering, custom resolver wrap), `postWork` (createOne alias), `deleteWork` (deleteOne alias).

Iteration loop: after each increment, `yarn schema:print && diff <(git show pre-phase-2:graphql/api.graphql) graphql/api.graphql | head -200`. Hand-tune until structural parity.

#### Step 11 — Regen client codegen

Once SDL diff is cosmetic: `yarn graphql` regenerates `graphql/types.ts` + `graphql/modules.d.ts`. Expect residual type drift in pages/components — the argument shapes for the ~13 CRUD ops are the main risk (e.g. `UserWhereUniqueInput` may differ between Nexus and Pothos-utils output). Fix inline.

#### Step 12 — SDL diff gate

```
git show pre-phase-2:graphql/api.graphql > /tmp/old.graphql
yarn schema:print
diff /tmp/old.graphql graphql/api.graphql
```
Target: diff contains only field ordering / description / default-value cosmetic changes. Any missing type or field breaks a client op.

#### Step 13 — Cypress smoke

`yarn test`. Baseline 9/14 from Phase 1. Target ≥ 9/14.

### Key risks still outstanding

- **Yoga request shape vs Apollo Server 2**: the old handler receives NextApiRequest; Yoga gives Fetch `Request`. `getSessionUser` reads `req.headers["x-access-token"]` which works on NextApiRequest but needs `.get("x-access-token")` on Fetch Request. Wire it up and test in Step 10 redux.
- **`computedInputs` equivalent in Pothos**: `createOneTeam` generated `invite`/`code` server-side in the Nexus plugin. In Pothos there's no direct equivalent — it must happen in the resolver wrapper before calling `prisma.team.create`.
- **Relay-style connections vs simple lists**: nexus-plugin-prisma's findMany returned lists. Pothos's `prismaConnection` returns Relay connections by default. Use `builder.prismaObject`'s `findMany` mode (returns a plain list) to match the old SDL — otherwise every list query breaks its client shape.
- **Input type naming**: Pothos-utils generates input types with slightly different naming than Nexus (e.g. `UserOrderByWithRelationInput` vs `UserOrderByInput`). Explicitly name inputs via the `name:` option on each `builder.prismaOrderBy/prismaWhere` call to match the old SDL.
