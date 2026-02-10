#!/opt/homebrew/bin/python

import yaml, sys, uuid


def pg_literal(value):
    """Return a PostgreSQL‑compatible literal."""
    if value is None:
        return "NULL"
    if isinstance(value, (int, float)):
        return str(value)
    # Escape single quotes by doubling them
    escaped = str(value).replace("'", "''")
    return f"'{escaped}'"


# Load YAML data from file
def load_yaml(filename):
    with open(filename, "r") as file:
        data = yaml.safe_load(file)

    # SQL insert statement template
    sql_template = 'INSERT INTO public.ballots (id, title, description, body, start, "end", scope, canton, school_id, team_id, creator_id, created_at, updated_at, original_locale, titlede, titlefr, titleit, descriptionde, descriptionfr, descriptionit, bodyde, bodyfr, bodyit) VALUES'

    # Process each ballot entry
    for idx, ballot in enumerate(data["ballot"]):
        values = f"({pg_literal(uuid.uuid4())}, {pg_literal('')}, {pg_literal('')}, {pg_literal('')}, {pg_literal(ballot['start'])}, {pg_literal(ballot['end'])}, {pg_literal(ballot['scope'])}, NULL, NULL, NULL, NULL, {pg_literal('2024-02-05 07:45:29.262')}, {pg_literal('2024-02-05 07:45:29.258')}, {pg_literal('de')}, {pg_literal(ballot['titlede'])}, {pg_literal('')}, {pg_literal('')}, {pg_literal(ballot['descriptionde'])}, {pg_literal('')}, {pg_literal('')}, {pg_literal(ballot['bodyde'])}, {pg_literal('')}, {pg_literal('')})"

        if idx == 0:
            sql_statement = f"{sql_template} {values}"
        else:
            sql_statement += f", {values}"  # type: ignore

    output = filename.replace(".yml", ".sql")
    with open(output, "w") as file:
        file.write(sql_statement)

    print(f"SQL insert statements written to {output}")


if __name__ == "__main__":
    # parse first argument as filename
    filename = sys.argv[1]
    load_yaml(filename)

    pass
