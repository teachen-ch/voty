# How to set up new ballots

Every quarter, there are is a national ballot weekend in Switzerland. We receive the data from easyvote.ch 4 weeks in advance to this date. Either we send them an email five weeks before the date or we take the data from their website a week later.

- Create a new voty-ballots-2023-qX.yaml from voty-ballots-easyvote-template.yaml
- Add texts and links from easyvote.ch
- Run `python ansible/scripts/ballots_to_sql.py backup/voty-ballots-2026-q2.yml
- run `ssh -t prod "./psql"` and copy & paste the sql statements from above file
- run `ssh -t dev "./psql"` if needed

That's it, happy votying :-)
