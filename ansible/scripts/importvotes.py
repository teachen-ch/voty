#!/usr/bin/env python3
#
# This scripts imports the lhe latest dataset from swissvotes.ch into a postgres db
#
# Description of the csv format:
# https://swissvotes.ch/storage/2a1450bbd8723d7d9399fbcfe6627751a60e824d7e54eaad8c46099dc690f52c
#

from sqlalchemy import create_engine, exc
import pandas as pd
import sys
import os
import getopt
import numpy
from datetime import date

path = os.path.dirname(__file__)

DOWNLOAD_URL = "https://swissvotes.ch/page/dataset/swissvotes_dataset.csv"
CATEGORIES_CSV = path + "/categories.csv"

try:
    # Define the getopt parameters
    opts, args = getopt.getopt(
        sys.argv[1:], 'u:p:h:d:t:')

    values = dict(opts)
    user = values.get("-u", "")
    password = values.get("-p", "")
    host = values.get("-h", "localhost")
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


def intnull(val):
    return 0 if val == '' or val == '.' else int(val)


print("2) Downloading and parsing latest swissvotes_dataset.csv")
# Load in the data
votes = pd.read_csv(DOWNLOAD_URL, encoding='iso-8859-1',
                    delimiter=';', parse_dates=['datum'],
                    converters={'anr': str, 'rechtsform': intnull, 'annahme': intnull, 'volk': intnull, 'stand': intnull})

#votes.dropna(how='all', axis=1, inplace=True)
invalid = votes[votes['anr'] == ''].index
votes.drop(invalid, inplace=True)
print("3) Parsed %d lines" % len(votes))


def getCat(dxex):
    global categories
    if dxex == '.':
        return ''
    if type(dxex) == numpy.float and dxex > 0:
        dxex = str(int(dxex))
    return categories.get(str(dxex), '')


def replaceCats(vote):
    global categories
    cats = set()
    for key in ['d1e1', 'd1e2', 'd1e3', 'd2e1', 'd2e2', 'd2e3', 'd3e1', 'd3e2', 'd3e3']:
        cat = getCat(vote[key])
        if (cat):
            cats.add(cat)
    vote.kategorien = '; '.join(cats)
    return vote


# read categories from csv and add them to votes
cats = pd.read_csv(CATEGORIES_CSV, delimiter='\t', dtype={'code': str})
categories = dict(zip(cats.code, cats.title))
votes.insert(2, 'kategorien', '')
votes = votes.apply(replaceCats, axis='columns')

# only select a few columns, which are relevant to your case
votes = votes[['anr', 'datum', 'titel_kurz_d', 'titel_off_d', 'stichwort',
               'swissvoteslink', 'rechtsform', 'poster_ja', 'poster_nein',
               'annahme', 'volk', 'stand', 'kategorien']]

# Save the data from dataframe to
# postgres table "iris_dataset"
votes.to_sql(
    table,
    engine,
    if_exists='append',
    index=False
)
print("4) (Re-)created table and wrote data to table %s/%s" %
      (database, table))
