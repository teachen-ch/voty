#!/usr/bin/env python3
#
# This scripts imports the lhe latest dataset from swissvotes.ch into a postgres db
#
# Description of the csv format:
# https://swissvotes.ch/storage/2a1450bbd8723d7d9399fbcfe6627751a60e824d7e54eaad8c46099dc690f52c
#

from sqlalchemy import create_engine, exc
import pandas as pd
import getopt
import sys

DOWNLOAD_URL = "https://swissvotes.ch/page/dataset/swissvotes_dataset.csv"

try:
    # Define the getopt parameters
    opts, args = getopt.getopt(
        sys.argv[1:], 'u:p:h:d:t:')

    values = dict(opts)
    user = values.get("-u", "")
    password = values.get("-p", "")
    host = values.get("-p", "localhost")
    database = values.get("-d", "voty")
    table = values.get("-t", "swissvotes")
    userpass = user + (":%s" % password if password else "")
    if (userpass):
        userpass = userpass + "@"

    PG_URL = "postgresql://%s%s:5432/%s" % (userpass, host, database)

except getopt.GetoptError:
    print('Usage: importvotes.py -u dbuser -p S3cure -h localhost -d mydb -t mytable')
    sys.exit(2)

print("1) Connecting to database %s" % database)
# Instantiate sqlachemy.create_engine object
engine = create_engine(PG_URL)
try:
    engine.raw_connection()
except exc.OperationalError:
    print(sys.exc_info())
    print("Could not connect to database with connection %s" % PG_URL)
    sys.exit(3)

print("2) Downloading and parsing latest swissvotes_dataset.csv")
# Load in the data
df = pd.read_csv(DOWNLOAD_URL, encoding='iso-8859-1', delimiter=';')

df = df.dropna(how='all', axis=1)
print("3) Parsed %d lines" % len(df))

# Save the data from dataframe to
# postgres table "iris_dataset"
df.to_sql(
    table,
    engine,
    if_exists='replace',
    index=False
)
print("4) (Re-)created table and wrote data to table %s/%s" %
      (database, table))
