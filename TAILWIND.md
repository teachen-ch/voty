# Tailwind Migration Notes (Phase 6C — preflight active, base layer restored)

Working notes from the rebass/theme-ui → Tailwind 4 migration. Critical facts, gotchas, and the current state of open issues.

## Environment

- Tailwind 4.x via `@tailwindcss/postcss` (see `postcss.config.js`)
- `styles/globals.css` now does **`@import "tailwindcss"`** (full: preflight + base + components + utilities). Earlier phases used `@import "tailwindcss/utilities"` (utilities only) to coexist with theme-ui; that is gone.
- Design tokens in `styles/globals.css` under `@theme { --color-*, --breakpoint-*, --text-*, --font-* }`
- Root typography restored in a `@layer base` block — see "Base layer is load-bearing" below
- `.theme-aula` body-class overrides (set from `components/Theme.tsx`) replace the old ThemeProvider
- UI primitives in `components/ui/index.tsx` (Box, Flex, Text, Heading, Button w/ cva variants, Image/Input/Textarea/Select shims, useColorMode)
- Utility: `util/cn.ts` = `twMerge(clsx(...))`
- Acceptance gate: Cypress `yarn test` (14/14)

## 🚨 Critical Tailwind 4 gotcha: CSS variables

Tailwind 4 does **NOT** auto-wrap arbitrary values in `var()`. Tailwind 3 did.

- ❌ `bg-[--color-primary]` — compiles to invalid CSS `background-color:--color-primary` (silently broken, no warning)
- ✅ `bg-primary` — compiles correctly
- ✅ `bg-primary` — also works (auto-generated from `@theme { --color-primary: ... }`)

Verify after any class addition by inspecting the compiled CSS utility — if you see `:--color-x` with no `var(...)`, it's broken.

## 🚨 Base layer is load-bearing (Phase 6C discovery)

Switching from `@import "tailwindcss/utilities"` to `@import "tailwindcss"` gets you preflight (good — resets buttons, zeroes h1/p margins, box-sizing) but **not body typography**. theme-ui's old root injected `font-family`, `font-size`, `line-height`, `color` onto the document; preflight does not. Without those, every page renders browser-default **serif 16px**, buttons get default widget color, and it looks broken in ways that are easy to misread as "missing Tailwind classes."

Fix: an explicit `@layer base` block in `globals.css` setting `html { font-family: var(--font-body); font-size: 20px; line-height: 1.45; color: #030303; background: white }` with a `@media (min-width: 600px)` bump to 22px (mirrors the old `fontSize: [2, 2, 3]`). Also heading `font-family: var(--font-heading)`, `a { color: inherit }`, `img { max-width: 100% }`, `strong { font-weight: 600 }`, `hr` border.

If you see "font looks serif" or "button has black text on gradient grey" after any globals.css edit, the base layer is the first place to check.

## 🚨 Breakpoint mapping rule

voty's theme-ui breakpoints: `["400px", "600px", "1200px", "2000px"]`. Tailwind mirror: `xs/sm/md/lg`.

A theme-ui 4-value responsive array `[a, b, c, d]` maps to:

| Position | Breakpoint | Tailwind prefix |
| -------- | ---------- | --------------- |
| a        | default    | (none)          |
| b        | ≥400px     | `xs:`           |
| c        | ≥600px     | `sm:`           |
| d        | ≥1200px    | `md:`           |

A 5-value `[a, b, c, d, e]` adds: `e` → `lg:` (≥2000).

**Migration agents consistently got this wrong**, writing `sm:/md:/lg:` for positions `1/2/3`. This shifted every responsive style UP one breakpoint — content that should activate at 600px+ only fired at 1200px+, and so on. Symptoms: wrong font sizes at common desktop widths, hidden desktop nav, cramped panels.

Fix performed by audit agent across ~30 files, ~90 prefix corrections. When touching a migrated file, cross-check any `sm:/md:/lg:` prefixes against the pre-migration source (`git show 48b151e:<path>`).

