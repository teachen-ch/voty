# How to set up new ballots

Every quarter, there is a national ballot weekend in Switzerland. Easyvote normally publishes the details around four weeks before the vote.

## Collect the ballot data

1. Open easyvote.ch and look for the "Abstimmungen" page, e.g.: <https://www.easyvote.ch/de/abstimmungen/27-september-2026>.
2. Use the links listed there to find the individual ballots. The overview page is scoped to a specific ballot weekend; do not assume that a generic “Abstimmungen” link or a previously used URL points to the current quarter.
3. Create `backup/voty-ballots-YYYY-qX.yml` using `backup/voty-ballots-easyvote-template.yaml` as a guide.
4. Add one entry per national ballot, including the German title, description, start/end dates, `scope: National`, the Easyvote summary in `bodyde`, and a link to the individual Easyvote page.

The usual visibility window starts four weeks before the ballot date and ends on the ballot date. Confirm the dates and the list of ballots on the current Easyvote overview page before creating the file.

## Validate and generate SQL

Parse and inspect the YAML before generating SQL:

```sh
python - <<'PY'
import yaml
from pathlib import Path

path = Path("backup/voty-ballots-YYYY-qX.yml")
data = yaml.safe_load(path.read_text())
required = {"titlede", "descriptionde", "start", "end", "scope", "bodyde"}
assert data.keys() == {"ballot"}
assert data["ballot"]
for ballot in data["ballot"]:
    assert set(ballot) == required, ballot.get("titlede")
    assert ballot["scope"] == "National"
print(f"validated {len(data['ballot'])} ballots")
PY
```

Generate the SQL file:

```sh
python ansible/scripts/ballots_to_sql.py backup/voty-ballots-YYYY-qX.yml
```

Review the YAML and generated SQL and get explicit confirmation before changing production.

## Import into production

The `app` container’s `./psql` helper opens an interactive TTY, which makes it unsuitable for reliable automation or redirected input. Run `psql` directly in the PostgreSQL container and pass the SQL on standard input instead:

```sh
ssh app@prod 'docker exec -i postgres psql "postgres://voty:voty@postgres/voty"' \
  < backup/voty-ballots-YYYY-qX.sql
```

The command should finish with an `INSERT 0 N` response, where `N` is the number of ballots in the YAML. If it fails, stop and investigate; do not blindly rerun because the generated SQL uses new UUIDs and could insert duplicates.

Optionally import into development with the same direct-container approach:

```sh
ssh app@dev 'docker exec -i postgres psql "postgres://voty:voty@postgres/voty"' \
  < backup/voty-ballots-YYYY-qX.sql
```

After importing, verify the expected titles and date range in the production UI or with a read-only SQL query.

That's it, happy voting :-)
