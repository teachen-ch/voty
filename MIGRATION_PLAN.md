# MIGRATION_PLAN.md

Original goal (2026-04): rip out `nexus-plugin-prisma` + `@nexus/schema` + Apollo Server 2; upgrade Next.js 12 → 14; keep the client-side GraphQL surface intact. Constraint: **least effort, good maintainability, no major feature work planned for months.**

Chosen direction: **Pothos + GraphQL Yoga on the existing schema/resolver split, Apollo Client stays.** The React/Apollo client code (hundreds of `gql`-tagged ops) is the largest artifact; Pothos + Yoga replaces only ~15 server-side files and leaves client, codegen, and shield rules intact.

---

## Status

| Phase | Scope                                                             | Status             |
| ----- | ----------------------------------------------------------------- | ------------------ |
| 0     | Safety net (`pre-migration-baseline` tag)                         | ✅                 |
| 1     | Prisma 2 → 3, nexus package rename, arm64-native dev loop         | ✅                 |
| 2     | Prisma 3 → 5 + Pothos + Yoga (big-bang, bundled with Apollo 3.14) | ✅                 |
| 3     | Apollo Server → Yoga                                              | ✅ (merged into 2) |
| 4     | Next 12 → 14, React 17 → 18                                       | ✅                 |
| 5     | Cleanup, docs, `api.graphql` regen                                | ✅                 |
| 6A    | MDX 1 → 3                                                         | ✅ (cypress re-run deferred) |
| 6B    | theme-ui/rebass → Tailwind 4                                      | ✅                 |
| 7A    | Next 14 → 16, React 18 → 19, Recoil → Jotai                        | ✅ (cypress 14/14) |
| 7B    | Prisma 5 → 6, Cypress 13 → 15, Formik/Yup → react-hook-form/zod    | ✅ (cypress 38/38) |

**Cypress: 14/14** at end of Phase 5, re-asserted at Phase 7A, and **38/38** at end of Phase 7B (includes the 24-route hydration smoke spec added during 7A).

---

## Summary of phases 1–5 (what was done, what hurt)

### Phase 1 — Prisma 2 → 3 + nexus package rename