## Component defaults that matter

| Component | Default `as` | Notes                                                 |
| --------- | ------------ | ----------------------------------------------------- |
| `Box`     | `div`        | Polymorphic via `as` prop                             |
| `Flex`    | `div`        | Adds `flex` class                                     |
| `Text`    | `div`        | **was `p` initially, caused nested-p hydration bugs** |
| `Heading` | `h2`         |                                                       |
| `Button`  | `<button>`   | Default variant `primary` = blue bg + white text      |

### Button variants (cva)

- `primary` — `bg-primary text-white px-4` (default)
- `secondary` — `bg-darkgray text-white px-4`
- `text` — transparent underline (for text-links styled as buttons)
- `muted` — `bg-white text-gray-600`

### Image shim

`components/ui/Image` must unwrap Next.js `StaticImageData` objects — `import X from "*.svg"` returns `{src, width, height}`, not a string. Shim now handles both cases. Prefer `next/image` for new code.

## Panel layout

- `<Page>` → `<AppPage>` → renders `<main>` with: `px-4 sm:px-8 py-[25px] sm:rounded-card bg-panel relative min-w-[min(100%,800px)] w-full max-w-[800px] min-h-[450px]`
- `<Container>` wraps children in flex column, `max-w-full lg:max-w-[1160px]`
- Panel bg color is `#e1e6ea` — subtle against white body, easy to mistake for "missing"

## MDX 3 wrapper (critical)

MDX 3 with `@mdx-js/react` 3.x **silently dropped `components.wrapper`**. Compiled MDX emits a `<Fragment>` and never calls any wrapper component.

Current workaround in `pages/_app.tsx`:

- `router.pathname.startsWith("/content")` triggers `<MDXPageWrapper>` which:
  - provides an `h1` component via MDXProvider that captures the first heading text (via `useState`) and returns `null` (removes duplicate H1)
  - wraps the MDX in `<Page heading={captured}>`

Note: this mutates state during render (the h1 component calls `setHeading`). Works in practice but brittle; a cleaner solution would be per-file `MDXLayout` exports or a server-side frontmatter approach.

## Degenerate-ternary migration bug (Phase 6C)

`components/TopBar.tsx` had `${home && light ? "text-white" : "text-white"}` — both branches identical, so the invisible-nav-on-home-pages regression was silent. Root cause: the old rebass prop read `color={home && light ? "white" : "#fff"}` where `"white"` was a theme-ui semantic token that resolved to `#030303` in light mode (theme-ui inverts `white`/`black` between modes — see `styles/theme.ts@48b151e`). The migration agent collapsed both to `text-white`, losing the semantic.

**Lesson:** rebass theme-ui tokens named `"white"`/`"black"`/`"text"` do NOT mean the CSS color. Grep for `theme-ui`-era prop reads that resolved to those tokens before trusting their migrated form. Pattern to search: `\? "text-\w+" : "text-\w+"` looking for identical branches.

## Data correctness regression (Phase 6B)

`pages/team/[team]/admin.tsx` — migration agent silently simplified an email-parsing regex:

- Old: `/[^@\s<>,;]+@[^@\s]+\.[^@\s<>,;]+/g` ← TLD char class excludes `<>,;`
- Agent wrote: `/[^@\s<>,;]+@[^@\s]+\.[^@\s]+/g` ← TLD doesn't exclude punctuation

Effect: `student4@teachen.ch,` matched with the trailing comma, breaking uniq dedup. Cypress caught it (1/14 failing). Builds and type-check were silent.

**Lesson:** after batched subagent file edits, audit non-styling tokens (regexes, literals) with a diff pass.

## Footer positioning (Phase 6C — fixed)

The old rebass footer used `position: absolute; left: 0; width: 100vw` to break out of the 1160px Container and span the viewport. The Tailwind-migrated version had the same intent (`absolute left-0 w-[100vw]` inside a wrapper `<Box>`) but rendered offset toward the center with horizontal overflow. Rather than chase the containing-block mystery, the Footer was restructured:

