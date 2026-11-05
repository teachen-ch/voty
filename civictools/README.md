# CivicTools

## End-to-end tests

The Playwright suite covers teacher login, room creation, a pro/con discussion,
and a student joining from a separate browser context and adding an argument.
Run `cd frontend && npx playwright install chromium` once, then
`cd frontend && npm run test:e2e`. It starts an isolated PocketBase database,
seeds the fixed local E2E teacher account, and starts the app. The same command
runs in the GitHub Actions `civictools-e2e` job. Use `npm run seed:e2e` to seed
the E2E teacher into an already-running test instance.

## PocketBase admin UI

The PocketBase admin UI is available at `/pb/` (for example,
`https://tools.voty.ch/pb/`). The default `/_/` admin route is not exposed.
PocketBase auth emails are configured to link to `/pb/` for verification,
password reset, and email-change flows.

## Creating room templates

Teachers can currently create regular rooms from the dashboard. There is no
teacher-facing flow for creating templates yet.

For now, a system administrator can create a room in the PocketBase admin UI
under **Collections → rooms**, set its `teacher`, and set `is_template` to
`true`. Give it a unique `slug`; templates with a non-empty slug appear in the
template list and can be copied by teachers. The room's discussion boards,
votings, rankings, timers, and ballots are copied when a teacher uses the
template.

This is currently permission-based only at the broad level: authenticated
users may create rooms, and the current `rooms` create rule does not prevent a
teacher from submitting `is_template = true`. The PocketBase admin UI is the
practical way to manage templates until a dedicated permission and frontend
workflow are added.

## Editors, media and file storage

Tick `editor` on a user in the PocketBase admin (**Collections → users**) to
let them mark their rooms as templates (Template button in the room list) and
add images or videos to the canvas. Images are limited to 10 MB and web
formats; videos are YouTube, Vimeo or Dailymotion links.

Uploads go to S3 when `CIVICTOOLS_S3_BUCKET`, `CIVICTOOLS_S3_ENDPOINT`,
`CIVICTOOLS_S3_REGION`, `CIVICTOOLS_S3_ACCESS_KEY` and
`CIVICTOOLS_S3_SECRET_KEY` are set (production bucket `civictools-uploads`,
eu-central-1); otherwise they stay in local `pb_data`.

Rooms store the tenant (domain) they were created on in `rooms.tenant`, and
template lists only show templates of the active tenant.
