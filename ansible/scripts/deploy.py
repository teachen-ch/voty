#!/usr/bin/env python3
#
# commits current changes, waits for github actions and deploys
#
# should be run from project root
# 1. commit unless tsc/eslint failures
# 2. git push
# 3. wait ~10 minutes (later try to use gh cli and poll latest run)
# 4. yarn deploy:dev
#

import os
import sys
import select
import time
import logging

# run deploy -p to deploy to prod and dev in parallel
deployEnv = "dev"
if sys.argv[1] == "-p":
    deployEnv = "parallel"
    print("\nDeploying to production in parallel...\n")
    sys.argv.pop(1)


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
    log.debug("Took %.1f minutes" % took)


def wait(min):
    global deployEnv
    log.debug("Waiting for %d minutes... " % min)
    print("\t\tabort with: c < enter > to cancel")
    print("\t\t   or with: g < enter > to start deploy")
    print("\t\t   or with: p < enter > concurrently deploy to prod/dev")
    print("[c|g|p] > ")
    i, _, _ = select.select([sys.stdin], [], [], min * 60)
    if (i):
        char = sys.stdin.readline().strip().lower()
        if (char == "c"):
            log.error("Not starting deployment")
            sys.exit(0)
        elif (char == "g"):
            log.error("Starting deployment now")
        elif (char == "p"):
            deployEnv = "parallel"
            log.error("Starting deploy to PROD and DEV concurrently")
        else:
            log.error("'%s' is not a valid answer" % char)
            wait(min)


log = initLogger()

log.info("Fetching latest updates from git")
exec("git pull")
commitMessage = " ".join(sys.argv[1:]) or input(
    "Commit message (empty to skip commit): ")

start = time.time()
if commitMessage:
    exec("git add .")
    exec("git commit -m \"%s\"" % commitMessage)

exec("git push")
wait(10)
if (deployEnv == "parallel"):
    exec("npx concurrently yarn:deploy:dev yarn:deploy:prod yarn:deploy:backup")
else:
    exec("yarn run deploy:dev")

took = round((time.time() - start)/60, 1)
log.info("✅ Successfully deployed to %s in %.1f minutes" % (deployEnv, took))

if (deployEnv == "dev"):
    yesno = input("Would you like to push to production as well? (y/N) ")
    if (yesno.lower() == "y"):
        exec("yarn run deploy:prod")
        log.info("🎉 Successfully deployed to prod")
