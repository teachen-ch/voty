#!/opt/homebrew/bin/python

import yaml, sys, uuid


# Load YAML data from file
def load_yaml(filename):
    with open(filename, 'r') as file:
        data = yaml.safe_load(file)

    # SQL insert statement template
    sql_template = "INSERT INTO public.ballots (id, title, description, body, start, \"end\", scope, canton, school_id, team_id, creator_id, created_at, updated_at, original_locale, titlede, titlefr, titleit, descriptionde, descriptionfr, descriptionit, bodyde, bodyfr, bodyit) VALUES"

    # Process each ballot entry
    for idx, ballot in enumerate(data['ballot']):
        values = f"('{uuid.uuid4()}', '', '', '', '{ballot['start']}', '{ballot['end']}', '{ballot['scope']}', NULL, NULL, NULL, NULL, '2024-02-05 07:45:29.262', '2024-02-05 07:45:29.258', 'de', '{ballot['titlede']}', '', '', '{ballot['descriptionde']}', '', '', '{ballot['bodyde']}', '', '')"
        
        if idx == 0:
            sql_statement = f"{sql_template} {values}"
        else:
            sql_statement += f", {values}"

    output = filename.replace('.yml', '.sql')
    with open(output, 'w') as file:
        file.write(sql_statement)
    
    print(f"SQL insert statements written to {output}")

if __name__ == '__main__':
    # parse first argument as filename
    filename = sys.argv[1]
    load_yaml(filename)

    pass