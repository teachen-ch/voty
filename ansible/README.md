# Ansible deploy

Provisions and deploys voty.ch.

## Target platform

**Ubuntu 24.04 LTS (noble) only.** The playbooks assume:

- `apt` package manager
- `systemd` with user linger enabled for the `app` user
- Docker Engine + Compose v2 plugin from Docker's official apt repo
  (`download.docker.com/linux/ubuntu`) running in **rootless mode** as `app`
  — repo setup and package installation is handled entirely by `bootstrap.sh`
- `python3-docker` (apt) — no pip / PEP 668 workarounds
- User crontab for scheduled backups (no `/etc/cron.daily`)

The `app` user has no sudo access. All service management happens via
`systemctl --user`. Port binding below 1024 is enabled via
`net.ipv4.ip_unprivileged_port_start=80` (set by `bootstrap.sh`).

Earlier revisions templated these per-OS (Alpine vs Ubuntu) via `ansible/vars/`.
That branching has been removed; if you need to support another distro, restore
per-OS vars rather than scattering `when:` clauses.

## First-time server setup

Run `ansible/scripts/bootstrap.sh` once as root on the fresh instance. It
installs packages, creates the `app` user, copies the SSH key, enables linger,
sets the unprivileged port sysctl, and installs rootless Docker:

```bash
# If your SSH key is already on ubuntu@, copy it to root and run:
bash ansible/scripts/bootstrap.sh

# Or pass the public key explicitly:
bash ansible/scripts/bootstrap.sh "ssh-ed25519 AAAA..."
```

After that, all Ansible runs connect as `app` with no sudo required.

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
