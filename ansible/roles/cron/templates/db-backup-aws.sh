#!/bin/bash
# nightly DB backups dumped to S3 using /root/.s3cfg

DB_HOST="localhost"
DB_USER="voty"
DB_NAME="voty"

BACKUPROOT="/voty/backup"
TSTAMP=$(date +"%Y-%b-%d-%H-%M-%S")
S3BUCKET="s3://teachen-cdn/voty/"
LOG_ROOT="/tmp/voty-backup.log"

echo "$(tput setaf 2)creating backup of database start at $TSTAMP" >> "$LOG_ROOT"

docker exec pg_dump -U $DB_USER -h $DB_HOST $DB_NAME --clean > $BACKUPROOT/$DB_NAME-$TSTAMP.sql

echo "$(tput setaf 3)Finished backup, sending it to S3 Bucket at $TSTAMP" >> "$LOG_ROOT"

#Delete files older than 15 days
find  $BACKUPROOT/*   -mtime +15   -exec rm  {}  \;
chown -R voty:voty $BACKUPROOT
s3cmd   put   --recursive   $BACKUPROOT/   $S3BUCKET

echo "$(tput setaf 2)Moved the backup file from local to S3 bucket at $TSTAMP" >> "$LOG_ROOT"