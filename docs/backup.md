# Backup and Restore

Production runs two nightly cron jobs on the host (`ansible/roles/cron`):

- `db-backup` at 02:00: `pg_dump` (sql, gzipped) → `voty-voty-prod-YYYY-MM-DD-HHhMMm.sql.gz.enc`
- `uploads-backup` at 02:30: `uploads/` (tgz) → `uploads-voty-prod-YYYY-MM-DD-HHhMMm.tgz.enc`

Both are encrypted with AES-256 (`openssl enc -aes-256-cbc -pbkdf2 -iter 600000`) using `BACKUP_ENCRYPTION_PASSWORD` from `.env`, uploaded via FTPES, and kept for 10 days (remote and local).

To decrypt a backup (set the password from `.env` first):

```
export BACKUP_ENCRYPTION_PASSWORD='...'
openssl enc -d -aes-256-cbc -pbkdf2 -iter 600000 -pass env:BACKUP_ENCRYPTION_PASSWORD \
  -in voty-voty-prod-YYYY-MM-DD-HHhMMm.sql.gz.enc -out voty-voty-prod.sql.gz
```

If you need to restore the content to either a development or a failover environment, then take the following steps.

```
# Download latest voty-prod-latest-data.dump to /tmp/

# recreate database
docker exec app yarn prisma migrate reset

# restore database
cat /tmp/voty-prod-latest-full.dump | docker exec -i postgres pg_restore -U voty --no-owner -d voty
```

This is how the latest dump is created in the cron job

```
docker exec postgres pg_dump -Fc --data-only -U voty -d voty > voty-prod-latest-data.dump
```

# Drop all tables

Sometimes you may want to drop all tables but dropping+recreating the database does not handily work

```

select 'drop table if exists "' || tablename || '" cascade;' from pg_tables where schemaname = 'public';

 drop table if exists "_prisma_migrations" cascade;
 drop table if exists "verification_requests" cascade;
 drop table if exists "swissvotes" cascade;
 drop table if exists "schools" cascade;
 drop table if exists "domains" cascade;
 drop table if exists "ballot_runs" cascade;
 drop table if exists "options" cascade;
 drop table if exists "voted" cascade;
 drop table if exists "votes" cascade;
 drop table if exists "teams" cascade;
 drop table if exists "attachments" cascade;
 drop table if exists "reactions" cascade;
 drop table if exists "users" cascade;
 drop table if exists "activities" cascade;
 drop table if exists "ballots" cascade;
 drop table if exists "works" cascade;
 drop table if exists "_UserToWork" cascade;
 drop table if exists "discussions" cascade;
```
