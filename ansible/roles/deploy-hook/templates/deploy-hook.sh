#!/bin/sh

export DOCKER_HOST="unix:///run/user/$(id -u)/docker.sock"
docker system prune -a -f
docker compose -f {{ app_dir }}/docker-compose.yml pull
systemctl --user restart voty