- `@prisma/client` + `prisma`: `2.22.1` → `3.15.2` (minimum Prisma with native arm64-darwin; can't jump to 5 because `nexus-plugin-prisma` never supported Prisma 4+).
- `nexus-plugin-prisma`: `0.26.0-next.1` → `0.35.0`; switched `@nexus/schema` → renamed `nexus@1.3.0` across ~24 files.
- Added `binaryTargets = ["native", "debian-openssl-1.1.x"]` for prod linux deploys.
- Plugin warns it only supports Prisma 2.23.x — ignored, whole stack gone in Phase 2.

**Main challenge:** Cypress on pure Prisma 2.22 arm64 macOS hangs (bundled x86*64 engine), so behavioral baseline had to be taken \_after* Phase 1 rather than before. Prod was the reference for the pre-Phase-1 state.

### Phase 2 — Prisma 5 + Pothos + Yoga (big-bang)

Landed as a single mostly-monolithic effort after a failed cautious attempt. Final target state: Prisma 5, `@pothos/core@4` + prisma plugin + prisma-utils, `graphql-yoga@5`, `graphql@16`. Nexus stack fully removed. `graphql-shield` + `graphql-middleware` retained and applied to Pothos schema. Client `gql` ops unchanged (SDL diff clean by end).

**Main challenges:**

1. **Cautious chunking didn't work.** First attempt tried to do it incrementally; reverted. There's no natural seam between "Nexus partially" and "Pothos partially" — Prisma 5 breaks `nexus-plugin-prisma`; removing it breaks all `graphql/schema/*.ts` at once; any new Pothos schema needs Prisma 5; any new SDL breaks all 60+ client imports. Re-planned as big-bang: accept days of broken build state, commit WIP freely, only require green at the end.
2. **SDL parity with Nexus was impractical at full fidelity.** Nexus-generated `api.graphql` was 8772 lines (mostly auto-CRUD inputs the client never used). Pothos/`prisma-utils` needs explicit per-type declarations. Solution: hand-craft input types in `graphql/schema/crud.ts` covering _only_ what client `gql` ops actually reference (~430 lines). Final SDL is 624 lines.
3. **`computedInputs`** (Nexus-plugin-prisma feature that injected `invite`/`code` server-side on `createOneTeam`) has no Pothos equivalent — moved into the create resolver wrapper.
4. **Pothos v4 `defaultFieldNullability: false`** is required (otherwise 200+ frontend errors from relations defaulting nullable) but is missing from the v4 type defs. Annotated `@ts-expect-error`; must re-check on Pothos upgrades.
5. **Yoga `maskedErrors: true` default** wraps resolver `throw Error("Error.UserPassword")` as `"Unexpected error."`, breaking every client-side `tr(error.message)` lookup. Fix: `maskedErrors: false`. Followup: convert to `throw new GraphQLError(...)` + selective unmask.
6. **Codegen toolchain rot:** `@graphql-codegen/cli` 1.x doesn't run on Node 20; bumped to v5 + sibling plugins to v4. `typescript-react-apollo` temporarily pinned to 3.3.7 (v4 needs Apollo ≥ 3.8); unpinned in session 4 after Apollo upgrade.

### Phase 3 (merged into Phase 2)

Apollo Server → Yoga swap in `pages/api/graphql.ts`. `getSessionUser(req)` still reads NextApiRequest-style headers via a cast over Fetch `Request` — type-fragile but works.

### Phase 4 — Next 12 → 14 + React 17 → 18

- `next` 12.1 → 14.2.35; `react`/`react-dom` 17 → 18.3.1; `@next/mdx` 12 → 14.2.35; `@types/react` 17 → 18 (pinned in `resolutions` — otherwise `@types/rebass` → `@types/styled-components` drags in a second `@types/react@17` and produces 1235 TS2786 errors).
- `npx types-react-codemod implicit-children` across `components/`, `pages/`, `util/` — 77 files, `React.FC<P>` → `React.FC<React.PropsWithChildren<P>>`.
- Apollo Client 3.3 → 3.14.1 (session 4); codegen `typescript-react-apollo` unpinned 3.3.7 → 4.4.1.

**Main challenges:**

1. **React 18 stricter `FunctionComponent` broke rebass `<Card>`**: typed `React.FunctionComponent<BoxKnownProps>` with no `children`. Fix in `@types/rebass.overrides.ts`: augment exported `BaseProps` (not unexported `BoxKnownProps`) to add `children?: ReactNode`; removed `@ts-nocheck` from that file so augmentations actually apply.
2. **Hydration warnings are now errors in React 18**, thrown from theme-ui 0.3's `useColorMode` and rebass's HTML-nesting quirks. Dev overlay blocks cypress; prod throws minified error #418/#423/#425. Workaround: `Cypress.on("uncaught:exception", …)` swallows the specific messages; cypress runs against `CYPRESS=1 yarn start` (prod build). **Not fixed — only suppressed.** Full fix requires replacing theme-ui → Phase 6.
3. **Children-prop holes** in formik's `<Form>`, `RecoilRoot`, `react-new-window`, and local `util/chaty.tsx` all needed one-line casts or small shim files.
4. **`next/image` rejects `width="20px"`** — ~18 sites changed to numeric.
5. **Cypress flow now requires a prod build**: `yarn next build && CYPRESS=1 yarn start`. `graphql/resolvers/users.ts` verification-URL write gate relaxed from `NODE_ENV !== "production"` to `|| CYPRESS`.

### Phase 5 — Cleanup

- Deleted nexus files + stale references in `.eslintignore`, `.gitignore`, `tsconfig.json`, `Dockerfile`.
- Regenerated `graphql/api.graphql` via `yarn schema:print`.
- Refreshed `CLAUDE.md` + `DATA.md` to reflect post-migration stack.
- Fixed `student.spec.ts` year-dropdown test aging (`currentYear - 15` instead of hardcoded `"2004"`) — Cypress now 14/14.

---

## Outstanding followups from 1–5 (small, not blocking Phase 6)

- **`cache.modify` `any` casts** in `components/{Schools,Teams,Ballots,Discussion}.tsx` — type-safety regression from Apollo 3.14's `Modifier<T>` tightening. Proper fix is a typed helper accepting `Reference | T | undefined`.
- **`GraphQLError` conversion**: `throw Error("Error.X")` → `throw new GraphQLError("Error.X")` server-side, then re-enable Yoga `maskedErrors` with a selective unmask. Current setup exposes all errors — fine for our threat model but not best practice.
- **Recoil → Jotai**: one-atom-pair surface (token + user). Was flagged to bundle with React 18; skipped. Still trivial to do standalone.
- **Pothos `defaultFieldNullability` typing**: `@ts-expect-error` annotation in `graphql/builder.ts` — re-check on every Pothos bump.

---

## Phase 6 — MDX 1 → 3 and theme-ui/rebass → Tailwind 4

This phase is deliberately larger than Phases 1–5 combined. Two independent tracks that can ship in separate PRs:

- **Track A (MDX 1 → 3):** ~50 `.mdx` files across `pages/`, `content/`, `mails/`. Contained blast radius; mostly loader + frontmatter + heading/anchor quirks.
- **Track B (theme-ui 0.3 + rebass → Tailwind 4):** ~105 components import rebass or theme-ui. This is the tech debt noted in CLAUDE.md. Much larger surface, but no schema/data risk — pure UI rewrite.

Recommended sequence: **Track A first** (smaller, unblocks MDX ergonomics; independent of UI layer). Then Track B (the big one).

### Track A — MDX 1.6 → 3.x — DONE (2026-04-16)

Landed in one session. `yarn next build` + `yarn check:ts` green; manual smoke on `/glossar`, `/faq`, `/content/lernpfad`, chaty card all passed. Cypress re-run deferred (port-3000 already had a running server I didn't start — not worth resolving mid-session).

**What was done**

- `yarn remove @mdx-js/runtime @mdx-js/loader` (v1) + `yarn add @mdx-js/loader@^3 @mdx-js/react@^3`.
- `next.config.js`: set `providerImportSource: "@mdx-js/react"` on `withMDX({ options: ... })`; added a small webpack rule (`resourceQuery: /raw/, type: "asset/source"`) to support `?raw` imports.
- Deleted stale `@mdx-js/react` + `@mdx-js/runtime` module declarations in `@types/mdx.d.ts` (MDX 3 ships real types). Added `*.mdx?raw` declaration.
- Rewrote the two `mdxType` call sites (prop removed in MDX 2+):
  - `pages/_app.tsx` MDXWrapper heading detection: `el.type === "h1"` instead of `el.props.mdxType === "h1"`.
  - `components/Glossary.tsx` parseGlossary: switched approach entirely (see below).
- Converted the one HTML comment in the codebase to MDX syntax: `content/videos/srf_populismus.mdx` `<!-- … -->` → `{/* … */}`.

**Main challenges / non-obvious learnings**

1. **MDX 3 components are hooks — can't be invoked at module load.** The old `components/Glossary.tsx` called `Glossar({}).props.children` at module scope to build a term→definition map. In MDX 3, that throws `TypeError: Cannot read properties of null (reading 'useContext')` because the compiled MDX component calls `useMDXComponents()` internally. Fix: stop invoking the component. Instead, import the raw source with `import glossarSource from "pages/content/glossar.mdx?raw"` (enabled by the webpack `asset/source` rule) and parse the `## term` / `paragraph` structure with a small regex. The rendered `<Glossary />` component itself still works fine via MDXProvider as before; only the side-effect parse moved.
2. **Audit false positives on frontmatter.** The `^---$` grep flagged 1 file (`pages/content/tools/chaty.mdx`), but those `---` are thematic breaks (horizontal rules), not YAML frontmatter. **No actual frontmatter in the codebase** — `remark-frontmatter` / `remark-mdx-frontmatter` not needed.
3. **`@mdx-js/runtime` had zero actual imports** — only declared in `@types/mdx.d.ts` and `package.json`. Trivial to remove.
4. **`remark-gfm@^1` + `remark-images@^2` stay.** They're used by `react-markdown@5` in `util/markdown.tsx`, not by MDX. Separate upgrade track if/when react-markdown gets bumped.
5. **Parse errors were minimal.** Only 1 file out of 50 failed v3 parse (the HTML comment). Everything else — including `export const meta = {...}` in 29 content files, cross-MDX imports in `pages/content/lernpfad.mdx`, and SVG imports inside MDX — parsed unchanged.

**Track A followups (small)**

- **Cypress re-run.** Manual smoke covered the high-risk paths, but the 14/14 gate hasn't been re-asserted post-MDX-3. First thing next session: `yarn next build && CYPRESS=1 yarn start && yarn test`.
- **`Glossar({}).props.children` is gone, but the `<Glossary />` component still works.** If glossary behavior ever needs the structured map at runtime (not just via regex parse), prefer the raw-source path or a new React-context population pattern — do not reintroduce the module-load `Glossar({})` call.
- **Webpack `?raw` rule is now a generic escape hatch** for any future "I need this MDX/MD as a string" need.

### Track B — theme-ui 0.3 + rebass → Tailwind 4

**Why Tailwind 4:** modern, maintained, small runtime, good DX. Alternatives considered: theme-ui 0.16 (still semi-maintained but rebass is dead and replacing rebass is most of the work anyway), CSS Modules + vanilla extract (more boilerplate).

**Target deps:** `tailwindcss@^4`, `@tailwindcss/postcss`, remove `theme-ui`, `@theme-ui/*`, `rebass`, `@rebass/forms`, `@types/theme-ui`, `@types/rebass`, `@types/rebass__forms`. Keep Formik + Yup.

**Blast radius:**

- ~105 components import rebass/theme-ui. Common imports: `Box`, `Flex`, `Text`, `Heading`, `Button`, `Card`, `Image`, `Link`, `Input`, `Label`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Field`.
- Theme tokens in `components/Theme.tsx` (colors, fonts, spacing, variants) need to move to `tailwind.config.ts` theme extension.
- `sx={...}` props everywhere → Tailwind class strings. This is the long pole — no codemod handles it cleanly because `sx` mixes design tokens, arbitrary CSS, and JS expressions.
- `useColorMode` (dark mode) → Tailwind's `dark:` variants + `next-themes` or a small localStorage hook.
- Responsive array props (`width={[1, 1/2, 1/3]}`) → Tailwind's `sm:`, `md:`, `lg:` prefixes.
- MDX component mapping in `components/Theme.tsx` (`<h1>` → styled Heading, etc.) — rewrite the mapping to Tailwind-styled elements.

**Execution strategy — scoped subsets:**

This is **not** feasible in one sitting. Propose splitting into independently-landable PRs:

1. **B0 — Infra + theme tokens (0.5–1 day):** install Tailwind 4, wire into `pages/_app.tsx` via `globals.css`, port theme tokens from `components/Theme.tsx` to `tailwind.config.ts`. No components migrated yet. Both systems coexist; theme-ui still active. Gate: `yarn next build` green, no visual change.
2. **B1 — Shared primitives (1–2 days):** create thin replacements for `Box`, `Flex`, `Text`, `Heading`, `Button`, `Card`, `Link` in `components/ui/`. Each is ~10 lines of Tailwind-classed `div`/`span` with `cva` for variants. Don't swap usage yet; just land the primitives.
3. **B2–Bn — Component migration, one area at a time:** swap imports per area, delete theme-ui/rebass usage in that area, verify in browser. Suggested order (low-risk first):
   - B2: static content + layout (`Header`, `Footer`, `Page`, `Nav`).
   - B3: auth + forms (`Login`, `Signup`, `Form`, `Field`, `Checkbox`, `Radio`).
   - B4: teacher flows (`Teams`, `Schools`, `Invites`).
   - B5: student flows (`Aula`, `Cards`, `Discussion`, `Work`).
   - B6: ballots + votes (`Ballots`, `Vote`, `BallotResults`).
   - B7: admin panels + stats.
4. **B8 — MDX content pages:** `pages/**/*.mdx` + `components/Theme.tsx` MDX mapping. Depends on Track A being done (`MDXProvider` semantics changed).
5. **B9 — Removal:** `yarn remove theme-ui @theme-ui/* rebass @rebass/forms @types/theme-ui @types/rebass @types/rebass__forms`, delete `@types/rebass.overrides.ts`, remove cypress hydration-error suppression (should no longer be needed).

**Main anticipated challenges:**

1. **`sx={...}` is not mechanically convertible.** A lot of `sx` usage is design tokens (`sx={{ bg: "primary", p: 3 }}`) which is easy, but plenty mixes in arbitrary CSS, pseudo-selectors, and conditional expressions. Case-by-case.
2. **Theme variants in theme-ui** (`<Button variant="primary">`) need to map to `cva` or an explicit Tailwind class composition. Inventory variants in `components/Theme.tsx` before starting B1.
3. **Responsive array props** (`<Box width={[1, 1/2]} />`) expand to 2–3 Tailwind classes per breakpoint. Mechanical once you have the mapping table, but voluminous.
4. **Rebass `<Image>`** and `next/image`: audit — some `<Image>` uses might be raw `<img>` styled, others next/image. Consolidate.
5. **Form libraries (`@rebass/forms`)** provide `Input`, `Label`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Field`. Formik's `Field` API is unchanged; just rewrite the styled wrappers.
6. **Hydration-error suppression in cypress can finally be removed** once theme-ui is gone. Verify the suppressors are no longer needed at B9 — if they are, something else generates hydration mismatches and needs investigation.
7. **Visual regressions**: no golden-image testing exists. Manual review per area. Consider bolt-on visual regression (Percy/Chromatic) before B2 if budget allows, otherwise careful per-PR review.

**Effort:** 8–15 engineering days end-to-end for Track B. Highly sensitive to how many `sx` one-offs exist (can only be known after B1 scaffolding lands).

### Recommended next-session subset

Track A is done. Track B is still the ~8–15 day long pole. Suggested next-session scope:

- **Cypress 14/14 re-assert** against the MDX-3 build (quick, mostly sanity).
- **Track B0 only** — install Tailwind 4, wire into `pages/_app.tsx`, port theme tokens from `components/Theme.tsx` to `tailwind.config.ts`. No component migrated. Both systems coexist. Gate: build green, no visual change.
- **Defer B1+** to a separate session. B0 is mechanical; B1 primitives benefit from a fresh context window.

---

## Phase 7A — Next 14 → 16, React 18 → 19, Recoil → Jotai — DONE (2026-04-18)

Landed on the `tailwind` branch as three commits after Track B merged: (1) Recoil → Jotai, (2) the big bump, (3) scaffold cleanup. `yarn build` + `yarn check:ts` green; Cypress 14/14 re-asserted against the Next 16 prod build (`CYPRESS=1 yarn start && yarn test`).

**What was done**

- `next` 14.2.35 → 16.2.4; `@next/mdx` 14.2 → 16.2.
- `react` 18.3.1 → 19.2.5; `react-dom` 18.3.1 → 19.2.5.
- `@types/react` 18 → 19, `@types/react-dom` 18 → 19, `@types/node` 14 → 20. `engines.node` tightened to `">=20"` (Next 16 requires).
- `recoil@0.3.1` removed → `jotai@2.19.1`. Surface was 2 atoms + 1 `<RecoilRoot>` wrapper; the Phase-4 `RecoilRoot` children cast went with it.
- Peripheral React-19-incompat deps: `react-markdown` 5 → 9, `qrcode.react` 1 → 4, `react-player` 2 → 3, `react-new-window` 0.1 → 1. Removed stale `@types/mdx-js__react` (@mdx-js/react 3 ships its own types) and `@types/qrcode.react` (qrcode.react 4 ships its own).
- Dropped `@types/react` resolution pin (no rebass drag anymore); re-added pinned to `^19` to dedupe the nested copy jotai pulls in.
- Dropped obsolete Phase-4 scaffolds: `@types/react-new-window-shim.d.ts` (react-new-window 1 declares `children?` natively) and — already gone from Track B — the Cypress `uncaught:exception` hydration suppressor.
- `images.localPatterns: [{ pathname: "/**", search: "" }]` added to `next.config.js` (Next 16 enforces for local `src` URLs).
- Next 16 auto-rewrote `tsconfig.json` (`jsx: "preserve"` → `"react-jsx"`, reformatted `lib`) and `next-env.d.ts` (adds `next/image-types/global` reference).

**Main challenges / non-obvious learnings**

1. **Turbopack doesn't honor the webpack `?raw` resourceQuery rule.** Track A's `pages/content/glossar.mdx?raw` import silently compiled to the MDX component module on Next 16 (which now uses Turbopack by default), so `glossarSource.split("\n")` threw `h.default.split is not a function` during build-time page-data collection for `/admin`. Trying to match Turbopack's rule syntax for a resourceQuery-style loader was fruitless. Fix: kill the runtime `?raw` parse entirely — added `scripts/gen-glossary.ts` that runs as a prebuild step (`yarn gen:glossary` wired into `dev`/`build`) to emit a committed `util/glossar-data.ts` with the term→definition map. Removed the webpack rule and the `*.mdx?raw` module declaration. **`?raw` as an escape hatch is off the table on Turbopack; do build-time generation instead.**
2. **React 19's `FunctionComponent` return type broke `MDXComponents` compat.** React 19 types `FC` as returning `ReactNode | Promise<ReactNode>` (async components). `@mdx-js/react`'s `MDXComponents` map expects plain `(props) => ReactNode`. Typed `GlossaryTerm`/`GlossaryText` as plain arrow functions with an explicit `ReactNode` return, dropping the `React.FC<PropsWithChildren>` wrapper — fine and actually cleaner.
3. **Nested `@types/react@18` from jotai and `react-markdown@5` triggered `bigint is not assignable to ReactNode`.** React 19 added `bigint` to `ReactNode`; any sub-dep still pulling `@types/react@18` produced a flood of errors about this. Root cause: jotai pins `@types/react@18` as a peer; react-markdown@5 has a nested `@types/react@17`. Fix: (a) re-add `@types/react` / `@types/react-dom` resolution pins (now at `^19`) to dedupe jotai's copy, (b) upgrade react-markdown to 9 (API change: `plugins` → `remarkPlugins`, `renderers` → `components`, key `image` → `img`).
4. **React 19 `RefObject<T>` is now `RefObject<T | null>`** — `pages/team/[team]/admin.tsx` `copyInvite(ref: RefObject<HTMLInputElement>)` signature had to accept `HTMLInputElement | null`.
5. **React 19 `useRef()` requires an initial argument.** `components/TopBar.tsx` had `useRef<number>()` → `useRef<number | undefined>(undefined)`. Only one site in the whole tree, so no codemod was needed.
6. **React 19 `cloneElement` with extra props requires a generic on `isValidElement<P>()`** to avoid `Partial<unknown> & Attributes`. Hit in `components/Quests.tsx` (`ix`, `setAnswer`, …) and `components/Glossary.tsx`'s `deepReplace`.
7. **`@types/node@20` dropped implicit `global.*` index access.** `util/prisma.ts`'s `global.prisma` dev-HMR singleton needed an explicit `declare global { var prisma: PrismaClient | undefined }` and `globalThis.prisma`.
8. **Formik 2 still lags.** Its `<Form>` export has no `children` type and produces React 19 HTML-prop errors. Kept the `(FormikForm as unknown) as React.FC<PropsWithChildren<unknown>>` cast. Formik 2 is effectively unmaintained for React 19; flagged as tech debt.
9. **react-player 2 → 3 renamed `url` → `src`**, matching native `<video>`. qrcode.react v4 uses `size: number` plus CSS dimensions instead of v1's `width`/`height` props.
10. **Side-observation while bumping**: `pages/swiss-bulgaria.tsx` passed a `top={-20}` prop that `TeaserImage` never accepted — the prop has been silently dropped at runtime since the Tailwind migration. Made `top?: number` a real optional on `TeaserImage` and applied it as a relative offset.

**Phase 7A followups (small)**

- **`eslint-config-next@11.1.0` + `eslint@7.32.0`** are stale relative to Next 16. Doesn't block builds; bump together when ESLint 9 flat-config is warranted.
- **Formik → `react-hook-form`** swap is the last piece of React-19-unmaintained drag, though the single `<Form>` cast is harmless.
- **`next.config.js` → `pages/api/uploaded/[path].ts`** NFT trace warning from Turbopack. Dynamic require on a user-supplied path; consider scoping via `path.resolve` inside `/uploads/...` or a `turbopackIgnore` hint.

### Recommended next-session subset

- **Phase 7B — App Router / RSC** is the remaining architectural shift. Not required for Next 16 (Pages Router is still supported). Biggest blocker: the built-in `i18n` config (`de/fr/it`) is unsupported in App Router — would need middleware-based locale routing or `next-intl`. ~5–10 engineering days. Defer until there's a motivation (RSC, streaming metadata, etc.).
- **Visual regression harness (Percy/Chromatic)** still missing; Cypress covers behavior, not visuals.

---

## Phase 7B — Prisma 6, Cypress 15, Formik+Yup → react-hook-form+zod — DONE (2026-04-18)

Landed as three commits on `tailwind` immediately after Phase 7A.

**What was done**

- `@prisma/client` + `prisma` 5 → 6.19.3. Regenerated Prisma client and `graphql/pothos-types.ts` cleanly (no application code change). `prisma-generator-pothos-codegen@0.7.2` still declares a `@prisma/client@^5` peer — harmless warning.
- `cypress` 13 → 15 + `@testing-library/cypress` to latest. Zero config/spec churn; 38/38 unchanged.
- `formik` + `yup` removed → `react-hook-form@7` + `zod@4` + `@hookform/resolvers`. `components/Form.tsx` rewritten internally; `QForm({ fields, mutation, onSubmit })` consumer API kept stable. `components/Users.tsx` (the only other direct formik consumer) rewritten end-to-end.
- Dropped the `FormikForm as unknown as React.FC<PropsWithChildren<unknown>>` cast (Phase-4 scaffold — formik 2 never supplied `children` on `<Form>`).
- Added missing `@types/yargs` and awaited `yargs.argv` (modern yargs returns a Promise) in `ansible/scripts/prisma-loader-cli.ts`.

**Main challenges / non-obvious learnings**

1. **zod + RHF type plumbing.** `zodResolver(schema)` is picky about the schema's inferred type matching `useForm<T>()`'s generic. Passing the schema through a component prop as `z.ZodTypeAny` loses that link and the resolver overloads reject it. Fix in `Users.tsx` was to widen the prop to `z.ZodType<IProfileForm>` and cast at the two boundaries — inlining the resolver would be cleaner if the schema weren't branchy (teacher vs student).
2. **Formik `validate` field → zod equivalents.** The `QFormField.validate` hook in `components/Form.tsx` used to accept `yup.StringSchema | yup.NumberSchema`. Changed to `z.ZodTypeAny`. Callers switch one word: `yup.string().min(3, "msg")` → `z.string().min(3, "msg")`. Only one such call existed in the whole codebase (`pages/user/signup.tsx`).
3. **"required" semantics differ.** Yup's `.required("msg")` means non-empty; zod's `.min(1, "msg")` is the string equivalent. For other types (number, union), `.refine((v) => v !== "" && v !== null && v !== undefined, { message: "..." })` is the most portable.
4. **Optional strings.** `z.string().optional().or(z.literal(""))` is the pattern that makes an empty string valid (matches yup's non-required default behavior). Without it, an empty input produces a type error on submit for schemas that expect `string | undefined`.
5. **Radio + select ergonomics on RHF.** Unlike formik's `<Field type="radio" name="gender" value={X}/>` auto-wiring, RHF wants `{...register("gender")} value={X}` spread onto a native `<input type="radio">` (same `name` across all four radios; RHF handles the group). Native `<select {...register("year")}>` replaces `<Field as={Select} name="year">`.
6. **Yargs type regression.** `@types/yargs` had previously been implicit or bundled; a recent peer-dep reshuffle (Prisma 6 chain?) dropped it. Also, modern yargs types make `argv` a `… | Promise<…>` — the prisma-loader CLI had to `await cliOptions()`.

**Phase 7B followups (small)**

- `prisma-generator-pothos-codegen` peer warns for `@prisma/client@^5`. No observed problem at runtime; file an issue upstream or pin a minor version when they publish 0.8.x.
- `QForm`'s generics are still loose (`mutation: MutationFunction<any, any>`). If we ever want type-safe variables inference, turn `QForm` into a generic over the GraphQL mutation types — biggish refactor for small gain.
- The single `zodResolver(schema as any)` cast in `ProfileForm` is the only `any` added; could be tightened by inlining resolver construction per branch.

---

## Deferred beyond Phase 7B

- Pages Router → App Router / RSC refactor (see Phase 7A for the i18n constraint).
- Visual regression harness (Percy/Chromatic).
- ESLint 7 → 9 flat-config + eslint-config-next 11 → 16.

---

## Risks & mitigations (Phase 6)

| Risk                                                            | Mitigation                                                                                  |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `sx` prop conversions create subtle visual regressions          | Migrate one area per PR; manual browser review per area; consider visual regression harness |
| Tailwind theme tokens don't cover everything theme-ui had       | Track missing tokens during B1; extend `tailwind.config.ts` as needed                       |
| Cypress hydration suppression masks new errors during migration | Remove the suppressor at B9 and validate; if still needed, investigate before merging       |
