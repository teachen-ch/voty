# How to set up new ballots

Every quarter, there are is a national ballot weekend in Switzerland. We receive the data from easyvote.ch 4 weeks in advance to this date. Either we send them an email five weeks before the date or we take the data from their website a week later.

- Create a new voty-ballots-2023-qX.yaml from voty-ballots-easyvote-template.yaml
- Add texts and links from easyvote.ch
- run `yarn load:db backkup/voty-ballots-2024-XX.yml`
  (if this does not work: temporarly add to fixtures/testdb.yml and run `yarn test`)
- run `pg_dump --table=ballots --data-only --column-inserts voty > backup/voty-ballots-2024-qX.sql`
- run `ssh -t prod "./psql"` and copy & paste the sql statements from above file
- run `ssh -t dev "./psql"` if needed

That's it, happy votying :-)
