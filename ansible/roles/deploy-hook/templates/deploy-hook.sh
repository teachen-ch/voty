#!/bin/sh

docker system prune -a -f
docker-compose pull
systemctl restart voty
