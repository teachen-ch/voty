#!/usr/bin/env python3
#
# commits current changes, waits for github actions and deploys
#
# should be run from project root
# 1. commit unless tsc/eslint failures
# 2. git push
# 3. wait ~10 minutes (later try to use gh cli and poll latest run)
# 4. yarn deploy_dev
#

import os
import sys
import time
import re
import logging


def initLogger():
    # color hack
    logging.addLevelName(
        logging.WARNING, "\033[1;31m%s\033[1;0m" % logging.getLevelName(logging.WARNING))
    logging.addLevelName(
        logging.ERROR, "\033[1;41m%s\033[1;0m" % logging.getLevelName(logging.ERROR))

    log = logging.getLogger()
    log.setLevel(logging.DEBUG)

    ch = logging.StreamHandler()
    formatter = logging.Formatter(
        '%(asctime)s - %(levelname)s\t - %(message)s')
    ch.setFormatter(formatter)
    log.addHandler(ch)
    return log


def exec(cmd):
    global log
    start = time.time()
    print("–"*80)
    log.info("Executing: %s" % cmd)
    result = os.system(cmd)
    if (not result == 0):
        log.error("Error while executing last command: %s" % result)
        sys.exit(result)
    took = round((time.time() - start)/60, 1)
    log.debug("Took: %.1fm" % took)


def wait(min):
    log.debug("Waiting for %d minutes..." % min)
    for _ in range(min):
        time.sleep(60)
        print('.', end='')
        sys.stdout.flush()


log = initLogger()
commitMessage = " ".join(sys.argv[1:]) or input("Commit message: ")
if not commitMessage:
    log.error("😠 I don't like empty commit messages.")
    sys.exit(1)

exec("git add .")
exec("git commit -m \"%s\"" % commitMessage)
exec("git push")
wait(8)
exec("yarn run deploy_dev")
log.info("✅ Successfully deployed to dev")
yesno = input("Would you like to push to production as well? (y/N) ")
if (yesno.lower() == "y"):
    exec("yarn run deploy_prod")
    log.info("🎉 Successfully deployed to prod")
