# CLAUDE.md — voty.ch

Civic education platform for Swiss schools. Teachers create classes, assign curriculum "cards" (tests, videos, chats, discussions), and run ballots/votes. Students participate in class, discuss, submit work, and cast votes.

## Stack (as of 2026-04, post-migration)

- **Next.js 16** (pages router, Turbopack default), **React 19**, TypeScript (strict)
- **Prisma 6** → Postgres
- **GraphQL** via **Pothos 4** (`@pothos/core`, `@pothos/plugin-prisma`, `@pothos/plugin-prisma-utils`, `@pothos/plugin-scope-auth`)
- **GraphQL Yoga 5** on `/api/graphql`
- **Apollo Client 3.14** + `@graphql-codegen/*` for typed hooks
- Per-field auth via Pothos `scope-auth` — scopes (`loggedIn`, `teacher`, `admin`) declared on the builder, applied inline on fields/types in `graphql/schema/*`. Dynamic parent-aware checks live in `graphql/auth.ts`.
- Auth: JWT (`jsonwebtoken`) in `x-access-token` header, bcryptjs passwords
- UI: **Tailwind 4** (Phase 6B), **react-hook-form + zod** forms
- State: **Jotai 2** (minimal — auth token + user)
- Content: **MDX 3** (@next/mdx, @mdx-js/react) for ~21 static pages
- Email: MJML + Mustache templates + nodemailer; IMAP poller (imap-simple)
- Uploads: formidable → local `uploads/`
- Node: 24 (`engines: ">=24"`)
- Tests: Cypress 15 — run against `CYPRESS=1 yarn start` (prod build), not dev
- Deploy: Ansible playbooks, docker-compose

## Directory layout

```
pages/              Next routes (teacher, student, admin, MDX content)
  api/              graphql.ts, upload, email-verify, feedback endpoints
components/         ~53 React components (Ballots, Cards, Discussion, Work, Header, Form, …)
graphql/
  builder.ts        Pothos SchemaBuilder (ScopeAuthPlugin + PrismaPlugin + PrismaUtils,
                    Scalars). Declares the AuthScopes type and the loader that turns
                    ctx.user into the {loggedIn, teacher, admin} scope map.
  schema/           Per-domain Pothos type + query/mutation field defs: users, teams,
                    schools, ballots, votes, discussions, works, activities, attachments,
                    cards, stats, swissvotes (imported for side effects to register types)
  resolvers/        Business logic (login, magic link, vote, invites, …) — wired into
                    builder.queryField / builder.mutationField from schema/*
  auth.ts           Dynamic authScopes helpers that depend on parent/args (canViewUserDetails,
                    canReadUser, canUpdateUser, isTeamTeacherOrAdmin, isTeamMemberOrAdmin)
  context.ts        Yoga context builder (user, db, req, res) + FieldResolver shim
  api.graphql       Generated SDL (check in) — regenerate via `yarn schema:print`
  printSchema.ts    Small script that prints SDL from the Pothos schema
  pothos-types.ts   Generated Prisma → Pothos type map (via prisma-generator-pothos-codegen)
prisma/schema.prisma  16 models, Postgres
util/               apollo client, cookies, email, logger, prisma singleton, hooks
state/user.ts       Jotai atoms: accessTokenState, userState
pages/*.mdx         Static content (FAQ, Datenschutz, Glossar, Lernen, Leben, …)
content/, mails/    MDX card content + MJML mail templates
cypress/            E2E tests + fixtures
ansible/            Deploy scripts incl. prisma-loader-cli.ts for DB seeding
```

## Core user flows

1. **Teacher onboarding**: sign up → pick school → create Team → get invite code.
2. **Student join**: `/i/[invite]` auto-registers + attaches to Team, or signup + enter code.
3. **Curriculum**: teacher picks "cards" (curriculum tiles) per team via `setCards`; students work through them in `/aula`.
4. **Discussion / Work**: students post `Discussion` or submit `Work` (with `Visibility`); peers/teacher react (`Reaction`) and attach files. Activity feed logs everything.
5. **Voting**: teacher attaches a `Ballot` to team (`BallotRun` with start/end). Student votes (`vote` mutation). `Voted` stores "who voted" (for uniqueness); `Vote` stores the anonymized choice. Results queried via `getBallotResults`.
6. **Admin**: manage schools/teachers/ballots globally; view stats.

## Authentication

- Login resolver returns JWT signed with `SESSION_SECRET` (exp `SESSION_EXPIRES`, default 1d).
- Client stores JWT in localStorage `@token`; Apollo auth link injects `x-access-token` + `Accept-Language`.
- Passwordless "magic link" flow via `VerificationRequest` table.
- `CheckLogin` in `_app` rehydrates `userState` on load.

## Data model (see DATA.md for full details)

16 Prisma models: User, Team, School, Domain, Ballot, BallotRun, Option, Vote, Voted, Discussion, Work, Reaction, Attachment, Activity, VerificationRequest, Swissvote.

Enums: Role (User/Admin/Student/Teacher/Principal), Gender, BallotScope (Public/National/Cantonal/School/Team), VotingStatus, Visibility (Private/Team/School/Public), ActivityType.

## Conventions & notes

- Ballot title/description/body stored in 4 columns per locale (de/fr/it + base) — translation is flat, not relational.
- `Voted` + `Vote` split = vote anonymity: `Voted` proves a user voted, `Vote` holds the choice, no FK between them.
- `Team.cards` is a plain string (comma-joined card IDs). `prefs`/`notes` are JSON blobs.
- `Reaction.emoij` (sic — typo in schema, preserved for backward compat).
- `Swissvote` is a read-only historical dataset, unrelated to user voting flow.
- `graphql/api.graphql` is committed — regenerate via `yarn schema:print > graphql/api.graphql` after touching types.
- Codegen (`yarn graphql`) generates typed Apollo hooks in component files from inline `gql` tags.
- Cypress runs against the prod build with `CYPRESS=1 yarn start` so `/tmp/voty-verification-url` is written for the email-verification E2E flow.

## Common commands

```
yarn dev            # next dev
yarn build          # next build
yarn start          # next start (cypress: CYPRESS=1 yarn start)
yarn init:db        # prisma migrate dev
yarn reset:db       # reload test fixtures
yarn graphql        # graphql-codegen (Apollo hooks from inline gql tags)
yarn schema:print   # print SDL from Pothos schema (redirect into graphql/api.graphql)
yarn check:ts       # tsc --noEmit
yarn cy / yarn test # cypress
```

## Known tech debt

- **App Router / RSC migration**: staying on Pages Router is a deliberate ongoing choice. Would require hand-rolling the `de/fr/it` locale routing (built-in `i18n` config is not supported in App Router) plus rewrites of ~46 files that use `next/router`.
- **eslint-config-next 11 + eslint 7**: stale toolchain; doesn't block builds. Bump after ESLint 9 flat-config is warranted.

See MIGRATION_PLAN.md for the migration history and remaining followups.

### Important points for Agents

- Unless instructed otherwise, do your changes directly on branch main
- Never access the database on production
- Be very lean with comments, only where they truly add value
