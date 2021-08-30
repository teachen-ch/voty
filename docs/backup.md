# Backup and Restore

The data of the production database is backed up on a daily basis (full sql format) as well as every 15 minutes in pg_dump custom format (`-F c`). If you need to restore the content to either a development or a failover environment, then take the following steps.

```
# Download latest voty-prod-latest-data.dump to /tmp/

# recreate database
docker exec postgres dropdb -U voty voty —force
docker exec postgres createdb -O voty voty
docker exec app yarn run init:db

# restore database
cat /tmp/voty-prod-latest-data.dump | docker exec -i postgres pg_restore -U voty --disable-triggers -d voty
```

This is how the latest dump is created in the cron job

```
docker exec postgres pg_dump -Fc --data-only -U voty -d voty > voty-prod-latest-data.dump
```
