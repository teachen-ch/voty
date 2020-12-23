#!/bin/sh

tail -f /usr/local/var/log/postgres.log | grep SELECT |  sed 's/"public".//g' | sed 's/"//g' | sed 's/^.* SELECT/SELECT/g'
