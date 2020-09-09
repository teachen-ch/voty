#!/bin/sh
  
DB=$1
shift
user=`echo $DB | sed 's/.*:\/\/\(.*\)\:.*/\1/g'`
password=`echo $DB | sed 's/.*:\/\/[^:]*:\(.*\)\@.*/\1/g'`
host=`echo $DB | sed 's/.*@\(.*\)\/.*/\1/g'`
dbname=`echo $DB | sed 's/.*\/\(.*\)/\1/g'`

echo psql -h "$host" -U "$user" "$dbname"

cmd="$@"
  
until PGPASSWORD=$password psql -h "$host" -U "$user" "$dbname" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"
exec $cmd