- `components/Footer.tsx` — outer wrapper `<Box>` removed; `<footer>` is now plain block flow with `w-full mt-[300px]` (no `absolute`).
- `components/Page.tsx:AppPage` — `<Footer />` moved **out of** `<Container>` into the top-level fragment so it sits at body level and naturally spans the viewport.

If you touch page layout again, prefer root-level sibling placement over "break out with `position: absolute`" — simpler and robust.

## Still outstanding / worth checking

1. **Panel width visually larger than old** on some pages (login, FAQ, lernen). Both old and new use `max-w-[800px]`, but rendered width differs. Possibly a flex-centering or Container width issue — verify in real browser, not just Chrome headless. **Re-verify after 6C base layer change** — some of the "looks wider" impression was pre-base-layer font metrics.
2. **Lernen page** — card grid "Weitere Lerninhalte" has horizontal overflow on wide viewports.
3. **Panel background visibility** — `#e1e6ea` on white is intentionally subtle but may look "missing" vs. old. Not a bug, just looks-like-one.
4. **Nav icon sizes** — tiny in Chrome headless; check in real browser. With preflight active the Tailwind `img { height: auto }` rule now applies, so explicit `height={N}` on `<img>` is advisory and aspect is derived from width. Confirm icons still render at the intended size.
5. **Breakpoint audit** — agent report flagged a few ambiguous 3-value array conversions (`pages/spielpolitik/vote.tsx`, `pages/abstimmen.tsx`, `components/Activities.tsx`, `pages/swiss-bulgaria.tsx`). Double-check visually.
6. **Footer** — 4 columns may get cut off in narrower panels. Verify wrapping behavior. (Positioning is fixed — see above.)
7. **More issues remain** (user flagged at end of 6C session): only login/signup were reviewed in depth. Expect further first-pass fixes once the user lists them — walk the screenshot harness pages one by one.
8. **Degenerate-ternary sweep** — grep `\? "text-\w+" : "text-\w+"` and similar `\? "bg-\w+" : "bg-\w+"` patterns across migrated files for other identical-branch artifacts like the TopBar one.

## Screenshot harness

- Script: `/tmp/voty-screenshots/shoot.sh` — uses Chrome headless at 1440×1800 to compare localhost:3000 vs voty.ch
- Output: `/tmp/voty-screenshots/{old,new}/*.png`
- Covers: home, login, signup, faq, lernen, leben, abstimmen, impressum, datenschutz, glossar, kontakt, projekt, curriculum, videos, tools, content-glossar

## Commands

```bash
yarn build               # next build
yarn start               # next start (needs CYPRESS=1 for test mode)
yarn reset:db            # reload fixtures before Cypress
yarn test                # full cypress
yarn check:ts            # tsc --noEmit
curl -s localhost:3000/_next/static/css/*.css | head -c 2000   # inspect compiled Tailwind
```

Pre-migration reference commit: `48b151e` (last commit before 6B). Use `git show 48b151e:<path>` to check original theme-ui props. The old rebass theme at `styles/theme.ts@48b151e` is the authoritative source for what semantic tokens like `"white"`/`"text"`/`"panelColor"` actually resolved to — **read it before trusting** any migrated class that looks like a direct translation.

## Picking up next session

6C focused on login/signup and landed 5 cross-cutting fixes + 1 TopBar bug. The user indicated more issues remain and will list them next. Likely next moves:

- Walk `/tmp/voty-screenshots/shoot.sh` output page-by-page; the harness covers home / faq / lernen / leben / abstimmen / impressum / datenschutz / glossar / kontakt / projekt / curriculum / videos / tools / content-glossar.
- Home / content pages may surface the remaining outstanding items (1, 2, 4) above.
- Logged-in flows (teacher, student, admin) are unscreenshotted — expect more breakage there.
