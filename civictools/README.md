# CivicTools

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
