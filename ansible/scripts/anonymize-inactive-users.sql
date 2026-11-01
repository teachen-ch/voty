-- Anonymize students inactive for 18+ months and teachers inactive for 24+ months.
-- Rows are kept (stats, votes, team/school links stay intact); personal data is cleared
-- and the account email is removed so the account can no longer log in.
--
-- Dry run (rolls back):  docker exec -i postgres psql -U voty -d voty -v dry_run=1 < anonymize-inactive-users.sql
-- Apply (commits):       docker exec -i postgres psql -U voty -d voty < anonymize-inactive-users.sql

\set ON_ERROR_STOP on
BEGIN;

CREATE TEMP TABLE inactive AS
WITH last_seen AS (
  SELECT u.id, u.role,
    GREATEST(
      u.created_at,
      u.last_login_at,
      (SELECT max(a.created_at) FROM activities a WHERE a.user_id = u.id),
      (SELECT max(d.created_at) FROM discussions d WHERE d.user_id = u.id),
      (SELECT max(t.created_at) FROM attachments t WHERE t.user_id = u.id),
      (SELECT max(r.created_at) FROM reactions r WHERE r.user_id = u.id),
      (SELECT max(w.created_at) FROM works w JOIN "_UserToWork" uw ON uw."B" = w.id WHERE uw."A" = u.id),
      (SELECT max(b.created_at) FROM ballots b WHERE b.creator_id = u.id),
      (SELECT max(t.created_at) FROM teams t WHERE t.teacher_id = u.id),
      (SELECT max(b."end") FROM voted v JOIN ballots b ON b.id = v.ballot_id WHERE v.user_id = u.id)
    ) AS last_seen
  FROM users u
  WHERE u.role IN ('Student', 'Teacher') AND u.email IS NOT NULL
)
SELECT id, role FROM last_seen
WHERE (role = 'Student' AND last_seen < now() - interval '18 months')
   OR (role = 'Teacher' AND last_seen < now() - interval '24 months');

SELECT role, count(*) AS to_anonymize FROM inactive GROUP BY role ORDER BY role;

UPDATE users SET
  name = 'Anonym',
  lastname = NULL,
  email = NULL,
  email_verified = NULL,
  password = NULL,
  image = NULL,
  campaign = NULL,
  gender = NULL,
  year = NULL,
  canton = NULL,
  last_login_at = NULL,
  updated_at = now()
WHERE id IN (SELECT id FROM inactive);

UPDATE activities SET summary = NULL
WHERE user_id IN (SELECT id FROM inactive);

\if :{?dry_run}
  \echo 'dry run: rolling back'
  ROLLBACK;
\else
  COMMIT;
\endif
