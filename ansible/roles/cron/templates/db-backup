#!/usr/bin/env python3
# nightly DB backups dumped to SFTP server

from datetime import datetime
from ftplib import FTP_TLS
import os
import sys
import time
import re

DAYS = 30  # remove older backups
CONTAINER = "postgres"
BACKUPROOT = "/voty/backup"
ENV_FILE = "/voty/.env"
HOSTNAME = os.environ.get("HOSTNAME", "unkown")


def readEnv(envFile):
    lines = open(envFile).readlines()
    # remove newlines
    stripped = map(lambda s: s.replace("\n", ""), lines)
    # filter empty lines and comments
    filtered = filter(lambda s: len(s) > 0 and not s.startswith("#"), stripped)
    pairs = map(lambda s: re.split(r'\s*=\s*', s), filtered)
    return dict(pairs)


env = readEnv(ENV_FILE)
if (not 'BACKUP_SERVER' in env):
    print("Skipping backup, as BACKUP_SERVER is not defined")
    sys.exit(0)

BACKUP_SERVER = env['BACKUP_SERVER']
BACKUP_USER = env['BACKUP_USER']
BACKUP_PASS = env['BACKUP_PASS']
DATABASE_URL = env['DATABASE_URL']

match = re.match(r'.*//(.*?)\:(.*?)@(.*?)\/(.*)', DATABASE_URL)
if (not match):
    print("Error: could not parse DATABASE_URL: %s" % DATABASE_URL)
    exit(1)

db = match.groups()
DB_USER = db[0]
DB_PASS = db[1]
DB_HOST = db[2]
DB_NAME = db[3]

# generate backup filename
dateStr = datetime.now().strftime("%Y-%m-%d-%Hh%Mm")
fileName = "%s-%s-%s.sql.gz" % (DB_NAME, HOSTNAME, dateStr)

# Run db dump over docker
dbCmd = "pg_dump -U %s %s  --clean" % (DB_USER, DB_NAME)
cmd = "docker exec %s %s | gzip -9 > %s/%s" % (
    CONTAINER, dbCmd, BACKUPROOT, fileName)

code = os.system(cmd)
if (code != 0):
    print("Error: could not run pg_dump via docker")
    sys.exit(code)


# Upload latest file via FTPES
ftps = FTP_TLS(BACKUP_SERVER)
ftps.login(BACKUP_USER, BACKUP_PASS)
ftps.prot_p()
file = open(os.path.join(BACKUPROOT, fileName), 'rb')
ftps.storbinary('STOR '+fileName, file, blocksize=8192)
file.close()

now = time.time()
# Remove old backups
for filename in os.listdir(BACKUPROOT):
    if os.path.getmtime(os.path.join(BACKUPROOT, filename)) < now - DAYS * 86400:
        if os.path.isfile(os.path.join(BACKUPROOT, filename)):
            os.remove(os.path.join(BACKUPROOT, filename))
