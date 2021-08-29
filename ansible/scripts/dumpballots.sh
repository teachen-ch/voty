#!/bin/sh

pg_dump --table=ballots --data-only --column-inserts voty > backup/voty-ballots.sql