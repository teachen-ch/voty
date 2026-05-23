# Ansible deploy

Provisions and deploys voty.ch.

## Target platform

**Ubuntu 24.04 LTS (noble) only.** The playbooks assume:

- `apt` package manager
- `systemd`
- Docker Engine + Compose v2 plugin installed from Docker's official apt repo
  (`download.docker.com/linux/ubuntu`) — Ubuntu's `docker.io` is *not* used
- `python3-docker` (apt) — no pip / PEP 668 workarounds
- cron drop-in dirs `/etc/cron.daily` and `/etc/cron.hourly`

Earlier revisions templated these per-OS (Alpine vs Ubuntu) via `ansible/vars/`.
That branching has been removed; if you need to support another distro, restore
per-OS vars rather than scattering `when:` clauses.

## Inventories

- `dev/` — development host (`.env.development`)
- `prod/` — production: `voty.ch` (`.env.production`)
- `backup/` — backup host (`.env.backup`)
- `v6/` — legacy

Each inventory has `group_vars/all` defining `env_file` (path to the `.env`
template, relative to `ansible/`).

## Common commands

```bash
# Full provision + deploy (run from repo root)
ansible-playbook -i ansible/prod ansible/site.yml

# Just pull new images + restart (skip apt/system setup)
ansible-playbook -i ansible/prod ansible/site.yml --tags app

# Re-copy compose/nginx/.env without re-pulling
ansible-playbook -i ansible/prod ansible/site.yml --tags common
```

`site.yml` → `web.yml` runs three roles: `common` (system packages, Docker repo,
systemd unit, compose/nginx/.env files), `app` (pull images + start), `cron` (db
backup scripts).

## Container registry

Images are pulled from `ghcr.io/teachen-ch/voty/*`. The packages are public, so
no `docker login` is required on the deploy host.
