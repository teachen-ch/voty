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

### Phase 2 — Replace Nexus schema with Pothos (3–5 days, the main effort)

Add deps:
```
@pothos/core @pothos/plugin-prisma graphql-yoga graphql-scalars
```
Remove: `@nexus/schema`, `nexus-plugin-prisma`, `apollo-server-micro`, `nexus-plugin-shield`.

Port each file under `graphql/schema/` to a Pothos builder:

1. **Create `graphql/builder.ts`** — `new SchemaBuilder({ plugins: [PrismaPlugin], prisma: { client }, scalars: { DateTime, Json } })`.
2. **Per-model object types** — replace `schema.objectType({ name: "User", definition(t) { t.model.id(); … } })` with `builder.prismaObject("User", { fields: (t) => ({ id: t.exposeID("id"), email: t.exposeString("email", { nullable: true }), … }) })`. Relations use `t.relation("team")`.
3. **Custom queries/mutations** — thin adapter: wrap existing resolver functions from `graphql/resolvers/` as `builder.queryField` / `builder.mutationField`. Resolvers take `{ db, user }` context; keep `graphql/context.ts` and augment Yoga's context factory.
4. **Auto-CRUD replacement** — for each of the ~13 `t.crud.*` ops currently used (list in DATA.md):
   - Reads (`user`, `users`, `team`, `teams`, `school`, `schools`, `ballot`, `ballots`, `activities`, `attachments`, `works`) → Pothos `prismaField` with `findUnique` / `findMany`, pass-through `where`/`orderBy`/`take`/`skip`.
   - Mutations (`createOneX`, `updateOneX`, `deleteOneX`) → explicit `mutationField` that calls `prisma.x.create/update/delete`. Use `@pothos/plugin-prisma-utils` to generate `*WhereInput` / `*CreateInput` / `*UpdateInput` to match the existing SDL (critical: keeps client operations byte-compatible).
   - **Regression gate**: diff the new SDL against `graphql/api.graphql` — any shape change breaks the client. Iterate until diff is only cosmetic (field ordering / descriptions).
5. **Scalars**: `DateTime` + `Json` added directly to builder config.
6. **Permissions**: `graphql-shield` + `graphql-middleware` → `applyMiddleware(pothosSchema, permissions)` works unchanged.
7. **Logging**: port `LoggerPlugin` to a Yoga plugin (envelop-style).

Deliverable: `graphql/api.graphql` regenerated from Pothos is structurally identical to the old one (or only additive).

### Phase 3 — Replace Apollo Server with Yoga on Next API route (0.5 day)

- `pages/api/graphql.ts`: swap `ApolloServer` for `createYoga({ schema, context: ({ req, res }) => buildContext(req, res), graphqlEndpoint: "/api/graphql" })`.
- Disable Next body parser (already disabled for uploads).
- Keep `x-access-token` extraction in `buildContext`.
- Verify GraphiQL/landing only enabled in non-prod.

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
- ⏳ Phase 2 — Nexus → Pothos + Yoga (next)
- ⏳ Phase 1b — Prisma 5 (bundled with Phase 2)
- ⏳ Phase 3 — Apollo Server → Yoga
- ⏳ Phase 4 — Next 14 + React 18
- ⏳ Phase 5 — cleanup
- 🔧 Deferred — fix 5 failing Cypress specs; theme-ui / MDX / App Router replacement

## Next step

**Phase 2 spike**: port `User` + `Team` models and the `users` / `me` / `login` operations to Pothos + Yoga on a branch, diff the SDL, confirm the Apollo client still works unchanged. ~1 day. Go/no-go gate for committing to the rest.
